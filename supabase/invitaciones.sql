  -- ============================================================
  -- Script para añadir el sistema de Invitaciones
  -- Ejecuta este script en Supabase → SQL Editor → Run
  -- ============================================================

  -- 1. Crear tabla invitaciones
  CREATE TABLE IF NOT EXISTS public.invitaciones (
      id_invitacion bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      id_equipo bigint NOT NULL REFERENCES public.equipos(id_equipo) ON DELETE CASCADE,
      correo_invitado text NOT NULL,
      rol public.rol_equipo NOT NULL DEFAULT 'developer',
      estado text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aceptada', 'rechazada')),
      fecha_creacion timestamp with time zone DEFAULT now() NOT NULL
  );

  -- 2. Habilitar RLS
  ALTER TABLE public.invitaciones ENABLE ROW LEVEL SECURITY;

  -- 3. Políticas de RLS para invitaciones

  -- Quienes pueden ver las invitaciones:
  -- A) Miembros del equipo que hizo la invitación
  -- B) El usuario cuyo correo coincide con el correo_invitado
  DROP POLICY IF EXISTS invitaciones_select ON public.invitaciones;
  CREATE POLICY invitaciones_select ON public.invitaciones
    FOR SELECT TO authenticated
    USING (
      public.is_member_of_equipo(id_equipo)
      OR 
      correo_invitado = (auth.jwt() ->> 'email')::text
    );

  -- Quienes pueden insertar: miembros del equipo
  DROP POLICY IF EXISTS invitaciones_insert_miembros ON public.invitaciones;
  CREATE POLICY invitaciones_insert_miembros ON public.invitaciones
    FOR INSERT TO authenticated
    WITH CHECK (public.is_member_of_equipo(id_equipo));

  -- Actualizar (Rechazar/Aceptar directamente, aunque usaremos RPC por seguridad)
  DROP POLICY IF EXISTS invitaciones_update_destinatario ON public.invitaciones;
  CREATE POLICY invitaciones_update_destinatario ON public.invitaciones
    FOR UPDATE TO authenticated
    USING (correo_invitado = (auth.jwt() ->> 'email')::text)
    WITH CHECK (correo_invitado = (auth.jwt() ->> 'email')::text);

  -- 4. RPC: aceptar_invitacion
  -- Permite aceptar la invitación y unirse al equipo en una sola transacción segura
  CREATE OR REPLACE FUNCTION public.aceptar_invitacion(p_id_invitacion bigint)
  RETURNS boolean
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
  DECLARE
      v_id_equipo bigint;
      v_rol public.rol_equipo;
      v_estado text;
      v_correo text;
      v_id_usuario bigint;
  BEGIN
      -- Obtener el ID del usuario actual
      v_id_usuario := public.get_current_usuario_id();
      IF v_id_usuario IS NULL THEN
          RAISE EXCEPTION 'Usuario no encontrado en la tabla usuarios';
      END IF;

      -- Obtener datos de la invitación
      SELECT id_equipo, rol, estado, correo_invitado 
      INTO v_id_equipo, v_rol, v_estado, v_correo
      FROM public.invitaciones
      WHERE id_invitacion = p_id_invitacion;

      IF NOT FOUND THEN
          RAISE EXCEPTION 'Invitación no encontrada';
      END IF;

      IF v_estado != 'pendiente' THEN
          RAISE EXCEPTION 'La invitación ya fue %', v_estado;
      END IF;

      -- Verificar que el correo coincide con el usuario autenticado
      -- Nota: Al ser SECURITY DEFINER, podemos leer auth.users
      IF v_correo != (SELECT email FROM auth.users WHERE id = auth.uid()) THEN
          RAISE EXCEPTION 'No tienes permiso para aceptar esta invitación';
      END IF;

      -- Cambiar estado de invitación
      UPDATE public.invitaciones
      SET estado = 'aceptada'
      WHERE id_invitacion = p_id_invitacion;

      -- Insertar al usuario en el equipo si no está ya
      IF NOT public.is_member_of_equipo(v_id_equipo) THEN
          INSERT INTO public.usuarios_equipos (id_usuario, id_equipo, rol)
          VALUES (v_id_usuario, v_id_equipo, v_rol);
      END IF;

      RETURN TRUE;
  END;
  $$;

  GRANT EXECUTE ON FUNCTION public.aceptar_invitacion(bigint) TO authenticated;

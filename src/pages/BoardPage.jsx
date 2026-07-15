import {
  AlertTriangle,
  Bell,
  Book,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Eye,
  Inbox,
  LayoutGrid,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  Users,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Tablero', Icon: LayoutGrid, active: true },
  { label: 'Mis Tableros', Icon: Book },
  { label: 'Mis Equipos', Icon: Users },
  { label: 'Bandeja', Icon: Inbox },
  { label: 'Mis Tareas', Icon: CheckSquare },
  { label: 'Especi...', Icon: Eye },
]

const priorityStyles = {
  Alta: {
    color: '#E53E3E',
    bg: 'rgba(229, 62, 62, 0.1)',
    border: '#E53E3E',
    Icon: AlertTriangle,
  },
  Media: {
    color: '#D69E2E',
    bg: 'rgba(214, 158, 46, 0.1)',
    border: '#D69E2E',
    Icon: Zap,
  },
  Baja: {
    color: '#38A169',
    bg: 'rgba(56, 161, 105, 0.1)',
    border: '#38A169',
    Icon: CheckCircle2,
  },
}

const avatars = {
  MG: { label: 'MG', bg: '#6D5BD0' },
  CL: { label: 'CL', bg: '#D877FF' },
  AM: { label: 'AM', bg: '#D69E2E' },
  LH: { label: 'LH', bg: '#38A169' },
  ID: { label: 'ID', bg: '#F97316' },
  VS: { label: 'VS', bg: '#0EA5E9' },
}

const columns = [
  {
    title: 'Por Hacer',
    count: 3,
    progress: 30,
    accent: '#6366F1',
    tasks: [
      {
        title: 'Diseñar wireframes del sistema',
        tags: ['Diseño'],
        priority: 'Alta',
        date: '15 Jul',
        comments: 3,
        attachments: 2,
        owner: 'MG',
      },
      {
        title: 'Configurar entorno de desarrollo',
        tags: ['DevOps'],
        priority: 'Media',
        date: '16 Jul',
        comments: 1,
        attachments: 0,
        owner: 'CL',
      },
      {
        title: 'Deploy en servidor de producción...',
        tags: ['Backend'],
        priority: 'Baja',
        date: '17 Jul',
        comments: 0,
        attachments: 1,
        owner: 'AM',
      },
    ],
  },
  {
    title: 'En Progreso',
    count: 3,
    progress: 30,
    accent: '#D69E2E',
    tasks: [
      {
        title: 'Implementar autenticación JWT',
        tags: ['Backend', 'Seguridad'],
        priority: 'Alta',
        date: '20 Jul',
        comments: 4,
        attachments: 0,
        owner: 'CL',
      },
      {
        title: 'Crear endpoints de la API REST',
        tags: ['Backend'],
        priority: 'Media',
        date: '25 Jul',
        comments: 2,
        attachments: 3,
        owner: 'AM',
      },
      {
        title: 'Diseño de base de datos relacional...',
        tags: ['Análisis'],
        priority: 'Media',
        date: '26 Jul',
        comments: 1,
        attachments: 0,
        owner: 'ID',
      },
    ],
  },
  {
    title: 'En Revisión',
    count: 2,
    progress: 20,
    accent: '#E53E3E',
    tasks: [
      {
        title: 'Revisión de seguridad del módulo',
        tags: ['Seguridad'],
        priority: 'Alta',
        date: '28 Jul',
        comments: 8,
        attachments: 2,
        owner: 'ID',
      },
      {
        title: 'Testing de integración de la API',
        tags: ['Testing'],
        priority: 'Media',
        date: '1 Ago',
        comments: 3,
        attachments: 0,
        owner: 'LH',
      },
    ],
  },
  {
    title: 'Completado',
    count: 2,
    progress: 20,
    accent: '#38A169',
    tasks: [
      {
        title: 'Manual de usuario v1.0',
        tags: ['Documentación'],
        priority: 'Baja',
        date: '15 Ago',
        comments: 2,
        attachments: 4,
        owner: 'VS',
      },
      {
        title: 'Análisis de requerimientos',
        tags: ['Análisis'],
        priority: 'Baja',
        date: '10 Jul',
        comments: 7,
        attachments: 3,
        owner: 'MG',
      },
    ],
  },
]

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-[#FFF5F7]" style={{ backgroundColor: '#FFF5F7', color: '#2D2D3F' }}>
      <header
        className="sticky top-0 z-40 border-b border-slate-200/70 bg-white shadow-sm"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-3xl"
              style={{ background: 'linear-gradient(135deg, #6d5bd0 0%, #3a2f8f 100%)' }}
            >
              <LayoutGrid className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-bold"
                style={{ color: '#4A3A6B', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                TaskFlow
              </span>
              <ChevronDown className="h-4 w-4 text-[#4A3A6B]" />
            </div>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-2 sm:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm"
                style={{
                  backgroundColor: item.active ? '#F5F3FF' : 'transparent',
                  color: item.active ? '#4A3A6B' : '#6B6B80',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                <item.Icon className="h-4 w-4" style={{ color: item.active ? '#4A3A6B' : '#6B6B80' }} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Bell className="h-5 w-5 text-[#6B6B80]" />
              <span
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: '#E53E3E', color: '#FFFFFF', fontFamily: 'Nunito, sans-serif' }}
              >
                3
              </span>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: '#6D5BD0', color: '#FFFFFF', fontFamily: 'Nunito, sans-serif' }}
            >
              MG
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 rounded-[32px] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className="text-2xl font-extrabold"
              style={{ color: '#4A3A6B', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Tablero del Proyecto
            </h1>
            <p className="mt-2 text-sm" style={{ color: '#6B6B80', fontFamily: 'Nunito, sans-serif' }}>
              Sistema de Gestión Escolar · Sprint 3
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B80]" />
              <input
                type="search"
                placeholder="Buscar"
                className="h-12 rounded-2xl border border-[#E5E7F0] bg-white pl-10 pr-4 text-sm text-[#2D2D3F] outline-none"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              />
            </label>
            <button
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:opacity-95"
              style={{
                background: 'linear-gradient(135deg, #6d5bd0 0%, #3a2f8f 100%)',
                color: '#FFFFFF',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva tarea
            </button>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-4">
          {columns.map((column) => (
            <div
              key={column.title}
              className="rounded-3xl p-5 shadow-sm"
              style={{ backgroundColor: '#FFF0F6' }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: column.accent }}
                  />
                  <h2
                    className="text-sm font-semibold"
                    style={{ color: '#2D2D3F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {column.title}
                  </h2>
                </div>
                <div
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: '#F3F4F6', color: '#6B6B80', fontFamily: 'Nunito, sans-serif' }}
                >
                  {column.count}
                </div>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: '#FFFFFF', color: '#6B6B80' }}
                  aria-label={`Agregar tarea a ${column.title}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${column.progress}%`, backgroundColor: column.accent }}
                />
              </div>
              <p className="text-xs" style={{ color: '#6B6B80', fontFamily: 'Nunito, sans-serif' }}>
                {column.progress}% del total
              </p>

              <div className="mt-5 space-y-4">
                {column.tasks.map((task) => {
                  const priority = priorityStyles[task.priority]
                  const Avatar = avatars[task.owner]
                  return (
                    <div
                      key={task.title}
                      className="rounded-2xl border border-[#E5E7F0] bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3
                            className="text-sm font-semibold leading-snug"
                            style={{ color: '#2D2D3F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            {task.title}
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full px-2 py-1 text-[11px] font-medium"
                                style={{
                                  backgroundColor: '#F3E8FF',
                                  color: '#4A3A6B',
                                  fontFamily: 'Nunito, sans-serif',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div
                          className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1"
                          style={{
                            borderColor: priority.border,
                            backgroundColor: priority.bg,
                          }}
                        >
                          <span
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                            style={{
                              backgroundColor: priority.bg,
                              color: priority.color,
                              border: `1px solid ${priority.border}`,
                            }}
                          >
                            <priority.Icon className="h-3.5 w-3.5" />
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: priority.color, fontFamily: 'Nunito, sans-serif' }}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[13px] text-[#6B6B80]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" style={{ color: '#6B6B80' }} />
                            {task.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" style={{ color: '#6B6B80' }} />
                            {task.comments}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Paperclip className="h-3.5 w-3.5" style={{ color: '#6B6B80' }} />
                            {task.attachments}
                          </span>
                        </div>
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                          style={{ backgroundColor: Avatar.bg, color: '#FFFFFF', fontFamily: 'Nunito, sans-serif' }}
                        >
                          {Avatar.label}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

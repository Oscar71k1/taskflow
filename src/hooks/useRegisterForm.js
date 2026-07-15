import { useState } from 'react'

const validateEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function useRegisterForm(onRegisterSuccess = () => console.log('Registro exitoso')) {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = {}
    if (!values.fullName || values.fullName.trim().length < 3) {
      newErrors.fullName = 'Ingresa tu nombre completo (mínimo 3 caracteres)'
    }
    if (!validateEmail(values.email)) {
      newErrors.email = 'Ingresa un correo válido'
    }
    if (!values.password || values.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas deben coincidir'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onRegisterSuccess({ email: values.email, fullName: values.fullName })
    }, 1000)
  }

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  }
}

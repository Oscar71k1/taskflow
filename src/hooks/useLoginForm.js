import { useState } from 'react'

const allowedCredentials = { email: 'demo@escuela.edu.mx', password: 'demo1234' }

const validateEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function useLoginForm(onLoginSuccess = () => console.log('Login exitoso')) {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined, credentials: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = {}
    if (!validateEmail(values.email)) {
      newErrors.email = 'Ingresa un correo válido'
    }
    if (!values.password || values.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (values.email !== allowedCredentials.email || values.password !== allowedCredentials.password) {
      setErrors({ credentials: 'Credenciales incorrectas' })
      return
    }

    setErrors({})
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLoginSuccess({ email: values.email })
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

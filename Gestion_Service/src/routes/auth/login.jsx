import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'
import { Password } from 'primereact/password'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { useMutation } from '@tanstack/react-query'
import { Loginservice } from '../../api/auth'
import { jwtDecode } from 'jwt-decode'
export const Route = createFileRoute('/auth/login')({
  component: () => <Login />
})

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      if (decodedToken.exp > currentTime) {
        navigate({ to: '/home' })
      }
    }
  }, [navigate])
  const { isLoading, mutate: doLogin } = useMutation({
    mutationFn: Loginservice,
    onError: (err) => {
      setError(err.message)
    },
    onSuccess: (e) => {
      console.log(e)
      //enregister le token in localStorage
      localStorage.setItem('token', e.token)
      localStorage.setItem('supportId', e.support_id)

      setError('')
      navigate({ to: '/home' })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('') // Réinitialise les erreurs avant de tenter une connexion
    doLogin({ email: username, password })
  }

  return (
    <div className="">
      <Card className="card_login">
        <h3 className="center">Connectez-vous à votre compte</h3>
        <img
          src={'/public/images/login.png'}
          alt="login_img"
          className="login-image"
        />
        <Card className="login">
          <form onSubmit={handleSubmit}>
            <div className="justify-content-center gap-3 p-fluid mt-5 ml-2 mr-2">
              <FloatLabel>
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-inputtext-lg"
                  aria-describedby={error ? 'username-error' : undefined}
                />
                <label htmlFor="username">Email</label>
              </FloatLabel>
            </div>

            <div className="justify-content-center gap-3 p-fluid mt-6 ml-2 mr-2">
              <FloatLabel>
                <Password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                  className="p-inputtext-lg"
                  aria-describedby={error ? 'password-error' : undefined}
                />
                <label htmlFor="password">Password</label>
              </FloatLabel>
            </div>

            {error && <div className="error text-center mt-2">{error}</div>}

            <p className="flex justify-content-center mt-3">
              Vous n'avez pas de compte?{' '}
              <Link to="/auth/Register">Créer un compte</Link>
            </p>

            <div className="card flex flex-wrap justify-content-center gap-3 mt-4">
              <Button
                label="Se Connecter"
                severity="secondary"
                loading={isLoading}
                type="submit"
              />
            </div>
          </form>
        </Card>
      </Card>
    </div>
  )
}

export default Login

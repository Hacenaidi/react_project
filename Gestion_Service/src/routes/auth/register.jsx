import React, { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { useMutation } from '@tanstack/react-query'

import { RegisterService } from '../../api/auth'
export const Route = createFileRoute('/auth/register')({
  component: () => <Register />
})

function Register() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    cin: '',
    numTel: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { isLoading, mutate: doRegister } = useMutation({
    mutationFn: RegisterService,
    onError: (err) => {
      setError(err.message)
    },
    onSuccess: () => {
      //navigate to login with link component from react-router
      console.log('success')
      navigate({ to: '/auth/login' })

      setError('')
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('') // Réinitialiser les erreurs avant d'envoyer
    doRegister(form)
  }

  return (
    <div className="">
      <Card className="card_register">
        <h3 className="center">Créer un compte</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FloatLabel>
              <InputText
                id="nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                className="p-inputtext-lg"
                required
              />
              <label htmlFor="nom">Nom</label>
            </FloatLabel>
          </div>

          <div className="form-group ">
            <FloatLabel>
              <InputText
                id="prenom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                className="p-inputtext-lg"
                required
              />
              <label htmlFor="prenom">Prénom</label>
            </FloatLabel>
          </div>

          <div className="form-group">
            <FloatLabel>
              <InputText
                id="cin"
                name="cin"
                value={form.cin}
                onChange={handleChange}
                className="p-inputtext-lg"
                required
              />
              <label htmlFor="cin">CIN</label>
            </FloatLabel>
          </div>

          <div className="form-group">
            <FloatLabel>
              <InputText
                id="numTel"
                name="numTel"
                value={form.numTel}
                onChange={handleChange}
                className="p-inputtext-lg"
                required
              />
              <label htmlFor="numTel">Numéro de téléphone</label>
            </FloatLabel>
          </div>

          <div className="form-group">
            <FloatLabel>
              <InputText
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="p-inputtext-lg"
                required
              />
              <label htmlFor="email">Email</label>
            </FloatLabel>
          </div>

          <div className="form-group">
            <FloatLabel>
              <Password
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                toggleMask
                className="p-inputtext-lg"
                required
              />
              <label htmlFor="password">Mot de passe</label>
            </FloatLabel>
          </div>

          {error && (
            <div className="error mt-2 mr-8 flex justify-content-center">
              {error}
            </div>
          )}

          <div className="form-actions mt-4">
            <Button
              label="S'inscrire"
              severity="success"
              loading={isLoading}
              type="submit"
            />
          </div>
          <p className=" flex justify-content-center mt-3">
            Vous avez un compte? <Link to="/auth/login">Se connecter</Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default Register

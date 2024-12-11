import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { Steps } from 'primereact/steps'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { fetchSecteurs, fetchTechniciens, createTicket } from '../api/Tickets'

export const Route = createFileRoute('/AddTickets')({
  component: () => <AddTickets />
})

function AddTickets() {
  const navigate = useNavigate()
  const toast = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    zone: '',
    description: '',
    montant: '',
    secteur: '',
    technicien: ''
  })
  const [errors, setErrors] = useState({})

  const {
    data: secteurs,
    isLoading: isLoadingSecteurs,
    error: errorSecteurs
  } = useQuery({
    queryFn: fetchSecteurs,
    queryKey: ['secteurs']
  })

  const {
    data: techniciens,
    isLoading: isLoadingTechniciens,
    error: errorTechniciens
  } = useQuery({
    queryFn: () => fetchTechniciens(formData.secteur),
    queryKey: ['techniciens', formData.secteur],
    enabled: !!formData.secteur
  })

  const { isLoading: isLoadingcreat, mutate: docreate } = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      // Afficher un toast de succès
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Ticket ajouté avec succès',
        life: 3000
      })
      // Rediriger vers la page d'accueil après un délai
      setTimeout(() => {
        navigate({ to: '/Home' })
      }, 1000)
    },
    onError: (error) => {
      // Gérer les erreurs
      setErrors({ ...errors, ...error })
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleDropdownChange = (e) => {
    const { name, value } = e.value
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const validateStep = (step) => {
    let newErrors = {}
    switch (step) {
      case 0:
        if (!formData.nom) newErrors.nom = 'Nom est requis'
        if (!formData.prenom) newErrors.prenom = 'Prénom est requis'
        if (!formData.telephone) newErrors.telephone = 'Téléphone est requis'
        if (!formData.adresse) newErrors.adresse = 'Adresse est requise'
        if (!formData.zone) newErrors.zone = 'Zone est requise'
        break
      case 1:
        if (!formData.description)
          newErrors.description = 'Description est requise'
        if (!formData.montant) newErrors.montant = 'Montant est requis'
        if (!formData.secteur) newErrors.secteur = 'Secteur est requis'
        if (!formData.technicien) newErrors.technicien = 'Technicien est requis'
        break
      default:
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const items = [
    {
      label: 'Step 1',
      command: (event) => {}
    },
    {
      label: 'Step 2',
      command: (event) => {}
    },
    {
      label: 'Step 3',
      command: (event) => {}
    }
  ]

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="step1">
            <div className="card flex flex-wrap gap-3 p-fluid ">
              <div className="p-field w-5">
                <label htmlFor="nom">Nom</label>
                <InputText
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
                {errors.nom && <small className="p-error">{errors.nom}</small>}
              </div>
              <div className="p-field w-5">
                <label htmlFor="prenom">Prénom</label>
                <InputText
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
                {errors.prenom && (
                  <small className="p-error">{errors.prenom}</small>
                )}
              </div>
              <div className="p-field w-5">
                <label htmlFor="telephone">Téléphone</label>
                <InputText
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
                {errors.telephone && (
                  <small className="p-error">{errors.telephone}</small>
                )}
              </div>
              <div className="p-field w-5 ">
                <label htmlFor="adresse">Adresse</label>
                <InputText
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                />
                {errors.adresse && (
                  <small className="p-error">{errors.adresse}</small>
                )}
              </div>
              <div className="p-field w-4">
                <label htmlFor="zone">Zone</label>
                <InputText
                  id="zone"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                />
                {errors.zone && (
                  <small className="p-error">{errors.zone}</small>
                )}
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="step2">
            <div className="card flex flex-wrap gap-3 p-fluid ">
              <div className="p-field w-6">
                <label htmlFor="description">Description</label>
                <InputTextarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <small className="p-error">{errors.description}</small>
                )}
              </div>
              <div className="p-field w-5">
                <label htmlFor="montant">Montant</label>
                <InputNumber
                  id="montant"
                  name="montant"
                  value={formData.montant}
                  onValueChange={handleChange}
                />
                {errors.montant && (
                  <small className="p-error">{errors.montant}</small>
                )}
              </div>
              <div className="p-field w-3">
                <label htmlFor="secteur">Secteur</label>
                <Dropdown
                  id="secteur"
                  name="secteur"
                  value={formData.secteur}
                  options={
                    secteurs?.map((secteur) => ({
                      label: secteur.sect,
                      value: secteur.id
                    })) || []
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, secteur: e.value })
                  }
                  placeholder="Sélectionner un secteur"
                />
                {errors.secteur && (
                  <small className="p-error">{errors.secteur}</small>
                )}
              </div>
              <div className="p-field w-3">
                <label htmlFor="technicien">Technicien</label>
                <Dropdown
                  id="technicien"
                  name="technicien"
                  value={formData.technicien}
                  options={
                    techniciens?.map((technicien) => ({
                      label: technicien.nom + ' ' + technicien.prenom,
                      value: technicien.id
                    })) || []
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, technicien: e.value })
                  }
                  placeholder="Sélectionner un technicien"
                />
                {errors.technicien && (
                  <small className="p-error">{errors.technicien}</small>
                )}
              </div>
            </div>
          </div>
        )
      case 2:
        const selectedTechnicien = techniciens.find(
          (e) => e.id === formData.technicien
        )
        return (
          <div className="step3">
            <div className="resume">
              <h2>Résumé</h2>
              <p>
                <strong>Nom:</strong> {formData.nom}
              </p>
              <p>
                <strong>Prénom:</strong> {formData.prenom}
              </p>
              <p>
                <strong>Téléphone:</strong> {formData.telephone}
              </p>
              <p>
                <strong>Adresse:</strong> {formData.adresse}
              </p>
              <p>
                <strong>Zone:</strong> {formData.zone}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Montant:</strong> {formData.montant + ' dt'}
              </p>
              <p>
                <strong>Secteur:</strong> {formData.secteur}
              </p>
              <p>
                <strong>Technicien: </strong>
                {selectedTechnicien
                  ? `${selectedTechnicien.nom} ${selectedTechnicien.prenom}`
                  : formData.technicien}
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleNext = () => {
    if (validateStep(activeIndex)) {
      setActiveIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1)
  }

  const handleSubmit = () => {
    if (validateStep(activeIndex)) {
      const ticketData = {
        nomClient: formData.nom,
        prenomClient: formData.prenom,
        numTelClient: formData.telephone,
        adresse: formData.adresse,
        zone: formData.zone,
        montant: formData.montant,
        secteur: formData.secteur,
        description: formData.description,
        etat: 'En cours',
        SupportId: localStorage.getItem('supportId'),
        TechnicienId: formData.technicien
      }
      setErrors({})
      docreate(ticketData)
    }
  }

  return (
    <div className="index">
      <Header />
      <Navbar />
      <main className="content">
        <Toast ref={toast} />
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={true}
        />
        <div className="steps-content">{renderStepContent(activeIndex)}</div>
        <div className="steps-action">
          <Button
            label="Précédent"
            icon="pi pi-chevron-left"
            onClick={handlePrev}
            disabled={activeIndex === 0}
          />
          <Button
            label={activeIndex === items.length - 1 ? 'Ajoute' : 'Suivant'}
            icon={
              activeIndex === items.length - 1
                ? 'pi pi-check'
                : 'pi pi-chevron-right'
            }
            onClick={
              activeIndex === items.length - 1 ? handleSubmit : handleNext
            }
            className="ml-2"
            loading={isLoadingcreat}
            disable={isLoadingcreat}
          />
        </div>
      </main>
    </div>
  )
}

export default AddTickets

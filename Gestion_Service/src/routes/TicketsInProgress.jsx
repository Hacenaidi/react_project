import React, { useState, useRef } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import {
  fetchTicketsEnCours,
  confirmTicket,
  cancelTicket
} from '../api/tickets'

export const Route = createFileRoute('/TicketsInProgress')({
  component: () => <TicketsEnCours />
})

function TicketsEnCours() {
  const navigate = useNavigate()
  const toast = useRef(null)
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const {
    data: ticketsEnCours,
    isLoading,
    error
  } = useQuery({
    queryFn: fetchTicketsEnCours,
    queryKey: ['ticketsEnCours']
  })

  const { isLoading: isLoadingConfirm, mutate: doConfirm } = useMutation({
    mutationFn: confirmTicket,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Ticket confirmé avec succès',
        life: 3000
      })
      queryClient.invalidateQueries('ticketsEnCours')
    }
  })

  const { isLoading: isLoadingCancel, mutate: doCancel } = useMutation({
    mutationFn: cancelTicket,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Ticket annulé avec succès',
        life: 3000
      })
      queryClient.invalidateQueries('ticketsEnCours')
    }
  })

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <Navbar />
        <main className="content">
          <div>Loading...</div>
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <Navbar />
        <main className="content">
          <div>Error: {error.message}</div>
        </main>
      </>
    )
  }

  const filteredTickets = ticketsEnCours.filter(
    (ticket) =>
      ticket.Technicien.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.Technicien.prenom
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      ticket.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.montant.toString().includes(searchTerm) ||
      ticket.etat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(ticket.createdAt).includes(searchTerm)
  )

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          label="Confirmer"
          icon="pi pi-check"
          className="p-button-success w-4 mr-2"
          onClick={() => doConfirm(rowData.id)}
          loading={isLoadingConfirm}
        />
        <Button
          label="Annuler"
          icon="pi pi-times"
          className="p-button-danger w-4 mr-2"
          onClick={() => doCancel(rowData.id)}
          loading={isLoadingCancel}
        />
        <Button
          label="Modifier"
          icon="pi pi-pencil"
          className="p-button-warning w-4 mr-2"
          onClick={() => modifTicket(rowData.id)}
        />
      </div>
    )
  }

  const modifTicket = (id) => {
    navigate({
      to: '/modify',
      state: { ticket: filteredTickets.find((ticket) => ticket.id === id) }
    })
    console.log(`Modifier le ticket avec l'ID: ${id}`)
  }

  return (
    <div className="index">
      <Header />
      <Navbar />
      <main className="content">
        <Toast ref={toast} />
        <div className="ticketsEncours">
          <h1>Tickets en cours :</h1>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </IconField>
          <DataTable value={filteredTickets} tableStyle={{ minWidth: '50rem' }}>
            <Column field="Technicien.nom" header="Nom du Technicien"></Column>
            <Column
              field="Technicien.prenom"
              header="Prénom du Technicien"
            ></Column>
            <Column field="adresse" header="Adresse"></Column>
            <Column field="montant" header="Prix"></Column>
            <Column field="etat" header="Statut"></Column>
            <Column
              field="createdAt"
              header="Date"
              body={(rowData) => formatDate(rowData.createdAt)}
            ></Column>
            <Column body={actionBodyTemplate} header="Actions"></Column>
          </DataTable>
        </div>
      </main>
    </div>
  )
}

export default TicketsEnCours

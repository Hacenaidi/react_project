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
import { fetchTicketsAnAC, deleteTicket } from '../api/tickets'

export const Route = createFileRoute('/History')({
  component: () => <History />
})

function History() {
  const toast = useRef(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const {
    data: ticketsHistorique,
    isLoading,
    error
  } = useQuery({
    queryFn: fetchTicketsAnAC,
    queryKey: ['ticketsHistorique']
  })

  const { isLoading: isLoadingDelete, mutate: doDelete } = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Ticket supprimé avec succès',
        life: 3000
      })
      queryClient.invalidateQueries('ticketsHistorique')
    },
    onError: (error) => {
      console.log
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: error.message,
        life: 3000
      })
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

  const filteredTickets = ticketsHistorique.filter(
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
          label="Afficher"
          className="p-button-info w-2 mr-2 p-2"
          onClick={() => afficherTicket(rowData)}
          loading={false}
        />
        <Button
          label="Imprimer"
          className="p-button-warning w-2 mr-2 p-2"
          onClick={() => imprimerTicket(rowData)}
          loading={false}
        />
        <Button
          label="Mise a jour "
          className="p-button-success w-3 mr-2 p-2"
          onClick={() => modifTicket(rowData.id)}
        />
        <Button
          label="Supprimer"
          className="p-button-danger w-3 mr-2 p-2"
          onClick={() => doDelete(rowData.id)}
          loading={isLoadingDelete}
        />
      </div>
    )
  }
  const getStatusColor = (etat) => {
    switch (etat) {
      case 'Accomplie':
        return 'green'
      case 'Annulé':
        return 'red'
      case 'En cours':
        return 'black'
      default:
        return 'black'
    }
  }
  const imprimerTicket = (ticket) => {
    const ticketContent = `
      <html>
        <head>
          <title>Impression du ticket</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .ticket { border: 1px solid #ccc; padding: 20px; width: 300px; margin: auto; }
            .ticket h1 { font-size: 20px; text-align: center; }
            .ticket p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div className="display">
          <h1>Affichage : </h1>
          <h2>Facture ${ticket.id}</h2>
          <p style=${{ color: getStatusColor(ticket.etat) }} className="etat">
            <strong>État:</strong> ${ticket.etat}
          </p>
          <div className="display-table">
            <table>
              <tr>
                <td>
                  <strong>Nom du Client:</strong>
                </td>
                <td> ${ticket.nomClient}</td>
                <td>
                  <strong>Zone:</strong>${' '}
                </td>
                <td>${ticket.zone}</td>
              </tr>
              <tr>
                <td>
                  ${' '}
                  <strong>Prénom du Client:</strong>
                </td>
                <td> ${ticket.prenomClient}</td>
                <td>
                  ${' '}
                  <strong>Montant:</strong>${' '}
                </td>
                <td>${ticket.montant}</td>
              </tr>
              <tr>
                <td>
                  <strong>Secteur:</strong>${' '}
                </td>
                <td>${ticket.secteur}</td>
                <td>
                  <strong>Date de Création:</strong>
                </td>
                <td> ${formatDate(ticket.createdAt)}</td>
              </tr>
              <tr>
                <td>
                  ${' '}
                  <strong>Adresse:</strong>${' '}
                </td>
                <td>${ticket.adresse}</td>
                <td>
                  <strong>Technicien:</strong>${' '}
                </td>
                <td>
                  ${ticket.Technicien.nom} ${ticket.Technicien.prenom}
                </td>
              </tr>
              <tr className="dis">
                <td colspan="2">
                  ${' '}
                  <strong>Description:</strong>${' '}
                </td>
                <td>${ticket.description}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `

    const newWindow = window.open('', '_blank', 'width=600,height=400')
    newWindow.document.write(ticketContent)
    newWindow.document.close()
    newWindow.print()
  }
  const afficherTicket = (ticket) => {
    navigate({
      to: '/display',
      state: { ticket }
    })
    console.log(`Afficher le ticket avec l'ID: ${ticket.id}`)
  }

  const modifTicket = (id) => {
    navigate({
      to: '/modify',
      state: { ticket: filteredTickets.find((ticket) => ticket.id === id) }
    })
    console.log(`Modifier le ticket avec l'ID: ${id}`)
  }

  const fullNameTemplate = (rowData) => {
    return `${rowData.Technicien.nom} ${rowData.Technicien.prenom}`
  }

  return (
    <div className="index">
      <Header />
      <Navbar />
      <main className="content">
        <Toast ref={toast} />
        <div className="ticketsHistorique">
          <h1>Historique des tickets :</h1>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </IconField>
          <DataTable value={filteredTickets} tableStyle={{ minWidth: '50rem' }}>
            <Column
              field="Technicien.nom"
              header="Technicien"
              body={fullNameTemplate}
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

export default History

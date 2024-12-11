import { createFileRoute } from '@tanstack/react-router'
import { React, useEffect, useState, useRef } from 'react'
import { useQuery, useQueries } from '@tanstack/react-query'
import Header from '../components/Header'
import { Card } from 'primereact/card'
import Navbar from '../components/Navbar'
import { ProgressBar } from 'primereact/progressbar'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Link } from '@tanstack/react-router'
import { Toast } from 'primereact/toast'
import {
  fetchSupports,
  fetchNbrTicketEnCours,
  fetchNbrTicketDat,
  fetchNbrTickSem
} from '../api/home'

export const Route = createFileRoute('/Home')({
  component: () => <Home />
})

function Home() {
  const toast = useRef(null)
  const {
    data: supports,
    isLoading: isLoadingSupports,
    error: errorSupports
  } = useQuery({
    queryFn: fetchSupports,
    queryKey: ['supports']
  })

  const {
    data: nbrTicketEnCours,
    isLoading: isLoadingNbrTicketEnCours,
    error: errorNbrTicketEnCours
  } = useQuery({
    queryFn: fetchNbrTicketEnCours,
    queryKey: ['nbrTicketEnCours']
  })

  const {
    data: nbrTicketDat,
    isLoading: isLoadingNbrTicketDat,
    error: errorNbrTicketDat
  } = useQuery({
    queryFn: fetchNbrTicketDat,
    queryKey: ['nbrTicketDat']
  })

  const {
    data: nbrTickSem,
    isLoading: isLoadingNbrTickSem,
    error: errorNbrTickSem
  } = useQuery({
    queryFn: fetchNbrTickSem,
    queryKey: ['nbrTickSem']
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      toast.current.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'Ticket ajouté avec succès',
        life: 3000
      })
    }
  }, [])

  if (
    isLoadingSupports ||
    isLoadingNbrTicketEnCours ||
    isLoadingNbrTicketDat ||
    isLoadingNbrTickSem
  ) {
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

  if (
    errorSupports ||
    errorNbrTicketEnCours ||
    errorNbrTicketDat ||
    errorNbrTickSem
  ) {
    return (
      <>
        <Header />
        <Navbar />
        <main className="content">
          <div>
            Error:{' '}
            {errorSupports?.message ||
              errorNbrTicketEnCours?.message ||
              errorNbrTicketDat?.message ||
              errorNbrTickSem?.message}
          </div>
        </main>
      </>
    )
  }

  return (
    <div className="index">
      <Header />
      <Navbar />
      <main className="content">
        <Toast ref={toast} />
        <div className="home">
          <div>
            <Link to="/AddTickets">
              <div className="card_home newtickets">
                <div className="head">
                  <h1>Nouveau Ticket</h1>
                  <i className="pi pi-plus-circle"></i>
                </div>
                <h2>{nbrTicketDat?.nombreTicket}</h2>
                <p>{nbrTicketDat?.nombreTicket / 25}% objectif quotidien</p>
                <p>
                  {nbrTickSem?.nombre_tickets_semaine_derniere} cette semaine
                </p>
              </div>
            </Link>
            <Link to="/TicketsInProgress">
              <div className="card_home tickets">
                <div className="head m-0">
                  <h1>Tickets en cours</h1>
                  <i className="pi pi-hourglass"></i>
                </div>
                <h2>{nbrTicketEnCours?.nombreTicket}</h2>
                <ProgressBar
                  value={(nbrTicketEnCours?.nombreTicket / 25) * 100}
                  className="m-0"
                ></ProgressBar>
                <p>
                  Nombre total : {nbrTickSem?.nombre_tickets_semaine_derniere}
                </p>
              </div>
            </Link>
            <div className="card_home nb_h">
              <div className="head">
                <h1>Nombre d'heures</h1>
                <i className="pi pi-history"></i>
              </div>
              <h2>4h</h2>
              <p>28h cette semaine</p>
            </div>
          </div>
          <Card className="table_user" title="Statistiques des employées">
            <div>
              <DataTable
                value={supports}
                tableStyle={{ minWidth: '50rem' }}
                className="table"
                size="large"
                showGridlines
                stripedRows
              >
                <Column field="nom" header="Nom"></Column>
                <Column field="prenom" header="Prénom"></Column>
                <Column
                  body={(rowData) => rowData.nombre_tickets}
                  header="Nombre de tickets par jour"
                ></Column>
                <Column
                  header="Progression"
                  body={(rowData) => (rowData.nombre_tickets / 25) * 100 + '%'}
                ></Column>
              </DataTable>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Home

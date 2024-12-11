import {
  createFileRoute,
  useLocation,
  useNavigate
} from '@tanstack/react-router'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { Button } from 'primereact/button'

export const Route = createFileRoute('/display')({
  component: () => <Display />
})

function Display() {
  const location = useLocation()
  const navigate = useNavigate()
  const ticket = location.state?.ticket

  if (!ticket) {
    return (
      <div className="index">
        <Header />
        <Navbar />
        <main className="content">
          <h1>Aucun ticket sélectionné</h1>
        </main>
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-CA', options)
  }
  return (
    <div className="index">
      <Header />
      <Navbar />
      <main className="content">
        <div className="display">
          <h1>Affichage : </h1>
          <h2>Facture {ticket.id}</h2>
          <p style={{ color: getStatusColor(ticket.etat) }} className="etat">
            <strong>État:</strong> {ticket.etat}
          </p>
          <div className="display-table">
            <table>
              <tr>
                <td>
                  <strong>Nom du Client:</strong>
                </td>
                <td> {ticket.nomClient}</td>
                <td>
                  <strong>Zone:</strong>{' '}
                </td>
                <td>{ticket.zone}</td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <strong>Prénom du Client:</strong>
                </td>
                <td> {ticket.prenomClient}</td>
                <td>
                  {' '}
                  <strong>Montant:</strong>{' '}
                </td>
                <td>{ticket.montant}</td>
              </tr>
              <tr>
                <td>
                  <strong>Secteur:</strong>{' '}
                </td>
                <td>{ticket.secteur}</td>
                <td>
                  <strong>Date de Création:</strong>
                </td>
                <td> {formatDate(ticket.createdAt)}</td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <strong>Adresse:</strong>{' '}
                </td>
                <td>{ticket.adresse}</td>
                <td>
                  <strong>Technicien:</strong>{' '}
                </td>
                <td>
                  {ticket.Technicien.nom} {ticket.Technicien.prenom}
                </td>
              </tr>
              <tr className="dis">
                <td colspan="2">
                  {' '}
                  <strong>Description:</strong>{' '}
                </td>
                <td>{ticket.description}</td>
              </tr>
            </table>
          </div>
        </div>
        <Button
          label="Modifier"
          icon="pi pi-pencil"
          className="p-button-warning mt-4 relative left-50"
          onClick={() => navigate({ to: '/modify', state: { ticket } })}
        />
      </main>
    </div>
  )
}

export default Display

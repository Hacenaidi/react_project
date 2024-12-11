// src/api/home.jsx
export async function fetchSecteurs() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch('/api/secteurs', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch secteurs')
  }
  return response.json()
}

export async function fetchTechniciens(secteur) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch(`/api/filtrTech/${secteur}`, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch techniciens')
  }
  return response.json()
}

export async function createTicket(ticketData) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch('/api/createticket', {
    method: 'POST',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticketData)
  })
  if (!response.ok) {
    throw new Error('Failed to create ticket')
  }
  return response.json()
}
export async function fetchTicketsEnCours() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch('/api/ticketsEnCours', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch tickets en cours')
  }
  return response.json()
}
export async function confirmTicket(id) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch(`/api/confirmer/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to confirm ticket')
  }
  return response.json()
}

export async function cancelTicket(id) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch(`/api/annuler/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to cancel ticket')
  }
  return response.json()
}

export async function fetchTicketsAnAC() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch('/api/ticketsAnAC', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch tickets accomplis et annulés')
  }
  return response.json()
}

export async function updateTicket(ticketData) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch(`/api/ticket/${ticketData.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticketData)
  })
  if (!response.ok) {
    throw new Error('Failed to update ticket')
  }
  return response.json()
}
export async function deleteTicket(id) {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch(`/api/ticket/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to delete ticket')
  }
  return response.text()
}

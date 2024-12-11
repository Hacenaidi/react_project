// src/api/home.jsx
export async function fetchSupports() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch('/api/supportwork', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch supports')
  }
  return response.json()
}

export async function fetchNbrTicketEnCours() {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch('/api/nbrticketEnCours', {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch number of tickets in progress')
  }
  return response.json()
}

export async function fetchNbrTicketDat() {
  const token = localStorage.getItem('token')
  const supportId = localStorage.getItem('supportId')
  if (!token || !supportId) {
    throw new Error('No token or support ID found')
  }
  const response = await fetch(`/api/nbrticketDat/${supportId}`, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch number of tickets per day')
  }
  return response.json()
}
// src/api/home.jsx
export async function fetchNbrTickSem() {
  const token = localStorage.getItem('token')
  const supportId = localStorage.getItem('supportId')

  if (!token) {
    throw new Error('No token found')
  }
  const response = await fetch(`/api/nbrTickSem/${supportId}`, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Failed to fetch number of tickets for last week')
  }
  return response.json()
}

export async function Loginservice({ email, password }) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok) {
    throw new Error('invalid email or password !!')
  }

  return response.json()
}
export async function RegisterService({
  nom,
  prenom,
  cin,
  numTel,
  email,
  password
}) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom, prenom, cin, numTel, email, password })
  })

  if (!response.ok) {
    throw new Error('This email is used !!')
  }

  return await response.json()
}

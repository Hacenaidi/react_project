import { React, useEffect, useRef } from 'react'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Link, useNavigate } from '@tanstack/react-router'
import { Badge } from 'primereact/badge'
import { PanelMenu } from 'primereact/panelmenu'

const Header = () => {
  const navigate = useNavigate()

  const itemRenderer = (item, options) => (
    <a
      className="flex align-items-center px-3 py-2 cursor-pointer"
      onClick={options.onClick}
    >
      <span className={`${item.icon} text-primary`} />
      <span className={`mx-2 ${item.items && 'font-semibold'}`}>
        {item.label}
      </span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  )

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('supportId')
    navigate({ to: '/auth/login' })
  }

  const items = [
    {
      label: 'Utilisateur',
      icon: 'pi pi-fw pi-user',
      template: itemRenderer,
      items: [
        {
          label: 'Déconnexion',
          icon: 'pi pi-power-off',
          command: () => {
            logout()
          }
        }
      ]
    }
  ]

  useEffect(() => {
    //recupper le token de l'utilisateur et verifier si il est connecté
    const token = localStorage.getItem('token')
    if (!token) {
      navigate({ to: '/auth/login' })
    }
  }, [navigate])

  return (
    <header className="header">
      <div className="user">
        <i
          className="pi pi-bell p-overlay-badge"
          style={{ fontSize: '1.5rem' }}
        >
          <Badge value="2"></Badge>
        </i>
        <PanelMenu model={items} className="w-full md:w-10rem my-3" />
      </div>
    </header>
  )
}

export default Header

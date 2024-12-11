import React from 'react'
import { Link } from '@tanstack/react-router'
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="head">
        <img src={'/public/images/header.png'} alt="logo" className="bg_img" />
        <img
          src={'/public/images/header1.png'}
          alt="logo"
          className="logo_img"
        />
        <h2>3amsalle7</h2>
      </div>
      <div className="body">
        <ul>
          <li>
            <i className="pi pi-home"></i>
            <Link to={'/Home'}>Tableau de bord</Link>
          </li>
          <li>
            <i className="pi pi-plus-circle"></i>
            <Link to={'/AddTickets'}>Nouveau ticket</Link>
          </li>
          <li>
            <i className="pi pi-history"></i>
            <Link to={'/History'}>Historique</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

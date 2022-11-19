import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = () => (
  <nav className="navbar-header">
    <div className="navbar-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo"
      />
      <ul className="nav-mobile-items-container">
        <li>
          <Link to="/" className="nav-mobile-item">
            <AiFillHome className="nav-icon" />
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-mobile-item">
            <BsBriefcaseFill className="nav-icon" />
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-mobile-item">
            <FiLogOut className="nav-icon" />
          </Link>
        </li>
      </ul>
      <ul className="nav-desktop-items-container">
        <li>
          <Link to="/" className="nav-mobile-item nav-item-margin">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-mobile-item">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-desktop-button">
        Logout
      </button>
    </div>
  </nav>
)

export default withRouter(Header)

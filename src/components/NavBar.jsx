import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    Navbar
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <Link to="/">
                        <li className="nav-item nav-link">
                            UserList
                        </li>

                    </Link>
                    <Link to="/adduser">
                        <li className="nav-item nav-link">
                            {/* <a className="nav-link" >Add Users</a> */}
                            Add Users
                        </li>
                    </Link>
                    
                    </ul>
                </div>
                </nav>
        </div>
    )
}

export default NavBar

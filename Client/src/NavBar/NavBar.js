import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import './NavBar.css'; // import custom CSS file

//our navbar with links to the different pages, the Navbar will always be displayed. Refer to App.js to change this
function NavBar() {
    return (
        <Navbar expand="lg" className='nav'>
            <Navbar.Brand as={Link} to="/">iTunes Search App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">Search</Nav.Link>
                        <Nav.Link as={Link} to="/favorites" className="nav-link">Favorites</Nav.Link>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;

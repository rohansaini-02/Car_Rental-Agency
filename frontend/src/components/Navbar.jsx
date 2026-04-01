import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar as BootstrapNavbar, Container, Nav, Dropdown } from 'react-bootstrap';

const Navbar = () => {
    const { isLoggedIn, role, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        if(e) e.preventDefault();
        logout();
        navigate('/');
    };

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
                    Rentify
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/cars">Available Cars</Nav.Link>
                    </Nav>
                    <Nav>
                        {!isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="outline-primary" id="dropdown-register" className="ms-2">
                                        Register
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="shadow">
                                        <Dropdown.Item as={Link} to="/register-customer">As Customer</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/register-agency">As Agency</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                {role === 'customer' && (
                                    <Nav.Link as={Link} to="/my-bookings" className="me-3">My Bookings</Nav.Link>
                                )}
                                {role === 'agency' && (
                                    <Nav.Link as={Link} to="/dashboard" className="me-3">Dashboard</Nav.Link>
                                )}
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="light" id="dropdown-user" className="rounded-pill px-3">
                                        <i className="bi bi-person-circle me-2"></i>{user?.name || 'Account'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="shadow">
                                        <Dropdown.Item onClick={handleLogout} className="text-danger">
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;

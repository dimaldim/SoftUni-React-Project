import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const ExampleToast = ({ children }) => {
	const [show, toggleShow] = useState(true);

	return (
	<>
		{!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
		<Toast show={show} onClose={() => toggleShow(false)}>
			<Toast.Header>
				<strong className="mr-auto">React-Bootstrap</strong>
			</Toast.Header>
			<Toast.Body>{children}</Toast.Body>
		</Toast>
	</>
	);
};

const App = () => (
<Container className="p-3">
	<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		<Navbar.Brand href="#">Recognize Me! :-)</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		<Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="mr-auto">
				<Nav.Link href="#">Home</Nav.Link>
				<Nav.Link href="#">Gallery</Nav.Link>
			</Nav>
			<Nav>
				<Nav.Link href="#">Login</Nav.Link>
				<Nav.Link href="#">Register</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>

</Container>
);

export default App;

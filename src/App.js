import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Toast} from "react-bootstrap";
import Navigation from "./components/Navigation";

const ExampleToast = ({children}) =>
{
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
	<Navigation/>
</Container>
);

export default App;

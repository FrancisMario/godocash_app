import React, { useState, useContext } from 'react';
import { Modal, Loader, Button, ButtonToolbar, Form, FormGroup, FormControl, HelpBlock, ControlLabel, Container } from 'rsuite';
import UserContext from '../context/UserContext';
var axios = require('axios');

const NewEntity = (props) => {

    const user = useContext(UserContext);


    const [show, setShow] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [rows, setRows] = useState(0);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");



    const submit = (e) => {
        var url = user.baseurl+'/api/entity';

        axios.post(url, {
            'name': name,
            'description': description,
            'location': location
        })
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Incorrect username and password");
                }
                alert("Business successfully created.");
                close();
            })
            .catch((err) => {
                console.log(err);
                alert("There was an error, please try again");
            });


    }
    const close = () => {
        setShow(false);
    }
    const resetRows = () => {
        setRows(0);
    }
    const open = (event) => {
        setShow(true);
        setTimeout(() => {
            setRows(80);
        }, 1000);
    }

    const success = () => {
        return (
            <>
            </>
        );
    }

    const form = () => {
        return (
            <>
                <Container>

                    <Form onSubmit={() => submit()} fluid>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl name="amount" required={true} onChange={(change) => setName(change)} type="name" />
                            <HelpBlock tooltip>enter business name</HelpBlock>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Location</ControlLabel>
                            <FormControl name="location" type="location" required={true} onChange={(change) => setLocation(change)} />
                            <HelpBlock tooltip>business location</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl name="description" type="description" required={true} onChange={(change) => setDescription(change)} />
                            <HelpBlock tooltip>enter business description</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">Create Business</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Container>
            </>
        );
    }

    const failed = () => {
        return (
            <>
            </>
        );
    }


    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button onClick={() => open()} appearance="primary">New Business</Button>
            </ButtonToolbar>

            <Modal show={show} onHide={() => close()} onExited={() => resetRows()}>
                <Modal.Header>
                    <Modal.Title>Add a new Business</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {rows ? (
                        form()
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <Loader size="md" />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => close()} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={() => close()} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export { NewEntity };
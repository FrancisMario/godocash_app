import React, { useState, useContext } from 'react';
import { Modal, Loader, Button, ButtonToolbar, Form, FormGroup, FormControl, HelpBlock, ControlLabel, Divider, Container } from 'rsuite';
import UserContext from '../context/UserContext';
var axios = require('axios');

const Register = (props) => {

    const user = useContext(UserContext);


    const [show, setShow] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [rows, setRows] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");



    const submit = (e) => {
        var url = user.baseurl+'/auth/register';

        axios.post(url, {
            'name': name,
            'email': email,
            'phone': phone,
            'password': password
        })
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Incorrect username and password");
                }
                alert("Account Successfully created, you can now  login");
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
                            <HelpBlock tooltip>Enter your name</HelpBlock>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl name="email" type="email" required={true} onChange={(change) => setEmail(change)} />
                            <HelpBlock tooltip>Enter your email</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Phone</ControlLabel>
                            <FormControl name="phone" type="Number" required={true} onChange={(change) => setPhone(change)} />
                            <HelpBlock tooltip>Enter your email</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl name="phone" type="phone" required={true} onChange={(change) => setPassword(change)} />
                            <HelpBlock tooltip>Enter your Password</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">Create Account</Button>
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
                <Button onClick={() => open()} appearance="primary">Create Account</Button>
            </ButtonToolbar>

            <Modal show={show} onHide={() => close()} onExited={() => resetRows()}>
                <Modal.Header>
                    <Modal.Title>Make Transaction</Modal.Title>
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

export { Register };
import React, { useState, useContext } from 'react';
import { Modal, Loader, Button, ButtonToolbar, Form, FormGroup, ControlLabel, Container, Toggle } from 'rsuite';
import Row from 'react-bootstrap/Row';
import UserContext from '../context/UserContext';
var axios = require('axios');

const ProcessPayroll = (props) => {

    const user = useContext(UserContext);
    const [data, setData] = useState(props.data);

    const [show, setShow] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [rows, setRows] = useState(0);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [role, setRole] = useState("");



    const submit = (e) => {
        var url = user.baseurl+'/api/entity/payroll';

        axios.post(url, {})
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

    const form = () => {
        return (
            <>
                <Container>

                    <Form onSubmit={() => submit()} fluid>
                        <FormGroup>
                            <Row>
                             {/* <ControlLabel>Name</ControlLabel> */}
                             <h4> Name 
                             <Toggle defaultChecked />
                             </h4>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">Add New Person to Payrol</Button>
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
                <Button onClick={() => open()} appearance="danger">Process Payroll</Button>
            </ButtonToolbar>

            <Modal show={show} onHide={() => close()} onExited={() => resetRows()}>
                <Modal.Header>
                    <Modal.Title>New Payroll Expense</Modal.Title>
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
                {/* <Modal.Footer>
                    <Button onClick={() => close()} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={() => close()} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
}

export { ProcessPayroll };
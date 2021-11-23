import React, { useState, useContext } from 'react';
import { Modal, Loader, Button, ButtonToolbar, Form, FormGroup, FormControl, HelpBlock, ControlLabel, Container } from 'rsuite';
import UserContext from '../../context/UserContext';
var axios = require('axios');

const EditItem = (props) => {

    const user = useContext(UserContext);


    const [show, setShow] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [rows, setRows] = useState(0);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.00);
    const [units, setUnit] = useState([]);



    const submit = (e) => {
        var url = user.baseurl+'/vendor/inventory/add';

        axios.post(url, {
            'description': description,
            'name': name,
            'price': price,
            'units': units,
        })
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Incorrect username and password");
                }
                alert("Item successfully Added.");
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
                            <ControlLabel>Name</ControlLabel>
                            <FormControl name="name" type="text" required={true} onChange={(change) => setName(change)} />
                            <HelpBlock tooltip>name of person</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Price</ControlLabel>
                            <FormControl name="price" required={true} onChange={(change) => setPrice(change)} type="number" />
                            <HelpBlock tooltip>Item Price</HelpBlock>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl rows={3}  name="description" type="description" required={true} onChange={(change) => setDescription(change)} />
                            <HelpBlock tooltip>Item Description, this will be used to showcase the item to possible clients</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        {/* <FormGroup>
                            <ControlLabel>Units</ControlLabel>
                            <FormControl rows={3}  name="comment" type="comment" required={true} onChange={(change) => setUnit(change)} />
                            <HelpBlock tooltip>Person Role</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup> */}
                        <FormGroup>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">Add Item</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Container>
            </>
        );
    }

    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button onClick={() => open()} appearance="primary">Edit</Button>
            </ButtonToolbar>

            <Modal show={show} onHide={() => close()} onExited={() => resetRows()}>
                <Modal.Header>
                    <Modal.Title>Add new item</Modal.Title>
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
                    {/* <Button onClick={() => close()} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={() => close()} appearance="subtle">
                        Cancel
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export { EditItem };
import React, { useState, useContext } from 'react';
import { Modal, Loader, Button, ButtonToolbar, Form, FormGroup, FormControl, HelpBlock, ControlLabel, Container } from 'rsuite';
import UserContext from '../context/UserContext';
import DatePicker from 'react-date-picker';
var axios = require('axios');


const AddRevenue = (props) => {

    const user = useContext(UserContext);


    const [show, setShow] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [rows, setRows] = useState(0);

    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [date, setDate] = useState(new Date());



    const submit = (e) => {
        var url = user.baseurl+'/api/entity/revenue';

        axios.post(url, {
            'source': source,
            'amount': amount,
            'date': date,
            'index': props.index
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
                            <ControlLabel>Amount</ControlLabel>
                            <FormControl name="amount" required={true} onChange={(change) => setAmount(change)} type="number" />
                            <HelpBlock tooltip>Amount of money</HelpBlock>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Source</ControlLabel>
                            <FormControl name="source" type="text" required={true} onChange={(change) => setSource(change)} />
                            <HelpBlock tooltip>source of the revenue</HelpBlock>
                            <HelpBlock >Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Date</ControlLabel>
                            {/* <FormControl rows={3}  name="comment" type="comment" required={true} onChange={(change) => setComment(change)} /> */}
                            <DatePicker value={date} onChange={(date) => setDate(date)} />
                            <HelpBlock tooltip>date</HelpBlock>
                            <HelpBlock >Required</HelpBlock>x
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">Add Revenue</Button>
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
                <Button onClick={() => open()} appearance="primary">Add Revenue</Button>
            </ButtonToolbar>

            <Modal show={show} onHide={() => close()} onExited={() => resetRows()}>
                <Modal.Header>
                    <Modal.Title>Add Revenue</Modal.Title>
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

export { AddRevenue };
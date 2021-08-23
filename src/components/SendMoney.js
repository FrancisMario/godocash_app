import React, { useState, useContext } from 'react';
import { Modal, Loader, Button, ButtonToolbar, Form, FormGroup, FormControl, HelpBlock, ControlLabel, Divider, Container } from 'rsuite';
import UserContext from '../context/UserContext';

var axios = require('axios');

const SendMoney = (props) => {

    const user = useContext(UserContext);
    console.log(user);

    const [show, setShow] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [rows, setRows] = useState(0);
    const [amount, setAmount] = useState(0);
    const [recipient, setRecipient] = useState(true);
    const [comment, setComment] = useState(true);

    const [action, setAction] = useState(null);

    const Globalbalance = user.data.acc.balance;


    const submit = (e) => {
        // e.preventDefault();
        console.log(recipient);
        console.log(amount);
        var url = user.baseurl+'/api/send';

        axios.post(url, {
            'recipient': recipient,
            'amount': amount,
            'comment': comment
        })
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Incorrect username and password");
                }
                alert("Money was successfully sent");
                close();
            })
            .catch((err) => {
                alert("Error occured, please try again");
                console.log(err);
            });


    }
    const close = () => {
        setAmount(0);
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
        return(
            <Container>
            <div>
                remaining balance
                <h2><span style={{ "color": (Globalbalance - amount) <= 0 ? "rgb(255, 41, 12)" : "rgb(92, 255, 33)" }}>D {Globalbalance - amount}</span></h2>
            </div>
            <Form onSubmit={() => submit()} fluid>
                <FormGroup style={{ textAlign: 'center' }}>
                    <ControlLabel>Amount</ControlLabel>
                    <FormControl name="amount" required={true} onChange={(change) => setAmount(change)} type="Number" />
                    <HelpBlock tooltip>Amount of money to send</HelpBlock>
                    <HelpBlock>Required</HelpBlock>
                </FormGroup>
                <Divider />
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl name="email" type="email" required={true} onChange={(change) => setRecipient(change)} />
                    <HelpBlock tooltip>Reciepient Email Address</HelpBlock>
                    <HelpBlock >Required</HelpBlock>
                </FormGroup>
                {/* <FormGroup>
      <ControlLabel>Password</ControlLabel>
      <FormControl name="password" type="password" />
    </FormGroup> */}
                <FormGroup>
                    <ControlLabel>Comment</ControlLabel>
                    <FormControl rows={4} required={true} name="textarea" onChange={(change) => setComment(change)} componentClass="textarea" />
                </FormGroup>
                <FormGroup>
                    <p style={{ color: "red" }}>
                        {((Globalbalance - amount) < 0) ? "Negative balance" : 
                        ((amount) < 0) ? "You cannot send a Negative amount" :
                        <ButtonToolbar>
                            <Button type="submit" disabled={((Globalbalance - amount) < 0) ? true : false} appearance="primary">Send</Button>
                        </ButtonToolbar>}
                    </p>
                </FormGroup>
            </Form>
        </Container>
    
        );
    }

    const success = () => {
        return(
            <>
            </>
        );
    }

    const failed = () => {
        return(
            <>
            </>
        );
    }

        const value = () => {
            switch (action) {
                case null:
                    return form()
                    break;
                    case true:
                        return success()
                        break;
                        case false:
                            return failed()
                            break;
                        
            
                default:
                    break;
            }
        }

    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button onClick={() => open()}>Make Transaction </Button>
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

export { SendMoney };
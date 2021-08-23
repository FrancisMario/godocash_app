import 'rsuite/dist/styles/rsuite-default.css';
import { Schema, Form, Button, FormGroup, ControlLabel, ButtonToolbar, FormControl, HelpBlock } from 'rsuite';
import { Container } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
var axios = require('axios');

export const Settings = () => {

    const user = useContext(UserContext);

    const [newName, setNewName] = useState(""); 
    const [newEmail, setNewEmail] = useState(""); 
    const [newPhone, setNewPhone] = useState(""); 

    const changeDetails = (e) => {
        // e.preventDefault();
        console.log(e);
        console.log("doing stuff");
        var url = user.baseurl+'/api/as';

        axios.post(url, {
            name: newName != "" ? newName :  user.data.name,
            email: newEmail != "" ? newEmail :  user.data.email,
            phone: newPhone != "" ? newPhone :  user.data.phone
        })
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Incorrect username and password");
                }
                alert("Profile Successfully Updated");
                
            })
            .catch((err) => {
                console.log(err);
                alert("An error occured, please try again.");
            });

    }

    const changePassword = (e) => {
        // e.preventDefault();
        console.log(e);
        console.log("doing stuff");
        var url = user.baseurl+'/api/as';

        axios.post(url, {
            name: newName != "" ? newName :  user.data.name,
            email: newEmail != "" ? newEmail :  user.data.email,
            phone: newPhone != "" ? newPhone :  user.data.phone
        })
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Incorrect username and password");
                }
                alert("Profile Successfully Updated");
                
            })
            .catch((err) => {
                console.log(err);
                alert("An error occured, please try again.");
            });

    }
    return (
        <Container>
            <h2>Account Settings </h2>
            <br />
            <h4>Personal Details</h4>
            <hr />
            <Form onSubmit={(e) => changeDetails(e)}>
                <FormGroup>
                    <FormControl name="name" onChange={(change) => setNewName(change)} placeholder={user.data.name} />
                    <HelpBlock tooltip>This field is required</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <FormControl name="email" onChange={(change) => setNewEmail(change)} placeholder={user.data.email} />
                    <HelpBlock tooltip>This field is required</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <FormControl name="phone" onChange={(change) => setNewPhone(change)} placeholder={user.data.phone} />
                    <HelpBlock tooltip>This field is required</HelpBlock>
                </FormGroup>
                <FormGroup>
                        <ButtonToolbar>
                            <Button type="submit"  appearance="primary">Save Changes</Button>
                        </ButtonToolbar>
                </FormGroup>
                </Form>

                <Form>
                <br />
                <h4>Security</h4>
                <hr />
                <br />
                <h6>Change Password</h6>
                <FormGroup>
                    <FormControl name="password" placeholder="Current Password" />
                    <HelpBlock tooltip>This field is required</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <FormControl name="npassword" placeholder="New Password" />
                    <HelpBlock tooltip>This field is required</HelpBlock>
                </FormGroup>

                <FormGroup>
                    <FormControl name="rpassword" placeholder="Retype New Password" />
                    <HelpBlock tooltip>This field is required</HelpBlock>
                </FormGroup>
                
                <FormGroup>
                        <ButtonToolbar>
                            <Button type="submit"  appearance="primary">Change Password</Button>
                        </ButtonToolbar>
                </FormGroup>
            </Form>
        </Container>

    );
}

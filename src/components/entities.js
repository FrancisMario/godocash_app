import 'rsuite/dist/styles/rsuite-default.css';
import { Col, Row, Panel, Button, ButtonToolbar, FormGroup } from 'rsuite';
import { Container } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

var axios = require('axios');

export const Entity = ({children, title}) => {

    const user = useContext(UserContext);

    const entities = user.entities;

    const Card = ({ id, title, description, balance }) => {
        return (
            <Col xs={24} sm={24} md={8} style={{ "padding-top": "10px", "cursor": "pointer",}} >
                <Panel bordered header={title} onclick={() => alert(`Selected ${title}`)} style={{"background":"#4EFFEF"}}>
                    Revenue
                    <h2>{balance}</h2>
                    <p>
                        {description}
                        <br/>
                        This is the description of the main thing.
                    </p>
                    <FormGroup style={{ "padding-top": "5px",}} >
                        <ButtonToolbar>
                            <Button type="submit" appearance="primary">More Details</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Panel>
            </Col>
        );
    }


    return (
        <Container >
            <h2>{title}</h2>
            <br />
            <hr />
            {/* body */}
            {children}
        </Container>

    );
}

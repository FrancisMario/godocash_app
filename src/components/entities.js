import 'rsuite/dist/styles/rsuite-default.css';
import { Col, Row, Panel, Button, ButtonToolbar, FormGroup } from 'rsuite';
import { Container } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { NewEntity } from '../components/NewEntity';

var axios = require('axios');

export const Entity = () => {

    const user = useContext(UserContext);

    const entities = user.entities;
    const [children, setChildren] = useState([]);

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

    useEffect(() => {
        if (entities) {
            let res = [];
            entities.forEach((value) => {
                res.push(<Card id={value._id} title={value.name} description={value.description} balance={value.balance} />);
            })
            setChildren(res);
        }
        return () => {
            // cleanup
        }
    }, [entities]);

    return (
        <Container >
            <h2>Businesses</h2>
            <br />
            <NewEntity />
            <hr />
            {/* body */}
            <Row className="show-grid">
                {children}
            </Row>
        </Container>

    );
}

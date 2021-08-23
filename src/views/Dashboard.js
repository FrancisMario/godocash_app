import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Container, Row, Col, Panel } from 'rsuite';
import { SendMoney } from "./../components/SendMoney";
import { HistoryTable } from './table'; 
import { axios } from "axios";



export default (props) => {
    
    const user = useContext(UserContext);
    
    const historyTable = user.data.acc.history.map(value => {
        return {
            id:value._id,
            amount:value.amount,
            type:value.type,
            otherid:value.other.id,
            othername:value.other.name,
            date:value.other.date,
            comment:value.other.comment,
        }        
    });
    const balance = user.data.acc.balance;

    const loadData = () => {
        var url = user.baseurl+'/auth/login';

        axios.post(url, {})
            .then((response) => {
                console.log(response);
                if (response.status === 400) {
                    alert("Incorrect username and password");
                }
            })
            .catch((err) => {
                console.log(err);
            });


    }

    return (
        <Container>
            <Row style={{"padding-bottom":"10px"}}>
                <Col md={6} sm={12}>
                    <Panel {...props} shaded={true} bordered header="Account Balance">
                        <h1>D {balance}</h1>
                    </Panel>
                </Col>
                <Col md={6} sm={12}>
                    <Panel {...props} shaded={true} bordered header="Actions">
                        <SendMoney />
                    </Panel>
                </Col>
            </Row>
            <Container>
                <Panel header="History" bordered>
                    <HistoryTable />
                </Panel>
            </Container>

        </Container>
    );
    
}
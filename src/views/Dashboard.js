import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Container, Row, Col, Panel } from 'rsuite';
import { SendMoney } from "./../components/SendMoney";
import { HistoryTable } from './table';
import axios from "axios";



export default (props) => {

    const user = useContext(UserContext);
    const [balance, setBalance] = useState(null);
    const [revenue, setRevenue] = useState(0);
    const [expense, setExpense] = useState(0);

    // get stats
    const getData = () => {
        // loading 
        const url = user.baseurl + "/api/report";
        axios.get(url).then((response) => {
            setBalance(response.data.data.revenue - response.data.data.expense);
            setRevenue(response.data.data.revenue);
            setExpense(response.data.data.expense);
            if (response.data.data.revenueHistory) {
                //    setHistory(response.data.data.revenueHistory.reverse());
            }
        }).catch((err) => {
            //    alert(err);
        });
    }

    useEffect(() => {
        var loop = setInterval(() => {
            //    alert("google.com");
            getData();
        }, 2000);
        return () => {
            clearInterval(loop);
        }
    }, [])


    return (
        <Container>
            <Row style={{ "padding-bottom": "10px" }}>
                <Col md={6} sm={12}>
                    <Panel {...props} shaded={true} bordered header="Net Revenue">
                        {
                            balance === null ? "Loading" :
                        balance <= 0
                        ? <h1 style={{"color":"red"}}>D {balance}</h1> :
                        <h1 style={{"color":"green"}}>D {balance}</h1> 
                        }
                    </Panel>
                </Col>
                <Col md={6} sm={12}>
                    <Panel {...props} shaded={true} bordered header="Actions">
                        {/* <SendMoney /> */}
                    </Panel>
                </Col>
            </Row>
            <Container>
                <Panel header="Current Report Statement" bordered>

                    <h4>Monthly</h4> <h6>Financial Report</h6>
                    <hr />

                    <p>
                        Revenue <span style={{ "float": "right" }}>D {revenue} </span><br/>
                        Expense <span style={{ "float": "right" }}>D {expense} </span><br />
                        {/* Net Gain <span style={{ "float": "right" }}>D 201, 000 </span><br /> */}
                        <hr style={{"height":"5px"}}/>
                        Net Revenue <span style={{ "float": "right" }}>D {balance} </span><br/>
                    </p>
                </Panel>
                <Panel header="Older Reports" bordered>
                    {/* <HistoryTable /> */}
                </Panel>
            </Container>

        </Container>
    );

}
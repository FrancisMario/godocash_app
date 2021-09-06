import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

import { AddPayroll } from './AddPayroll';
import { ProcessPayroll } from './ProcessPayroll';
import { ExpandedTable } from './dataTableReport';


export const Report = (props) => {
    const user = useContext(UserContext);

    const [payrollcost, setPayrollcost] = useState(-1);

    // get stats
    const getData = () => {
        // loading 
        const url = user.baseurl + "/api/entity";
        console.log(url);
        axios.get(url).then((response) => {
            let total = 0;
            response.data.data[props.index].payroll.forEach(value => {
                total += value.amount;
            })
            setPayrollcost(total);
        }).catch((err) => {
            alert(err);
        });
    }

    useEffect(() => {
        var loop = setInterval(() => {
            getData();
        }, 2000);
        return () => {
            clearInterval(loop);
        }
    }, [])

    useEffect(() => {
    }, []);
    const url = user.baseurl + "/api/entity";
    return (
        <>
            <h4>Payrol Cost {props.index}</h4>
            <h2>{payrollcost < 0 ? "Loading" : "D " + payrollcost + ".00"}</h2> <span style={{ "color": "green" }}>{/**Net:**/}</span>
            <hr />
            <div className="row container">
                <div className="col-3">
                    <AddPayroll index={props.index} />
                </div>
                <div className="col-3">
                    <ProcessPayroll index={props.index} />
                </div>
            </div>
            <hr />
            <ExpandedTable url={url} index={props.index} table="payroll" column={[{ title: "Name", key: "name" }, { title: "Role", key: "role" }, { title: "Amount", key: "amount" }, { title: "Contact", key: "phone" }]} />
        </>
    );
}
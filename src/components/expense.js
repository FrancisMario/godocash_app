import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import axios  from 'axios';

import { AddExpense } from './AddExpense';
import { ExpandedTable } from './dataTable';



export const Expense = (props) => {
    const user = useContext(UserContext);

    const [balance, setBalance] = useState(-1);
    const [history, setHistory] = useState([]);


    // get stats
    const getData = () => {
         // loading 
         const url = user.baseurl+"/api/report";
         console.log(url);
         axios.get(url).then((response)=>{
            setBalance(response.data.data.expense);
            setHistory(response.data.data.expenseHistory.reverse());
            // alert(JSON.stringify(response.data.data.revenueHistory));
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
    },[]);
    const url = user.baseurl+"/api/entity";
    return(
        <>
        <h4>Total Expense - September 2021 </h4>
        <h2 style={{"color":"red"}}>{balance < 0 ? "Loading" : "D "+ balance +".00"}</h2> <span style={{"color":"green"}}>{/**Net:**/}</span>
        <hr/>
        <AddExpense/>
        <hr/>
        <ExpandedTable data={history} column={[{title:"Amount", key:"amount"},{title:"Source", key:"source"}, {title:"Date", key:"date"}]} />
        </>
    );
}
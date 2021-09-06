import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import axios  from 'axios';

import { AddRevenue } from './AddRevenue';
import { ExpandedTable } from './dataTable';


export const Revenue = (props) => {
    const user = useContext(UserContext);

    const [balance, setBalance] = useState(-1);
    const [history, setHistory] = useState([]);
    const [expense, setExpense] = useState(0);

    // get stats
    const getData = () => {
         // loading 
         const url = user.baseurl+"/api/entity";
         console.log(url);
         axios.get(url).then((response)=>{
            setBalance(response.data.data[props.index].balance);
            setHistory(response.data.data[props.index].revenue);
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
        <h4>Total Revenue {props.index}</h4>
        <h2>{balance < 0 ? "Loading" : "D "+ balance +".00"}</h2> <span style={{"color":"green"}}>{/**Net:**/}</span>
        <hr/>
        <AddRevenue index={props.index}/>
        <hr/>
        <ExpandedTable url={url} index={props.index} table="revenue" column={[{title:"Amount", key:"amount"},{title:"Source", key:"source"}, {title:"Date", key:"date"}]} />
        </>
    );
}
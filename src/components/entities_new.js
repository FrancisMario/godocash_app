import 'rsuite/dist/styles/rsuite-default.css';
import { Panel, PanelGroup, Nav as ResponsiveNav, Icon,  } from 'rsuite';
import { Container } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { NewEntity } from './NewEntity';
import {Revenue}  from './revenue';
import {Expense}  from './expense';
import {Payroll}  from './payroll';
import {Report}  from './report';

export const Entity = () => {

    const user = useContext(UserContext);

    const entities = user.entities;

    const [children, setChildren] = useState([]);
    const [defaultActiveKey, setdefaultActiveKey] = useState(0);

    
    
    const Card = ({ index, id, title, description, balance, }) => {
        // active tab controllers
        const [statsActive, setStatsActive] = useState(true);
        const [revenueActive, setRevenueActive] = useState(false);
        const [expanseActive, setExpanseActive] = useState(false);
        const [payrollActive, setPayrollActive] = useState(false);
        const [settingsActive, setSettingsActive] = useState(false);

        const toggleActive = (statsActive, revenueActive , expanseActive , payrollActive , settingsActive) => {
            setStatsActive(statsActive);
            setRevenueActive(revenueActive);
            setExpanseActive(expanseActive);
            setPayrollActive(payrollActive);
            setSettingsActive(settingsActive);
        } 

        return (
            <Panel collapsible header={title} shaded eventKey={index}>
                <div>
                    <ResponsiveNav justified appearance="tabs" >
                        <ResponsiveNav.Item active={statsActive} onClick={() => toggleActive(true,false,false,false,false)} icon={<Icon icon="home" />}  >Stats</ResponsiveNav.Item>
                        <ResponsiveNav.Item active={revenueActive}  onClick={() => toggleActive(false,true,false,false,false)}>Revenue</ResponsiveNav.Item>
                        <ResponsiveNav.Item active={expanseActive} onClick={() => toggleActive(false,false,true,false,false)}>Expense</ResponsiveNav.Item>
                        <ResponsiveNav.Item active={payrollActive} onClick={() => toggleActive(false,false,false,true,false)}>Payroll</ResponsiveNav.Item>
                        <ResponsiveNav.Item active={settingsActive} onClick={() => toggleActive(false,false,false,false,true)}>Reports</ResponsiveNav.Item>
                    </ResponsiveNav>
                </div>
                  {statsActive ? <Stats/> : revenueActive ? <Revenue index={index} /> : expanseActive ? <Expense index={index}/> : payrollActive ? <Payroll index={index}/> : settingsActive ? <Report index={index}/> : <Report index={index}/>}
            </Panel>
        );
    }

    useEffect(() => {
        var key = 1;
        if (entities) {
            let res = [];
            entities.forEach((value) => {
                res.push(<Card index={value.index} id={value._id} title={value.name} description={value.description} balance={value.balance} />);
                key++;
            })
            setChildren(res);
        }
        return () => {
            // cleanup
        }
    }, []);

    const Stats = (balance, index, description) => {
        return(
            <>
            Stats
            </>
        );
    }


    return (
        <>
            <h2>Businesses</h2>
            <br />
            <NewEntity />
            <hr />
            {/* body */}
            <PanelGroup accordion defaultActiveKey={1} bordered >
                {children}
            </PanelGroup>
        </>

    );
}

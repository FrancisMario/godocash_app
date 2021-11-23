import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import axios from 'axios';

import { AddInventory } from './addInventory';
import { ExpandedTable } from './../util/tables/dataTable';
import { AddUnit } from './addUnit';
import { EditItem } from './editItem';



export const Inventory = (props) => {
    const user = useContext(UserContext);

    const [inventoryUnits, setInventoryUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    // get stats
    const getData = () => {
        // loading 
        const url = user.baseurl + "/vendor/inventory";
        axios.get(url).then((response) => {
            var data = response.data.map((e) => {
                console.log(e)
                return {
                    _id: e._id,
                    name: e.name.join(" ") + "---",
                    units: e.units.length,
                    price: e.price,
                    edit: <EditItem />,
                    add: <AddUnit id={e._id}/>
                }
            }).reverse();
            setInventoryUnits(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err)
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
    return (
        <>
            <h2>{inventoryUnits.units < 0 ? "Loading" : + inventoryUnits.length} Inventory Items</h2> <span style={{ "color": "green" }}>{/**Net:**/}</span>
            <hr />
            <div className="row container">
                <div className="col-3">
                    <AddInventory index={props.index} />
                </div>
            </div>
            <hr />
            <ExpandedTable
                data={inventoryUnits}
                component={<EditItem />}
                table="Items"
                loading={loading}
                column={
                    [
                        { title: "Item Id", key: "_id" },
                        { title: "Name", key: "name" }, 
                        { title: "Price", key: "price" },
                        { title: "Units", key: "units" },
                        { title: "Edit", key: "edit" },
                        { title: "Add", key: "add" },
                    ]
                } />
        </>
    );
}
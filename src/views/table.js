import { Table, Pagination } from 'rsuite';
import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

 export function HistoryTable() {

    const user = useContext(UserContext);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [displayLength, setDisplayLength] = useState(100 + 1);
    const [sortType, setSortType] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);

    const historyTable = user.data.acc.history.map(value => {
        return {
            id: value._id.substring(value._id.length - 6),
            amount: value.amount,
            type: value.type,
            otherid: value.other.id,
            othername: value.other.name,
            date: value.other.date,
            comment: value.other.comment,
        }
    });


    const handleChangePage = (dataKey) => {
        setPage(dataKey);
    }
    const handleChangeLength = (dataKey) => {
        setPage(1);
        setDisplayLength(dataKey)
    }
    const handleSortColumn = (sortColumn, sortType) => {
        loading(true);
        setTimeout(() => {
              setSortColumn(sortColumn);
              setSortType(sortType);
              setLoading(false);

          }, 500);
    }

    const getData = () => {
        var data =  historyTable.reverse().filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });

        if (sortColumn && sortType) {
            return data.sort((a, b) => {
              let x = a[sortColumn];
              let y = b[sortColumn];
              if (typeof x === 'string') {
                x = x.charCodeAt();
              }
              if (typeof y === 'string') {
                y = y.charCodeAt();
              }
              if (sortType === 'asc') {
                return x - y;
              } else {
                return y - x;
              }
            });
          }
          return data;

    }

    return (
        <div>
            <Table height={420} data={getData()} loading={loading}>
                <Table.Column width={200} align="center" fixed sortable>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell dataKey="amount" />
                </Table.Column>
                <Table.Column width={300} sortable>
                    <Table.HeaderCell>Transaction id</Table.HeaderCell>
                    <Table.Cell dataKey="id" />
                </Table.Column>

                <Table.Column width={250} sortable>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell dataKey="otherid" />
                </Table.Column>

                <Table.Column width={200} sortable>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.Cell dataKey="type" />
                </Table.Column>

                <Table.Column width={200} sortable>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.Cell dataKey="date" />
                </Table.Column>
            </Table>

            <Pagination
                lengthMenu={[
                    {
                        value: 10,
                        label: 10
                    },
                    {
                        value: 20,
                        label: 20
                    }
                ]}
                activePage={page}
                displayLength={displayLength}
                total={historyTable.length}
                onChangePage={() => handleChangePage()}
                onChangeLength={() => handleChangeLength()}
            />
        </div>
    );
}

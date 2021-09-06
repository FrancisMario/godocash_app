import React from 'react';
import { Table, Icon, IconButton } from 'rsuite';
import axios from 'axios';

/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const rowKey = '_id';
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Table.Cell {...props}>
        <IconButton
            size="xs"
            appearance="subtle"
            onClick={() => {
                onChange(rowData);
            }}
            icon={
                <Icon
                    icon={
                        expandedRowKeys.some(key => key === rowData[rowKey])
                            ? 'minus-square-o'
                            : 'plus-square-o'
                    }
                />
            }
        />
    </Table.Cell>
);

class ExpandedTable extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loop: null,
            table: props.table,
            url: props.url,
            index: props.index,
            data: [],
            expandedRowKeys: [],
            column: []
        };
        this.handleExpanded = this.handleExpanded.bind(this);
    }


    loadColumns() {
        var width = 1300 / this.props.column.length;
        this.state.column = this.props.column.map(value => {
            return (
                <Table.Column width={width}>
                    <Table.HeaderCell>{value.title}</Table.HeaderCell>
                    <Table.Cell dataKey={value.key} />
                </Table.Column>
            );
        });
    }

    getData() {
        console.log(this.state.url);
        axios.get(this.state.url).then((response) => {
            this.state.data = response.data.data[this.state.index][this.state.table];
        }).catch((err) => {
            alert(err);
        });
    }


    componentWillUnmount() {
        clearInterval(this.state.loop);
    }
    componentDidMount() {
        this.loadColumns();
        this.state.loop = setInterval(() => {
            this.getData();
        }, 2000)
    }



    handleExpanded(rowData, dataKey) {
        // getting expanded rows list
        const { expandedRowKeys } = this.state;

        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach(key => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });

        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }
        this.setState({
            expandedRowKeys: nextExpandedRowKeys
        });
    }
    render() {
        const { expandedRowKeys, data } = this.state;
        return (
            <Table
                height={400}
                data={data}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                onRowClick={data => {
                    console.log(data);
                }}
                renderRowExpanded={rowData => {
                    return (
                        <div>
                            <div
                                style={{
                                    width: 60,
                                    height: 60,
                                    float: 'left',
                                    marginRight: 10,
                                    background: '#eee'
                                }}
                            >
                                <img src={rowData.avartar} style={{ width: 60 }} />
                            </div>
                            <p>{rowData.email}</p>
                            <p>{rowData.date}</p>
                        </div>
                    );
                }}
            >
                <Table.Column width={70} align="center">
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <ExpandCell
                        dataKey={Math.random() * 1000}
                        expandedRowKeys={expandedRowKeys}
                        onChange={this.handleExpanded}
                    />
                </Table.Column>

                {this.state.column}
            </Table>
        );
    }
}

export { ExpandedTable };
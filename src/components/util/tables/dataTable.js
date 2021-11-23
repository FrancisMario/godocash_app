import React from 'react';
import { Table, Icon, IconButton } from 'rsuite';
import axios from 'axios';

/**
 * import fakeData from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users.json
 */

const rowKey = 'id';
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
            loop:null,
            data: [],
            expandedRowKeys: [],
            column: [],
        };
        this.handleExpanded = this.handleExpanded.bind(this);
    }


    loadColumns() {
        var width = 1000 / this.props.column.length;
        this.state.column = this.props.column.map(value => {
            return (
                <Table.Column style={{"cursor":"pointer"}} width={width} onClick={()=>{

                }}>
                    <Table.HeaderCell>{value.title}</Table.HeaderCell>
                    <Table.Cell dataKey={value.key} />
                </Table.Column>
            );
        });
    }

    // getData() {
    //     axios.get(this.state.url).then((response) => {
    //         this.state.data = response.data.data;
    //     }).catch((err) => {
    //         alert(err);
    //     });
    // }


    // componentWillUnmount() {
    //     clearInterval(this.state.loop);
    // }

    componentDidUpdate(){
        // this.state.data = [];
        this.state.data = this.props.data;
    }
    componentDidMount() {
        this.loadColumns();
        this.state.data = this.props.data;
    }


    handleExpanded(rowData, dataKey) {
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
        <>
            <Table
                loading={this.props.loading}
                height={400}
                data={this.state.data}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                onRowClick={data => {
                    console.log(data);
                    // when row is clicked
                }}
                renderRowExpanded={rowData => {
                    return (
                        <div style={{"padding-left":"30px"}}>
                            <p>{rowData.comment}</p>
                            {/* <p>{rowData.date}</p> */}
                        </div>
                    );
                }}
            >
                <Table.Column width={70} align="center">
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <ExpandCell
                        dataKey="id"
                        expandedRowKeys={expandedRowKeys}
                        onChange={this.handleExpanded}
                    />
                </Table.Column>
                {this.state.column}
            </Table>
            </>
        );
    }
}

export { ExpandedTable };
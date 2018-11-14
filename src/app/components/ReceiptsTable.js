
import React from "react";

class ReceiptsTable extends React.Component {

    createRows() {
        return [this.createHeaderRow()].concat(this.createDataRows());
    }

    createHeaderRow() {
        return (
            <tr key = "header">
                { ["Date", "Store", "Total Kn", "Edit", "Delete"].map( (column, index) => {
                    return (<th key = {"header-" + index}>{column}</th>);
                })}
            </tr>
        );
    }

    createDataRows() {
        return this.props.receipts.map(function(receipt){

            return (
                <tr key = {receipt.id} className = "dataRow">
                    {[
                        receipt.date,
                        receipt.store.name,
                        receipt.total,
                        <button onClick = { () => this.props.selectReceipt(receipt.id) } >Edit</button>,
                        <button onClick = { () => this.props.deleteReceipt(receipt.id) } >Delete</button>
                    ].map((data, index) => {
                        return (<td key = {receipt.id + "-" + index}>{data}</td>);
                    })}
                </tr>
                );
        }, this);
        
    }

    render() {
        return (
        <table className = "cfReceipts cfTable">
            <tbody>
                {this.createRows()}
            </tbody>
        </table>
        );
    }

}

export default ReceiptsTable;
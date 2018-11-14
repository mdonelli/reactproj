
import React from "react";

class ReceiptDetails extends React.Component {

    componentDidMount() {
        this.props.getStores();
    }

    editReceiptDate = (e) => {
        this.props.editReceipt(Object.assign({}, this.props.selectedReceipt, {date: e.target.value}));
    }

    editReceiptStore = (e) => {
        this.props.editReceipt(Object.assign({}, this.props.selectedReceipt, {store: {id: 0, name: e.target.value}}));
    }

    render() {
        return (
            <div className = "centering">
                <div className = "inner">
                    <div>
                        <label htmlFor = "receiptDate">Date</label>
                        <input type = "text" id = "receiptDate" placeholder = "dd-mm-yyyy" value = {this.props.selectedReceipt.date} onChange = {this.editReceiptDate} />
                    </div>
                    <div>
                        <label htmlFor = "receiptStore">Store</label>
                        <input list = "storeList" type = "text" id = "receiptStore" value = {this.props.selectedReceipt.store.name} onChange = {this.editReceiptStore} />
                        <datalist id = "storeList">
                            {this.props.stores.map(function(store) {
                                return <option key = {store.id} value = {store.name} />
                            })}
                        </datalist>
                    </div>
                </div>
            </div>
        );
    }

}

export default ReceiptDetails;
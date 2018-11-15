
import React from "react";
import { UTILS, URLS, ACTIONS } from "..\\common\\Utils";
import { connect } from "react-redux";
import ReceiptDetails from ".\\ReceiptDetails";
import ArticlesTable from ".\\ArticlesTable";
import ReceiptsTable from ".\\ReceiptsTable";
import PagingControl from ".\\PagingControl";
import "..\\style\\style.css";

class ConnectedReceiptsPage extends React.Component {

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.getReceipts(this.props.page, this.props.pageSize);
    }

    saveReceipt = () => {
        let validity = UTILS.validateReceipt(this.props.selectedReceipt);
        if (validity !== true) {
            alert(validity);
        } else {
            UTILS.ajaxCall(URLS.CTRL_RECEIPT + "receipt/" + this.props.selectedReceipt.id, "POST", {action: "save", receipt: this.props.selectedReceipt})
                .then(() => this.loadData()).catch(msg => {console.log("caught");alert(msg);});
        }
    }

    deleteReceipt = (id) => {
        UTILS.ajaxCall(URLS.CTRL_RECEIPT + "receipt/" + id, "POST", {action: "delete"})
            .then(() => this.loadData()).catch(msg => alert(msg));
    }

    backToReceiptList = () => {
        this.props.editReceipt(null);
    }

    goToPage = (page) => {
        this.props.getReceipts(page, this.props.pageSize);
    }

    setPageSize = (size) => {
        this.props.getReceipts(this.props.page, size);
    }

    createChildren() {

        if (this.props.selectedReceipt) {
            return [
                <ReceiptDetails key = "receiptDetails" selectedReceipt = {this.props.selectedReceipt} stores = {this.props.stores}
                    editReceipt = {this.props.editReceipt} getStores = {this.props.getStores} />,
                <ArticlesTable key = "articlesList" selectedReceipt = {this.props.selectedReceipt} editReceipt = {this.props.editReceipt} />,
                <div key = "buttonsDiv" className = "centering">
                    <div className = "inner">
                        <button onClick = {this.props.addArticle}>New Article</button>
                        <button onClick = {this.saveReceipt}>Save Receipt</button>
                        <button onClick = {this.backToReceiptList}>Back</button>
                    </div>
                </div>
            ];
        }

        return [
            <button key = "newReceiptButton" className = "newReceiptButton" onClick = { () => this.props.selectReceipt(null) }>New Receipt</button>,
            <ReceiptsTable key = "receiptList" receipts = {this.props.receipts} selectReceipt = {this.props.selectReceipt} deleteReceipt = {this.deleteReceipt} />,
            <PagingControl key = "paging" page = {this.props.page} pageSize = {this.props.pageSize} pageCount = {this.props.pageCount} goToPage = {this.goToPage}
                setPageSize = {this.setPageSize} />
        ];
        
    }

    render() {
        return(
            <div className = "centering"> 
                <div className = "centered">
                    {this.createChildren()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => { return {
    receipts: state.receipts,
    selectedReceipt: state.selectedReceipt,
    page: state.page,
    pageSize: state.pageSize,
    pageCount: state.pageCount,
    stores: state.stores
};};

const dataLoaded = (data) => ({ type: ACTIONS.DATA_LOADED, payload: data});
const selectReceipt = (id) => ({ type: ACTIONS.SELECT_RECEIPT, payload: id });
const editReceipt = (receipt) => ({ type: ACTIONS.EDIT_RECEIPT, payload: receipt });
const addArticle = () => ({ type: ACTIONS.ADD_ARTICLE });
const storesLoaded = (data) => ({ type: ACTIONS.STORES_LOADED, payload: data });

const mapDispatchToProps = dispatch => {
    return {
        getReceipts: (page, pageSize) => UTILS.ajaxCall(URLS.CTRL_RECEIPT + "receipts?page=" + page + "&pageSize=" + pageSize, "GET").then(data => dispatch(dataLoaded(data))).catch(msg => alert(msg)),
        selectReceipt: (id) => dispatch(selectReceipt(id)),
        editReceipt: (receipt) => dispatch(editReceipt(receipt)),
        addArticle: () => dispatch(addArticle()),
        getStores: () => UTILS.ajaxCall(URLS.CTRL_RECEIPT + "stores", "GET").then(data => dispatch(storesLoaded(data))).catch((msg => alert(msg)))
    };
};

const ReceiptsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedReceiptsPage);

export default ReceiptsPage;

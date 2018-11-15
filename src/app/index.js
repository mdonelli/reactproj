
import { ACTIONS } from ".\\common\\Utils";
import { createStore } from "redux";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import ReceiptsPage from ".\\components\\ReceiptsPage";

console.log("We hardly working!");

const initialState = {
    receipts: [],
    selectedReceipt: null,
    page: 1,
    pageSize: 5,
    pageCount: 1,
    stores: []
};

const createNewReceipt = function () {
    return { id: null, date: "",store: {name: "", id: 0}, articles: [createNewArticle()]};
};

let idGenerated = 0;

const createNewArticle = function () {
    return {id: --idGenerated, name: "", volume: 0, price: 0.00};
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.DATA_LOADED:
            return Object.assign({}, state,
                {
                    receipts: action.payload.receipts,
                    selectedReceipt: null,
                    page: action.payload.page,
                    pageSize: action.payload.pageSize,
                    pageCount: action.payload.pageCount
                });
        case ACTIONS.SELECT_RECEIPT:
            return Object.assign({}, state, {selectedReceipt: action.payload == null ?
                    createNewReceipt() : state.receipts.find(function (receipt) {return receipt.id == action.payload;})});
        case ACTIONS.EDIT_RECEIPT:
            return Object.assign({}, state, {selectedReceipt: action.payload});
        case ACTIONS.ADD_ARTICLE:
            let newSelected = Object.assign({}, state.selectedReceipt);
            newSelected.articles = newSelected.articles.concat([createNewArticle()]);
            return Object.assign({}, state, {selectedReceipt: newSelected});
        case ACTIONS.STORES_LOADED:
            return Object.assign({}, state, {stores: action.payload});
        default:
            return state;
    }
};

let store = createStore(rootReducer);

render(
    <Provider store = {store}>
        <ReceiptsPage />
    </Provider>,
    document.getElementById("reactDiv")
    );


import React from "react";

class ArticlesTable extends React.Component {

    editArticleName = (id, value) => {
        let newReceipt = Object.assign({},this.props.selectedReceipt);
        newReceipt.articles.find(function(article) {return article.id == id;})["name"] = value;
        this.props.editReceipt(newReceipt);
    }

    editArticleVolume = (id, value) => {
        let newReceipt = Object.assign({},this.props.selectedReceipt);
        newReceipt.articles.find(function(article) {return article.id == id;})["volume"] = value;
        this.props.editReceipt(newReceipt);
    }

    editArticlePrice = (id, value) => {
        let newReceipt = Object.assign({},this.props.selectedReceipt);
        newReceipt.articles.find(function(article) {return article.id == id;})["price"] = value;
        this.props.editReceipt(newReceipt);
    }

    deleteArticle = (id) => {
        let newReceipt = Object.assign({},this.props.selectedReceipt);
        newReceipt.articles.splice(newReceipt.articles.findIndex(function(article) {return article.id == id; }), 1);
        this.props.editReceipt(newReceipt);
    }

    createRows() {
        return [this.createHeaderRow()].concat(this.createDataRows());
    }

    createHeaderRow() {
        return (
            <tr key = "header">
                {["Name", "Volume", "Price", "Delete Article"].map(function (column, index) {
                    return (
                        <th key = {"header-" + index}>
                            {column}
                        </th>
                    );
                })}
            </tr>
        )
    }

    createDataRows() {
        return this.props.selectedReceipt.articles.map(function(article){
            return (
                <tr key = {article.id}>
                    <td><input type = "text" value = {article.name} onChange = { (e) => this.editArticleName(article.id, e.target.value) } /></td>
                    <td><input type = "number" value = {article.volume} onChange = { (e) => this.editArticleVolume(article.id, e.target.value) } /></td>
                    <td><input type = "number" value = {article.price} onChange = { (e) => this.editArticlePrice(article.id, e.target.value) } /></td>
                    <td><button onClick = { () => this.deleteArticle(article.id) } disabled = {this.props.selectedReceipt.articles.length <= 1}>Delete</button></td>
                </tr>
            );
        }, this);
    }

    render() {
        return (
            <table className = "cfArticles cfTable">
                <tbody>
                    {this.createRows()}
                </tbody>
            </table> 
        );
    }

}

export default ArticlesTable;
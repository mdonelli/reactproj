
import React from "react";

class PagingControl extends React.Component {

    previousPage = () => {
        this.props.goToPage(this.props.page -1);
    }

    nextPage = () => {
        this.props.goToPage(this.props.page +1);
    }

    changePageSize = (e) => {
        this.props.setPageSize(e.target.value);
    }

    render() {
        return  (
            <div className = "centering">
                <div className = "inner">
                    <div>
                        <button disabled = {this.props.page <= 1} onClick = {this.previousPage}>{"<"}</button>
                        <label>{this.props.page + " / " + this.props.pageCount}</label>
                        <button disabled = {this.props.page >= this.props.pageCount} onClick = {this.nextPage}>{">"}</button>
                    </div>
                    <div>
                        <label htmlFor = "pageSize">Results per page</label>
                        <select id = "pageSize" value = {this.props.pageSize} onChange = {this.changePageSize}>
                            <option value = {5}>5</option>
                            <option value = {10}>10</option>
                            <option value = {20}>20</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

}

export default PagingControl;

export const ACTIONS = {
    DATA_LOADED: "DATA_LOADED",
    SELECT_RECEIPT: "SELECT_RECEIPT",
    EDIT_RECEIPT: "EDIT_RECEIPT",
    ADD_ARTICLE: "ADD_ARTICLE",
    STORES_LOADED: "STORES_LOADED"
};

export const URLS = {
    CTRL_RECEIPT: "http://127.0.0.1:8000/"
};

export const UTILS = {

    ajaxCall: function(url, method, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => { 
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(xhr.responseText);
                }
            };
            xhr.onerror = () => reject(xhr.responseText);
            if (data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }

        });
    },

    validateReceipt(receipt) {
        let pattern = new RegExp("^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$");
        if (!pattern.test(receipt.date)) {
            return "Date is invalid";
        }

        let storeValidity = UTILS.validateStore(receipt.store);
        if (storeValidity !== true) {
            return storeValidity;
        }

        let articlesValidity = UTILS.validateReceiptArticles(receipt);
        if (articlesValidity !== true) {
            return articlesValidity;
        }

        return true;
    },

    validateStore(store) {
        return (store == null || store.name == null || store.name == "") ? "Store Name is invalid" : true;
    },

    validateReceiptArticles(receipt) {
        if (receipt.articles.length == 0) {
            return "Receipt must have at least one Article";
        }
        for (let article of receipt.articles) {
            let validity = UTILS.validateArticle(article);
            if (validity !== true) {
                return validity;
            }
        }
        return true;
    },

    validateArticle(article) {
        if (article.name == null || article.name == "") {
            return "An Article Name is invalid";
        }
        if (article.volume == null || article.volume == "" || isNaN(article.volume)) {
            return "An Article Volume is invalid";
        }
        if (article.price == null || article.price == "" || isNaN(article.price)) {
            return "An Article Price is invalid";
        }
        return true;
    }

};
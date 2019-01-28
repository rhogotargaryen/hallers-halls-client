export default function editItemAction(itemInfo) {
    return dispatch => {
        dispatch({type: "SENDING_ITEM"}, itemInfo);
        return fetch(`https://hallers-halls-api.herokuapp.com//api/items/${itemInfo.id}`, { method: 'PATCH', 
            headers: {'Content-Type': 'application/json', Authorization: itemInfo.auth},
            body: JSON.stringify({item: {...itemInfo}})})
            .then(resp => {return resp.json()})
            .then(item => {if (item.errors) {
                return dispatch({type: "FAILED_ITEM", messages: item.errors})
            } else {
                return dispatch({type: "SUCCESS_ITEM", item, messages: ["saved!"]})
            }})
        .catch( err => {return dispatch({type: "FAILED_ITEM", messages: ["failed GENERIC editItem Action"]})})
    }
}

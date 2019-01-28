export default function fetchItem(auth) {
    return dispatch => {
       dispatch({ type: "LOADING_ITEM"});
           return fetch(`https://hallers-halls.herokuapp.com/api/items/${auth.itemId}`, { headers: { Authorization: auth.auth}})
               .then(resp =>  resp.json())
               .then(item => {
                   dispatch({type: "SUCCESS_ITEM", item, messages: ["loaded item succesfully, ready for edit"]})})
            .catch(err => {return dispatch({type: "FAILED_ITEM", messages: ["failed GENERIC fetchItem action"]})})
       }
   }
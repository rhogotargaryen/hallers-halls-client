export default function fetchItems(auth) {
    return dispatch => {
       dispatch({ type: "LOADING_GET_ITEMS"});
           return fetch("https://hallers-halls-api.herokuapp.com/api/items", { headers: { Authorization: auth}})
               .then(resp =>  resp.json())
               .then(items => {
                   return dispatch({type: "ADD_ITEMS", items, messages: ["success!"]})})
            .catch(err => console.log(err))
       }
   }
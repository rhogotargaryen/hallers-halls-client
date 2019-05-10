export default function postUserAction(user) {
    let temp_auth = null
    return dispatch => {
        dispatch({type: "SENDING_USER"}, user);
        return fetch(`${window.location.origin.replace('3000', '3001')}/signup`, { method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: {...user}})})
            .then(resp => {temp_auth = resp.headers.get('authorization'); return resp.json()})
            .then(userData => {return temp_auth === null ? dispatch({type: "FAILED_USER",  messages: userData.errors}) : dispatch({type: "USER_AUTHED", user: userData, auth: temp_auth})}
        ).catch( err => {console.log(err); return dispatch({type: "FAILED_USER", messages: ["failed GERNERIC post user action"]})})
    }
}

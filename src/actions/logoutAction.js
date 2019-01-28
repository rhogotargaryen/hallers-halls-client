export default function logoutAction(auth) {
    return dispatch => {
        dispatch({type: "LOGOUT_USER"}, auth);
        return fetch('https://hallers-halls.herokuapp.com/logout', {method: 'delete',
        headers: { Authorization: auth}})
        .then(resp => dispatch({type: 'LOGGED_OUT'}))
    }
}
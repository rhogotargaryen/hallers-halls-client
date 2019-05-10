export default function logoutAction(auth) {
    return dispatch => {
        dispatch({type: "LOGOUT_USER"}, auth);
        return fetch(`${window.location.origin.replace('3000', '3001')}/logout`, {method: 'delete',
        headers: { Authorization: auth}})
        .then(resp => dispatch({type: 'LOGGED_OUT'}))
    }
}
import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = ( token, userID ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userID: userID
    };
}

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const auth = ( email, password, isSignup ) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1Ym0Sy6Un5zsMNdb8Jpre_WJcQwrdpIg';

        if ( !isSignup ) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB1Ym0Sy6Un5zsMNdb8Jpre_WJcQwrdpIg';
        }

        axios.post( url, authData )
        .then(response => {
            console.log( response );
            dispatch( authSuccess( response.data.idToken, response.data.localId ) );
        })
        .catch(err => {
            console.log( "PIST", err );
            dispatch( authFail( err ) );
        });
    };
}
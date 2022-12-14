import { logoutFirebase, registerUserWithEmailAndPassword, signInUserWithEmailAndPassword, SignInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, logout, login } from '.';


export const checkingAutentication = ({email, password}) => {
    return async(dispatch, getState) => {
        try {
            dispatch(checkingCredentials());

        } catch (error) {
            
        }
    }
} 

export const startGoogleSignIn = () => {
    return async(dispatch, getState) => {
        try {
            dispatch(checkingCredentials());
            const result = await SignInWithGoogle();
            
            if(!result.ok) return dispatch(logout(result.errorMessage));

            dispatch(login(result));
            

        } catch (error) {
            throw new Error('No se puede loguear usuario con google');
            
        }
    }
} 

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch, getState) => {
        try {
            
            dispatch(checkingCredentials() );
            const resp = await registerUserWithEmailAndPassword({ email, password, displayName });
            
            if(!resp.ok) return dispatch(logout(resp.errorMessage));
            
            dispatch(login(resp));



        } catch (error) {
            throw new Error('No se puede crear usuario')

        }
    }
} 

export const startSingInWithEmailPassword = ({email, password}) => {
    return async(dispatch, getState) => {
        try {
            
            dispatch(checkingCredentials() );
            const resp = await signInUserWithEmailAndPassword({ email, password });
            
            if(!resp.ok) return dispatch(logout(resp.errorMessage));
            
            dispatch(login(resp));



        } catch (error) {
            throw new Error('No se puede loguear el usuario')

        }
    }
} 


export const startLogout = () => {
    return async(dispatch, getState) => {
        try {
            
            await logoutFirebase();
            dispatch(logout());


        } catch (error) {
            throw new Error('No se puede desloguear el usuario')
        }
    }
}
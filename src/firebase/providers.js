import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile  } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider =  new GoogleAuthProvider();

export const SignInWithGoogle = async() => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const {displayName, email, photoUrl, uid}  = result.user

        return {
            ok: true,

            displayName, email, photoUrl, uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = "No se pudo iniciar sesión con Google";
       
        return {
            ok: false,

            errorMessage,
        }
    }

}


export const registerUserWithEmailAndPassword  = async({email, password, displayName}) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
       
        const {uid, photoUrl} = resp.user;
       
        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,

            displayName, email, photoUrl, uid
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = "No se pudo crear la cuenta";
       
        return {
            ok: false,

            errorMessage,
        }
    }
}
export const signInUserWithEmailAndPassword  = async({email, password}) => {
    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const {uid, photoUrl, displayName} = resp.user;

        return {
            ok: true,

            displayName, email, photoUrl, uid
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = "email o contraseña incorrecta ";
       
        return {
            ok: false,

            errorMessage,
        }
    }
}
import { Button } from '@mui/material'
import React from 'react'
import firebase from "firebase/compat/app";
import { auth } from "../firebase"

function SignIn() {
    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);

    }
    return (
        <div>
            <Button variant="contained" onClick={signInWithGoogle} style={{ marginLeft: "20%", marginTop: "20%", fontSize: "50px" }}>Googleアカウントでログインする</Button>
        </div>
    );

}

export default SignIn

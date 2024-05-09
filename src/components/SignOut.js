import { Button } from '@mui/material'
import { auth } from "../firebase.js"
import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import AtmIcon from '@mui/icons-material/Atm';
import BuildIcon from '@mui/icons-material/Build';

function SignOut() {
    return (
        <div className="header">
            <Button style={{ color: "white", fontSize: "30px" }} onClick={() => auth.signOut()}>
                SignOut
            </Button>
            <h3 style={{ fontSize: "30px" }}>{auth.currentUser.displayName}</h3>
            <AtmIcon style={{ fontSize: "100px" }} />
            <BuildIcon style={{ fontSize: "50px" }} />

        </div>
    )
}

export default SignOut

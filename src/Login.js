import React from 'react';
import { Button } from "@material-ui/core";
import { provider, auth } from "./firebase";
import './Login.css';


function Login() {

  const signIn = () => {
      auth.signInWithPopup(provider).catch(err => alert(err.message));
  }

  return (
    <div className='login'>
        <div className='login__logo'>
            <img src='https://www.macworld.co.uk/cmsdata/features/3654385/messages_ios_9_icon_800home_thumb1200_16-9.jpg' alt='' />
            <h1>i-Message Clone</h1>
        </div>
        <Button onClick={signIn}>Sign in</Button>
    </div> 
  )
}

export default Login

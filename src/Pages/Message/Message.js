import React from 'react'
import  { Navigate } from 'react-router-dom'
import {useProfile} from "../../Hooks/useProfile.js"


const Message = () => {

    const {signIn, setSignIn} = useProfile();
    
    if (!signIn){
        // console.log("signIn", signIn)
        alert("you need to log in")
        return <Navigate to='/home'  />
    }
    return (
        <>
        <h1>Message</h1>

        </>
    );
  };
  
  export  {Message};
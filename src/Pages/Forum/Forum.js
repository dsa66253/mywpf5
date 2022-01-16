import React, {useEffect} from 'react'
import  { Navigate } from 'react-router-dom'
import {useProfile} from "../../Hooks/useProfile.js"
import {InputForm} from "./InputForm.js"
import {Posts} from "./Posts.js"
import {message, BackTop}from "antd"


const Forum = () => {
    const {signIn, setSignIn} = useProfile();
    

    if (!signIn){
        // console.log("signIn", signIn)
        message.error('You need to login first');
        return <Navigate to='/home'  />
    }

    return (
        <>
        <InputForm/>
        <Posts/>
        <BackTop />
        </>

        
    );
  };
  
  export  {Forum};
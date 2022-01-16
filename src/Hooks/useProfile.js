import { createContext, useContext, useState } from "react";


const ProfileConstext = createContext({
    //global state
    username: "",
    signIn:false,
    admin:true,
  
    //global method
    setUsername: () => {},
    setSignIn:()=>{},
    setAdmin:()=>{},
  
  });

const ProfileProvider = (props) => {
    const [username, setUsername] = useState("");
    const [signIn, setSignIn] = useState(false);
    const [admin, setAdmin] = useState(false);

    return(
        <ProfileConstext.Provider
        value={{
            username,
            signIn, 
            admin,
            setAdmin,
            setSignIn,
            setUsername
        }}
        {...props}
        />
    )

}

function useProfile() {
    return useContext(ProfileConstext);
}
  
  export { ProfileProvider, useProfile };
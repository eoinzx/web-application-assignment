//imports
import React from "react";
import UserContext from "./userContext.js";
import { useStorageState } from '../hooks/useStorageState.ts';
import axios from 'axios';

//runs the user context
const UserContextProvider = ({children}) => {
    //sets store data
    const [[isLoading, session ], setSession] = useStorageState('session');
    const [[ isIdLoad, id ], setId] = useStorageState('id');
    const [[ isEmailLoad, email ], setEmail] = useStorageState('email');
    const [[ isJobLoad, job ], setJob] = useStorageState('job');

    //returns the data and nessary functions
    return(
        <UserContext.Provider value={{
            signIn: (data) => {
                toHome(setSession, setId, data, setEmail, setJob);
            },
            signOut: () => {
                setSession(null);
                window.location.href = '/';
            },
            session,
            isLoading,
            isIdLoad,
            id,
            isEmailLoad,
            email,
            isJobLoad,
            job
            }}>
            {children}
        </UserContext.Provider>
    )
}

//signs the user in an brings them to the home page
async function toHome(setSession: (value: string | null) => void, setId: (value: string | null) => void, tokId: { _id: string, token: string, email: string, job_id: string }, setEmail: (value: string | null) => void, setJob: (value: string | null) => void)
{
    setId(tokId._id)
    setEmail(tokId.email)
    setSession(tokId.token)
    axios.get(`http://localhost:3020/jobs/${tokId.job_id}`)
    .then(response => {
        setJob(response.data.titl);
    })
    .catch(e => {
        console.log(e);
    });

    setTimeout(function()
    {
        window.location.href = '/home';
    }, 1000);    
}

//exports context provider
export default UserContextProvider;
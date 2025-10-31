//imports
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useState, useContext } from "react";

//the login form
export default function LoginForm()
{
    //sets up variables
    const [form, setForm] = useState(
    {
        email: "",
        password: ""
    })

    const [error, setError] = useState("");
    const {signIn} = useContext(UserContext);

    //changes the data in the form
    const handleChange = (e) =>//: any) =>
    {
        setForm(prevState => 
        ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    //signs the user in
    const handlePress = () =>
    {
        axios.post('http://localhost:3020/users/login', 
        {
            email: form.email,
            password: form.password
        })
        .then(response =>
        {
            signIn(response.data);
        })
        .catch(e =>
        {
            setError(e.response.data.message);
        })
    }

    //the login form
    return(
        <UserContextProvider>
            <div className="align-items-center text-center my-3">
                <h1 className="align-items-center text-center m-3">
                    Dockyard
                </h1>
            </div>

            <div className="align-items-center text-center my-3">
                <h2 className="align-items-center text-center my-3">Email</h2>
                <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Email" value={form.email} onChange={handleChange} id='email'></input>

                <h2 className="align-items-center text-center my-3">Password</h2>
                <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Password" value={form.password} onChange={handleChange} id='password'></input>

                <h3 className='align-items-center text-center my-3 redText'>{error}</h3>

                <div className='align-items-center text-center'>
                    <div className="align-items-center text-center flex-fill butHov p-0 ms-1 my-4">
                        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark maxLen" data-toggle="tooltip" title="Sign in" onClick={handlePress}>
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>                              
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-i me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>

                                <p className='my-0 d-none d-md-block'>
                                    Login
                                </p>
                            </div>
                        </button>
                    </div>  
                

                    <div className="align-items-center text-center flex-fill butHov p-0 ms-1 my-4">
                        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark maxLen" data-toggle="tooltip" title="Go back to start">
                            <a href="http://localhost:3000/">
                                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-l me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                                </svg>

                                    <p className='my-0 d-none d-md-block'>
                                        Back
                                    </p>
                                </div>
                            </a>
                        </button>
                    </div>  
                </div>  
            </div>
        </UserContextProvider>
    )
}
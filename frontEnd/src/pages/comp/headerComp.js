//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import UserContext from "../../contexts/userContext.js";
import { useContext } from "react";

//the header function
export default function Top()
{
    //sets up the abiliy to sign out
    const {email, signOut} = useContext(UserContext);

    const handlePress = () =>
    {  
        signOut();
    }

    //the header
    return(
    <UserContextProvider>
        <nav className="row align-items-center text-center m-2">
            <div className="col-0 col-lg-3 d-flex flex-row">
                <h4 className='align-items-center text-center my-3 d-none d-xl-block pe-1'>Greetings</h4>
                <h4 className='align-items-center text-center my-3 d-none d-lg-block ps-1'>{email}</h4>
            </div>

            <div className="col-8 col-lg-6">
                <h1 className='align-items-center text-center'>Dockyard</h1>
            </div>  

            <div className="col-4 col-lg-3">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Logout and return to start page" onClick={handlePress}>
                    <a href="/">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-l me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Logout
                            </p>
                        </div>
                    </a>
                </button>
            </div>  
            </div>
        </nav>
    </UserContextProvider>
    )
}
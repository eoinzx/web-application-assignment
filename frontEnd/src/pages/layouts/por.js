//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import boatItem from '../comp/boatComp.js';
import { useContext, useState, useEffect } from "react";

//the home pages
export default function PorPage()
{
    //sets up variables
    const [boats, setBoats] = useState([]);
    const { job } = useContext(UserContext);
    var editable = false;

    if (job === "admin")
    {
        editable = true
    }

    //grabs the users from the database
    useEffect(() => {
    axios.get('http://localhost:3020/boats')
         .then(response => {
            setBoats(response.data.value);
         })
         .catch(e => {
          console.log(e);
         });

    }, []);

    if (editable)
    {
    //the home page
    return(
        <UserContextProvider>
            <div className="align-items-center text-center row">
                <div className='align-items-center text-center my-3'>
                    <div className="align-items-center text-center flex-fill butHov p-0 mx-5">
                        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Edit your account details">
                            <a href="../portCreate">
                                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>

                                    <p className='my-0 d-none d-md-block'>
                                        Create
                                    </p>
                                </div>
                            </a>
                        </button>
                    </div> 
                </div>

                <div className='overflow-scroll'>
                  <ul className='row align-items-center text-center'>
                  {
                    boats.map((boat, index) => <li className='col-sm-12 col-md-4 align-items-center text-center my-3' key={index}>{boatItem(boat)}</li>)
                  }
                  </ul>
                </div>
            </div>
        </UserContextProvider>
    )}
    else
    {
    //the home page
    return(
        <UserContextProvider>
            <div className='overflow-scroll'>
                <ul className='row align-items-center text-center'>
                {
                    boats.map((boat, index) => <li className='col-sm-12 col-md-4 align-items-center text-center my-3' key={index}>{boatItem(boat)}</li>)
                }
                </ul>
            </div>
        </UserContextProvider>
    )
    }
}

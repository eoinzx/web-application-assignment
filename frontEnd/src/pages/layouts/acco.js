//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import img from '../../hooks/userPlaceholder.png';
import useAPI from '../../hooks/useAPI.tsx'
import { useEffect, useState, useContext } from 'react';

//account pages function
export default function UseLayout() {
  //sets up variables
  const { loading, error } = useAPI();
  const [user, setUser] = useState([]);
  const { session, id, signOut } = useContext(UserContext);
  const [errors, setError] = useState("");

  //grabs user from database
  useEffect(() => {
    if (id !== null && (user[0] === null || user[0] === undefined))
    {
      axios.get(`http://localhost:3020/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        setUser(response.data)
      })
      .catch(e => {
        console.log(e);
        setError(e);
      });
    }
  });

  function warn() 
  {
    if (window.confirm("Are you sure you want to DELETE your account")) 
    {
      destroy()
    } 
  }

  //deletes the users account
  function destroy()
  {
    axios.delete(`http://localhost:3020/users/${id}`, {
    headers: {
        Authorization: `Bearer ${session}`
    }})
    .then()
    setTimeout(function()
    {
      signOut();
    }, 2000);    
  }

  //checks for user
  if (user == null || loading)
  {
    return (
      <div className="align-items-center text-center">
        <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
        <div className='align-items-center text-center'>
          <div className="spinner-border" role="status"/>
        </div>
      </div>
    )
  }
  
  //sets up image
  let image;

  if (user.image_path && user.image_path !== null && user.image_path !== undefined)
  {
    image = user.image_path;
  }
  else
  {
    image = img
  }

    if (image.charAt(44) === "u" && image.charAt(45) === "n" && image.charAt(46) === "d" && image.charAt(47) === "e")
    {
      image = img
    }

  //displays the users account
  return (
    <UserContextProvider>    
      <div className="align-items-center text-center">       
        <div className="align-items-center text-center">
          <div className="card-body align-items-center text-center">
            <img className='rounded-5 border border-4 border-dark bigImg' src={image} alt="This users account"/>
            <h4 className='align-items-center text-center my-3'>{user.username}</h4>
            <p className='align-items-center text-center notHov'>{user.email}</p>
            <p className='align-items-center text-center notHov'>{user.phone}</p>

            <h3 className='align-items-center text-center my-3 redText'>{error}</h3>
            <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>

          <div className="align-items-center text-center d-flex flex-row">
            <div className="align-items-center text-center col-sm-12 col-md-3"/>
            <div className="align-items-center text-center flex-fill butHov p-0 ms-1 col-sm-12 col-md-3">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Edit your account details">
                <a href={`../accoEdit/${id}`}>
                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>

                    <p className='my-0 d-none d-md-block'>
                      Edit
                    </p>
                  </div>
                </a>
              </button>
            </div> 

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1 col-sm-12 col-md-3">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Delete your account" onClick={warn}>
                  <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-0-circle-fill me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>

                    <p className='my-0 d-none d-md-block'>
                      Delete
                    </p>
                  </div>
              </button>
            </div> 
            <div className="align-items-center text-center col-sm-12 col-md-3"/>
          </div>
          </div>     
      </div>    
    </div>
    </UserContextProvider>    
  );
}
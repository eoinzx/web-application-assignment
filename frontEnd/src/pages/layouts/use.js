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
  const { postRequest, putRequest, loading, error } = useAPI();
  const [user, setUser] = useState([]);
  const { session, id } = useContext(UserContext);
  const [errors, setError] = useState("");

  //gets the users id from the url
  var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  
  //grabs user from database
  useEffect(() => {
    if (_id !== null && id !== null && (user[0] === null || user[0] === undefined))
    {
      let users = []
      axios.get(`http://localhost:3020/users/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        users[0] = response.data
      })
      .catch(e => {
        console.log(e);
      });

      axios.get(`http://localhost:3020/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        users[1] = response.data
        setUser(users)
      })
      .catch(e => {
        console.log(e);
      });
    }
  });

  //checks for user
  if (user[0] == null || loading)
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

  if (user[0].image_path && user[0].image_path !== null && user[0].image_path !== undefined)
  {
    image = user[0].image_path;
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
        <div className="col-sm-12 col-md-4 align-items-center text-center">
          <div className="card-body align-items-center text-center">
            <img className='rounded-5 border border-4 border-dark bigImg' src={image} alt="This users account"/>
            <h4 className='align-items-center text-center my-3'>{user[0].username}</h4>
            <p className='align-items-center text-center notHov'>{user[0].email}</p>
            <p className='align-items-center text-center notHov'>{user[0].phone}</p>

            <h3 className='align-items-center text-center my-3 redText'>{error}</h3>
            <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>
          </div>     
      </div>    
    </div>
    </UserContextProvider>    
  );
}
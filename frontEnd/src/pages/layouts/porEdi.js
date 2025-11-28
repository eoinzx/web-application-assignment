//imports
import useAPI from '../../hooks/useAPI.tsx'
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useEffect, useState, useContext } from 'react';

//the account edit page
export default function PortEditLayout() {
    //sets up the variables
    const { session, job } = useContext(UserContext); 
    const [jobb, setJob] = useState(null);
    var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    //sets up form data
    const [form, setForm] = useState({
        name: "",
        captainName: "",
        company: "",
        arrival: "",
        departure: "",
        file: null
    });

    //grabs the users acount data
    useEffect(() => 
    { 
        if (_id != null)
        {
            axios.get(`http://localhost:3020/boats/${_id}`, {
            headers: 
            {
                Authorization: `Bearer ${session}`
            }
            })
            .then(response => {
                setJob(response.data);
             })
             .catch(e => {
                console.log(e);
             });
        }
    
    });

    //sets up editing functions
    const { putRequest, loading, error } = useAPI();

    //changes the form
    const handleChange = (e) => {
        if (e.target.id !== "file")
        {
            setForm(prevState => ({
                ...prevState,
                [e.target.id]: e.target.value
            }));
        }
        else
        {
            setForm(prevState => ({
                ...prevState,
                [e.target.id]: e.target.files[0]
            }));
        }
    }

    //updates the boats account
    const handleSubmit = () => {
        if (job === "admin")
        {
            putRequest(`http://localhost:3020/boats/${_id}`, form, {
                headers: {
                    "Content_type":"Mulipart/form-data",
                    Authorization: `Bearer ${session}`
                }
            });

            if (error === null)
            {
                setTimeout(function()
                {
                    window.location.href = `/boats/${_id}`;
                }, 1500); 
            }
        }
    }

    //warns the jobb that the are phone to change their accounts details
    function warn() 
    {
        if (window.confirm("Are you sure you want to edit this job?")) 
        {
            handleSubmit()
        } 
    }

        //assigns form data with jobb data
    if (jobb)
    {
        if (!jobb.image_path || jobb.image_path == null || jobb.image_path === undefined)
        {
            form.file = null
        }

        if (form.name === "" || form.name == null || form.name === undefined)
        {
            form.name = jobb.name
        }

        if (form.captainName === "" || form.captainName == null || form.captainName === undefined)
        {
            form.captainName = jobb.captainName
        }

        if (form.company === "" || form.company == null || form.company === undefined)
        {
            form.company = jobb.company
        }

        if (form.arrival === "" || form.arrival == null || form.arrival === undefined)
        {
            form.arrival = jobb.arrival
        }

        if (form.departure === "" || form.departure == null || form.departure === undefined)
        {
            form.departure = jobb.departure
        }
    }

    //displays the page
    if(loading === true) 
    { 
        return (
            <UserContextProvider>
            <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
            <div className='align-items-center text-center'>
                <div className="spinner-border" role="status"/>
            </div>
            </UserContextProvider>
        );
    }

    if (job === "admin")
    {
    return(
        <UserContextProvider>
        <form className="align-items-center text-center my-3" encType="multipart/form">
            <div className='container'>
            <h6 className='align-items-center text-center mb-1'>Boat's Name</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Boat's Name" value={form.name} onChange={handleChange} id='name'/>

            <h6 className='align-items-center text-center mb-1'>Captain's Name</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Captain's Name" value={form.captainName} onChange={handleChange} id='captainName'/>
            
            <h6 className='align-items-center text-center mb-1'>Company's Name</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Company's Name" value={form.company} onChange={handleChange} id='company'/>

            <h6 className='align-items-center text-center mb-1'>Arrival</h6>
            <input type="datetime-local" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Arrival" value={form.arrival} onChange={handleChange} id='arrival'/>

            <h6 className='align-items-center text-center mb-1'>Departure</h6>
            <input type="datetime-local" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Departure" value={form.departure} onChange={handleChange} id='departure'/>

            <div className='my-3'>
                <h6 className='align-items-center text-center mb-1'>Image</h6>
                <input type="file" className="max-logo" placeholder="Image path" onChange={handleChange} id='file' name='file'/>
            </div>

            <h3 className='align-items-center text-center my-3 redText'>{error}</h3>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
            <button className="align-items-center text-center w-50 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Submit changes" value="check" type="button" onClick={warn}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <p className='my-0'>
                        Submit
                    </p>
                </div>
            </button>
            </div>
            </div>
        </form>
        </UserContextProvider>
    )}
    else
    {
        return <h3>Your not registered as an admin</h3>
    }
}
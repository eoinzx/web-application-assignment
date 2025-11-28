//imports
import useAPI from '../../hooks/useAPI.tsx'
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useEffect, useState, useContext } from 'react';

//the account edit page
export default function TimeEditLayout() {
    //sets up the variables
    const { session, job } = useContext(UserContext); 
    const [jobb, setJob] = useState(null);
    var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    //sets up form data
    const [form, setForm] = useState({
        startDate: "",
        endDate: "",
        starting: "",
        ending: "",
    });


    //grabs the users acount data
    useEffect(() => 
    { 
        if (_id != null)
        {
            axios.get(`http://localhost:3020/timetables/${_id}`, {
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

    //updates the timetables account
    const handleSubmit = () => {
        if (job === "admin")
        {
            putRequest(`http://localhost:3020/timetables/${_id}`, form, {
                headers: {
                    "Content_type":"Mulipart/form-data",
                    Authorization: `Bearer ${session}`
                }
            });

            if (error === null)
            {
                setTimeout(function()
                {
                    window.location.href = `/jobs/${_id}`;
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
        if (form.startDate === "" || form.startDate == null || form.startDate === undefined)
        {
            form.startDate = jobb.startDate
        }

        if (form.endDate === "" || form.endDate == null || form.endDate === undefined)
        {
            form.endDate = jobb.endDate
        }

        if (form.starting === "" || form.starting == null || form.starting === undefined)
        {
            form.starting = jobb.starting
        }

        if (form.ending === "" || form.ending == null || form.ending === undefined)
        {
            form.ending = jobb.ending
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
            <h6 className='align-items-center text-center mb-1'>Start Date</h6>
            <input type="datetime-local" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Start Date" value={form.startDate} onChange={handleChange} id='startDate'/>

            <h6 className='align-items-center text-center mb-1'>End Date</h6>
            <input type="datetime-local" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="End Date" value={form.endDate} onChange={handleChange} id='endDate'/>
            
            <h6 className='align-items-center text-center mb-1'>Starting</h6>
            <input type="time" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Starting" value={form.starting} onChange={handleChange} id='starting'/>
            
            <h6 className='align-items-center text-center mb-1'>Ending</h6>
            <input type="time" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Ending" value={form.ending} onChange={handleChange} id='ending'/>
            
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
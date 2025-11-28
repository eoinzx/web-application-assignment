//imports
import useAPI from '../../hooks/useAPI.tsx'
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useState, useContext } from 'react';

//the account edit page
export default function TimeCreLayout() {
    //sets up the variables
    const { session, job } = useContext(UserContext); 
    
    //sets up form data
    const [form, setForm] = useState({
        startDate: "",
        endDate: "",
        starting: "",
        ending: "",
    });

    //sets up editing functions
    const { postRequest, loading, error } = useAPI();

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
            postRequest(`http://localhost:3020/timetables`, form, {
                headers: {
                    "Content_type":"Mulipart/form-data",
                    Authorization: `Bearer ${session}`
                }
            });

            if (error === null)
            {
                setTimeout(function()
                {
                    window.location.href = '/home';
                }, 1500); 
            }
        }
    }

    //warns the user that the are phone to change their accounts details
    function warn() 
    {
        if (window.confirm("Are you sure you want to create this timetable?")) 
        {
            handleSubmit()
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
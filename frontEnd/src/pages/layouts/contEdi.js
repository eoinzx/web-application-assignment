//imports
import useAPI from '../../hooks/useAPI.tsx'
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useEffect, useState, useContext } from 'react';

//the account edit page
export default function ContEditLayout() {
    //sets up the variables
    const { session, job } = useContext(UserContext); 
    const [jobb, setJob] = useState(null);
     const [boats, setBoats] = useState([]);

    var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    //sets up form data
    const [form, setForm] = useState({
        company: "",
        location: "",
        value: "",
        droppedOff: "",
        leaving: "",
        shippedIn_id: "",
        shippedOut_id: "",
    });

    //grabs the users acount data
    useEffect(() => 
    { 
        if (_id != null)
        {
            axios.get(`http://localhost:3020/containers/${_id}`, {
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

            axios.get('http://localhost:3020/boats')
            .then(response => {
                setBoats(response.data.value);
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

    //updates the containers account
    const handleSubmit = () => {
        if (job === "admin")
        {
            putRequest(`http://localhost:3020/containers/${_id}`, form, {
                headers: {
                    "Content_type":"Mulipart/form-data",
                    Authorization: `Bearer ${session}`
                }
            });

            if (error === null)
            {
                setTimeout(function()
                {
                    window.location.href = `/containers/${_id}`;
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
        if (form.company === "" || form.company == null || form.company === undefined)
        {
            form.company = jobb.company
        }

        if (form.location === "" || form.location == null || form.location === undefined)
        {
            form.location = jobb.location
        }

        if (form.value === "" || form.value == null || form.value === undefined)
        {
            form.value = jobb.value
        }

        if (form.droppedOff === "" || form.droppedOff == null || form.droppedOff === undefined)
        {
            form.droppedOff = jobb.droppedOff
        }

        if (form.leaving === "" || form.leaving == null || form.leaving === undefined)
        {
            form.leaving = jobb.leaving
        }

        if (form.shippedIn_id === "" || form.shippedIn_id == null || form.shippedIn_id === undefined)
        {
            form.shippedIn_id = jobb.shippedIn_id
        }

        if (form.shippedOut_id === "" || form.shippedOut_id == null || form.shippedOut_id === undefined)
        {
            form.shippedOut_id = jobb.shippedOut_id
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
            <h6 className='align-items-center text-center mb-1'>Company</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Company" value={form.company} onChange={handleChange} id='company'/>

            <h6 className='align-items-center text-center mb-1'>Location</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Location" value={form.location} onChange={handleChange} id='location'/>
            
            <h6 className='align-items-center text-center mb-1'>Value</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Value" value={form.value} onChange={handleChange} id='value'/>

            <h6 className='align-items-center text-center mb-1'>Drop off</h6>
            <input type="datetime-local" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Drop off" value={form.droppedOff} onChange={handleChange} id='droppedOff'/>

            <h6 className='align-items-center text-center mb-1'>Leaving</h6>
            <input type="datetime-local" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Leaving" value={form.leaving} onChange={handleChange} id='leaving'/>

            <h6 className='align-items-center text-center mb-1'>Shipped in on</h6>
            <select className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" value={form.shippedIn_id} onChange={handleChange} id='shippedIn_id' name='shipping In On'>
                <option selected>Select a boat</option>
                {
                    boats.map((boat, index) => <option value={boat.id}>{boat.name}</option>)
                }
            </select>

            <h6 className='align-items-center text-center mb-1'>Shipping out on</h6>
            <select className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" value={form.shippedOut_id} onChange={handleChange} id='shippedOut_id' name='shipping Out On'>
                <option selected>Select a boat</option>
                {
                    boats.map((boat, index) => <option value={boat.id}>{boat.name}</option>)
                }
            </select>

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
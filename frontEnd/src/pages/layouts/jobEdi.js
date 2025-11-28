//imports
import useAPI from '../../hooks/useAPI.tsx'
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useEffect, useState, useContext } from 'react';

//the account edit page
export default function JobEditLayout() {
    //sets up the variables
    const { session, job } = useContext(UserContext); 
    const [jobb, setJob] = useState(null);
    var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    //sets up form data
    const [form, setForm] = useState({
        titl: "",
        desc: "",
        salary: "",
        file: null
    });

    //grabs the users acount data
    useEffect(() => 
    { 
        if (_id != null)
        {
            axios.get(`http://localhost:3020/jobs/${_id}`, {
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

    //updates the jobs account
    const handleSubmit = () => {
        if (job === "admin")
        {
            putRequest(`http://localhost:3020/jobs/${_id}`, form, {
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
        if (!jobb.image_path || jobb.image_path == null || jobb.image_path === undefined)
        {
            form.file = null
        }

        if (form.titl === "" || form.titl == null || form.titl === undefined)
        {
            form.titl = jobb.titl
        }

        if (form.desc === "" || form.desc == null || form.desc === undefined)
        {
            form.desc = jobb.desc
        }

        if (form.salary === "" || form.salary == null || form.salary === undefined)
        {
            form.salary = jobb.salary
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
            <h6 className='align-items-center text-center mb-1'>Title</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Title" value={form.titl} onChange={handleChange} id='titl'/>

            <h6 className='align-items-center text-center mb-1'>Description</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Description" value={form.desc} onChange={handleChange} id='desc'/>
            
            <h6 className='align-items-center text-center mb-1'>Salary</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Salary" value={form.salary} onChange={handleChange} id='salary'/>

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
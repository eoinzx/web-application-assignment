//imports
import useAPI from '../../hooks/useAPI.tsx'
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useEffect, useState, useContext } from 'react';

//the account edit page
export default function AccoEdit() {
    //sets up the variables
    const [user, setUser] = useState(null);
    const { session, id } = useContext(UserContext); 

    //grabs the users acount data
    useEffect(() => 
    { 
        if (id != null)
        {
            axios.get(`http://localhost:3020/users/${id}`, {
            headers: 
            {
                Authorization: `Bearer ${session}`
            }
            })
            .then(response => {
                setUser(response.data);
             })
             .catch(e => {
                console.log(e);
             });
        }
    
    }, [session, id]);
    
    //sets up form data
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        job_id: "",
        file: null
    });

    //assigns form data with user data
    if (user)
    {
        if (!user.image_path || user.image_path == null || user.image_path === undefined)
        {
            form.file = null
        }

        if (form.username === "" || form.username == null || form.username === undefined)
        {
            form.username = user.username
        }

        if (form.email === "" || form.email == null || form.email === undefined)
        {
            form.email = user.email
        }

        if (form.phone === "" || form.phone == null || form.phone === undefined)
        {
            form.phone = user.phone
        }

        if (form.job_id === "" || form.job_id == null || form.job_id === undefined)
        {
            form.job_id = user.job_id
        }
    }

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

    //updates the users account
    const handleSubmit = () => {

        if (user != null)
        {
            if (!user.image_path || user.image_path == null || user.image_path === undefined)
            {
                form.file = null
            }

            if (form.username == null || form.username === '')
            {
                form.username = user.username
            }
    
            if (form.email == null || form.email === '')
            {
                form.email = user.email
            }
    
            if (form.phone == null || form.phone === '')
            {
                form.phone = user.phone
            }

            if (form.job_id == null || form.job_id === '')
            {
                form.job_id = user.job_id
            }
        }

        putRequest(`http://localhost:3020/users/${id}`, form, {
            headers: {
                "Content_type":"Mulipart/form-data",
                Authorization: `Bearer ${session}`
            }
        });

        if (error === null)
        {
            window.location.href = '/account';
        }
    }

    //warns the user that the are phone to change their accounts details
    function warn() 
    {
        if (window.confirm("Are you sure you want to save these edits")) 
        {
            handleSubmit()
        } 
    }

    //displays the page
    if(loading === true) return <h3>Loading API...</h3>
    if(!user) return <h3>user not found</h3>

    return(
        <UserContextProvider>
        <form className="align-items-center text-center my-3" encType="multipart/form">
            <div className='container'>
            <h6 className='align-items-center text-center mb-1'>Username</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Username" value={form.username} onChange={handleChange} id='username'/>

            <h6 className='align-items-center text-center mb-1'>Email</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Email" value={form.email} onChange={handleChange} id='email'/>

            <h6 className='align-items-center text-center mb-1'>Phone</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Phone" value={form.phone} onChange={handleChange} id='phone'/>

            <h6 className='align-items-center text-center mb-1'>Job_id</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Job ID" value={form.job_id} onChange={handleChange} id='job_id'/>

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
    )
}
//imports
import UserContextProvider from "../contexts/userContextProvider.tsx";
import { useStorageState } from '../hooks/useStorageState.ts';

export function Header()
{
    //sets up the abiliy to sign out
    const [[isLoading, session ], setSession] = useStorageState('session');
    const [[ isEmailLoad, email ], setEmail] = useStorageState('email');

    function signOut() 
    {
        setSession(null);
        window.location.href = '/';
    }

    const handlePress = () =>
    {  
        signOut();
    }

    return(
        <UserContextProvider>
            <header className="align-items-center text-center my-3">
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
            </header>
        </UserContextProvider>
    )
}

export function Footer()
{
    return(
        <UserContextProvider>
            <footer className="container row align-items-center text-center mx-1 my-5 position-absolute bottom start-50 translate-middle">
        <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Home page">
                    <a href="../home">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door-fill me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Home
                            </p>
                        </div>
                    </a>
                </button>
            </div>    
            </div>

            <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Create a puzzle">
                    <a href="../home">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-passport me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6M6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0m-.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
                                <path d="M3.232 1.776A1.5 1.5 0 0 0 2 3.252v10.95c0 .445.191.838.49 1.11.367.422.908.688 1.51.688h8a2 2 0 0 0 2-2V4a2 2 0 0 0-1-1.732v-.47A1.5 1.5 0 0 0 11.232.321l-8 1.454ZM4 3h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Ports
                            </p>
                        </div>
                    </a>
                </button>
            </div>   
            </div>

            <div className="col-2">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Search through puzzles">
                    <a href="../home">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Storage
                            </p>
                        </div>
                    </a>
                </button>
            </div>   
            </div>

            <div className="col-2">
                <div className="align-items-center text-center flex-fill butHov p-0">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="All users">
                        <a href="../home">
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                </svg>

                                <p className='my-0 d-none d-md-block'>
                                    Timetable
                                </p>
                            </div>
                        </a>
                    </button>
                </div>   
            </div>


            <div className="col-2">
                <div className="align-items-center text-center flex-fill butHov p-0">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="All users">
                        <a href="../users">
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                </svg>

                                <p className='my-0 d-none d-md-block'>
                                    Users
                                </p>
                            </div>
                        </a>
                    </button>
                </div>   
            </div>

            <div className="col-2">
                <div className="align-items-center text-center flex-fill butHov p-0">
                    <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Your account">
                        <a href="../account">
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>

                                <p className='my-0 d-none d-md-block'>
                                    Account
                                </p>
                            </div>
                        </a>
                    </button>
                </div>  
            </div>
        </footer>
        </UserContextProvider>
    )
}

export function Card(image, user)
{
    return(
        <UserContextProvider>
            <div className="col-sm-12 col-md-4">
                <div className="card-body align-items-center text-center">
                    <img className='rounded-5 border border-4 border-dark bigImg' src={image} alt="Your account's pic"/>

                    <h4 className='align-items-center text-center my-3'>{user.username}</h4>

                    <p className='align-items-center text-center notHov'>{user.email}</p>
                </div>
            </div>
        </UserContextProvider>
    )
}

/*
<div className="align-items-center text-center d-flex flex-row">
                    <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
                        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Edit your account details">
                            <a href="../accoEdit">
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

                    <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
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
                </div>
*/
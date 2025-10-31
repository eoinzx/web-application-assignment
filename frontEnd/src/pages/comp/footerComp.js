//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//displays the footer
export default function Bottom()
{
    //the footer
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
//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import JobCreLayout from './layouts/jobCre.js'
import { Header, Footer } from "../hooks/compents.js";

//the jobs page
export default function JobCrePage()
{
    return(
        <SessionProvider>
            {Header()}
            <JobCreLayout/>
            {Footer()}
        </SessionProvider>
    )
}
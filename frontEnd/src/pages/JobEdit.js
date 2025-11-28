//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import JobEditLayout from './layouts/jobEdi.js'
import { Header, Footer } from "../hooks/compents.js";

//the jobs page
export default function JobEditPage()
{
    return(
        <SessionProvider>
            {Header()}
            <JobEditLayout/>
            {Footer()}
        </SessionProvider>
    )
}
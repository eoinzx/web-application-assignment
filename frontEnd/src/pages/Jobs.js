//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import JobsLayout from './layouts/jobs.js'
import { Header, Footer } from "../hooks/compents.js";

//the jobs page
export default function UsersPage()
{
    return(
        <SessionProvider>
            {Header()}
            <JobsLayout/>
            {Footer()}
        </SessionProvider>
    )
}
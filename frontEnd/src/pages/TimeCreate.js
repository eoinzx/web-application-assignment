//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import TimeCreLayout from './layouts/timeCre.js'
import { Header, Footer } from "../hooks/compents.js";

//the jobs page
export default function TimeCrePage()
{
    return(
        <SessionProvider>
            {Header()}
            <TimeCreLayout/>
            {Footer()}
        </SessionProvider>
    )
}
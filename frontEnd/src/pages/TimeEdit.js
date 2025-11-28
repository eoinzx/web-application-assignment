//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import TimeEditLayout from './layouts/timeEdi.js'
import { Header, Footer } from "../hooks/compents.js";

//the timetables page
export default function TimeEditPage()
{
    return(
        <SessionProvider>
            {Header()}
            <TimeEditLayout/>
            {Footer()}
        </SessionProvider>
    )
}
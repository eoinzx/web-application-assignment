//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import UseLayout from './layouts/use.js'
import { Header, Footer } from "../hooks/compents.js";

//the users page
export default function UserPage()
{
    return(
        <SessionProvider>
            {Header()}
            <UseLayout/>
            {Footer()}
        </SessionProvider>
    )
}
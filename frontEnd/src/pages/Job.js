//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import JoLayout from './layouts/jo.js'
import { Header, Footer } from "../hooks/compents.js";

//the users page
export default function UserPage()
{
    return(
        <SessionProvider>
            {Header()}
            <JoLayout/>
            {Footer()}
        </SessionProvider>
    )
}
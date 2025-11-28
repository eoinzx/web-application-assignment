//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import AccoPage from './layouts/acco.js'
import { Header, Footer } from "../hooks/compents.js";

//the account page
export default function AccountPage()
{
    return(
        <SessionProvider>
            {Header()}
            <AccoPage/>
            {Footer()}
        </SessionProvider>
    )
}
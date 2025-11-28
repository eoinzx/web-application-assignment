//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import AccoEdit from './layouts/accoEdit.js'
import { Header, Footer } from "../hooks/compents.js";

//the account page
export default function AccountEditPage()
{
    return(
        <SessionProvider>
            {Header()}
            <AccoEdit/>
            {Footer()}
        </SessionProvider>
    )
}
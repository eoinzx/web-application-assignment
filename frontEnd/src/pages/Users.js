//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import UsersLayout from './layouts/users.js'
import { Header, Footer } from "../hooks/compents.js";

//the users page
export default function UsersPage()
{
    return(
        <SessionProvider>
            {Header()}
            <UsersLayout/>
            {Footer()}
        </SessionProvider>
    )
}
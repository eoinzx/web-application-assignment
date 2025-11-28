//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import PortCreLayout from './layouts/porCre.js'
import { Header, Footer } from "../hooks/compents.js";

//the jobs page
export default function PortCrePage()
{
    return(
        <SessionProvider>
            {Header()}
            <PortCreLayout/>
            {Footer()}
        </SessionProvider>
    )
}
//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import PortEditLayout from './layouts/porEdi.js'
import { Header, Footer } from "../hooks/compents.js";

//the ports page
export default function PortEditPage()
{
    return(
        <SessionProvider>
            {Header()}
            <PortEditLayout/>
            {Footer()}
        </SessionProvider>
    )
}
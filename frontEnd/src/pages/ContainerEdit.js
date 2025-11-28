//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import ContEditLayout from './layouts/contEdi.js'
import { Header, Footer } from "../hooks/compents.js";

//the containers page
export default function ContEditPage()
{
    return(
        <SessionProvider>
            {Header()}
            <ContEditLayout/>
            {Footer()}
        </SessionProvider>
    )
}
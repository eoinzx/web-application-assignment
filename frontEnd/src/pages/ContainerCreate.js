//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import ContainerCreLayout from './layouts/contCre.js'
import { Header, Footer } from "../hooks/compents.js";

//the jobs page
export default function ContainerCrePage()
{
    return(
        <SessionProvider>
            {Header()}
            <ContainerCreLayout/>
            {Footer()}
        </SessionProvider>
    )
}
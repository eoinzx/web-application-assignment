//imports
import UserContextProvider from "../contexts/userContextProvider.tsx";
import PorPage from './layouts/por.js'
import { Header, Footer } from "../hooks/compents.js";

//port page
export default function PortPage()
{
//the port page
    return(
        <UserContextProvider>
            <div className="align-items-center text-center">
                {Header()}
                <PorPage/>
                {Footer()}
            </div>
        </UserContextProvider>
    )
}
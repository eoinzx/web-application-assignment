//imports
import UserContextProvider from "../contexts/userContextProvider.tsx";
import ConPage from './layouts/cont.js'
import { Header, Footer } from "../hooks/compents.js";

//container page
export default function ContainerPage()
{
//the container page
    return(
        <UserContextProvider>
            <div className="align-items-center text-center">
                {Header()}
                <ConPage/>
                {Footer()}
            </div>
        </UserContextProvider>
    )
}
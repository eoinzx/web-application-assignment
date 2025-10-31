//imports
import UserContextProvider from "../contexts/userContextProvider.tsx";
import { Header, Footer } from "../hooks/compents.js";

//home page
export default function HomePage()
{
//the home page
    return(
        <UserContextProvider>
            <div className="align-items-center text-center">
                {Header()}
                
                {Footer()}
            </div>
        </UserContextProvider>
    )
}
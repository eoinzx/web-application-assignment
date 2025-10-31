//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//the home pages
export default function HomPage()
{
    //the home page
    return(
        <UserContextProvider>
            <div className="align-items-center text-center row">
                <div className="col-3"></div>

                <div className="col-6">
                    
                </div>

                <div className="col-3">

                </div>
            </div>
        </UserContextProvider>
    )
}

//imports
import SessionProvider from '../contexts/userContextProvider.tsx'
import Top from './comp/headerComp.js'
import AccoEdit from './layouts/accoEdit.js'
import Bottom from './comp/footerComp.js'

//the account page
export default function AccountEditPage()
{
    return(
        <SessionProvider>
            <Top/>
            <AccoEdit/>
            <Bottom/>
        </SessionProvider>
    )
}
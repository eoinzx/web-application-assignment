//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";

//the time item
export default function TimeItem(time){
  //sets up image
  //creates the urls
  const url = `timetables/${time.id}`

  //displays your account
  return (
    <UserContextProvider>            
      <a className="card border border-4 border-dark align-items-center text-center p-3" href={url}>
        <p className='align-items-center text-center notHov'>Starting at {time.startDate.slice(0, 10)}</p>
        <p className="align-items-center text-center notHov">Ending at {time.endDate.slice(0, 10)}</p>
        <p className="align-items-center text-center notHov">Working from {time.starting} to {time.ending}</p>
      </a>
    </UserContextProvider>
  );
}
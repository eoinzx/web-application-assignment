//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/userPlaceholder.png'

//the job item
export default function boatItem(boat){
  //sets up image
  let image = img;
  //creates the urls
  const url = `boats/${boat.id}`

  //displays your account
  return (
    <UserContextProvider>            
      <a className="card border border-4 border-dark align-items-center text-center p-3" href={url}>
        <img className='rounded-5 border border-4 border-dark midImg' src={image} alt="Big account pic"/>
        <h4 className='align-items-center text-center my-3'>{boat.name}</h4>
        <p className="align-items-center text-center notHov">{boat.captainName}</p>
        <p className="align-items-center text-center notHov">{boat.company}</p>
        <p className="align-items-center text-center notHov">Arriving at {boat.arrival.slice(0, 10)}</p>
        <p className="align-items-center text-center notHov">Departing at {boat.departure.slice(0, 10)}</p>
      </a>
    </UserContextProvider>
  );
}
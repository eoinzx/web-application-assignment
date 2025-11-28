//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/userPlaceholder.png'

//the contatiner item
export default function ContItem(container){
  //sets up image
  let image = img;
  //creates the urls
  const url = `containers/${container.id}`

  //displays your account
  return (
    <UserContextProvider>            
      <a className="card border border-4 border-dark align-items-center text-center p-3" href={url}>
        <img className='rounded-5 border border-4 border-dark midImg' src={image} alt="Big account pic"/>
        <h4 className='align-items-center text-center my-3'>{container.company}</h4>
        <p className="align-items-center text-center notHov">{container.location}</p>
        <p className="align-items-center text-center notHov">{container.value}</p>
        <p className="align-items-center text-center notHov">{container.droppedOff}</p>
        <p className="align-items-center text-center notHov">{container.leaving}</p>
      </a>
    </UserContextProvider>
  );
}
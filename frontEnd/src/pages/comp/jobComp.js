//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/userPlaceholder.png'

//the job item
export default function JobItem(job){
  //sets up image
  let image = img;
  //creates the urls
  const url = `jobs/${job.id}`

  //displays your account
  return (
    <UserContextProvider>            
      <a className="card border border-4 border-dark align-items-center text-center p-3" href={url}>
        <img className='rounded-5 border border-4 border-dark midImg' src={image} alt="Big account pic"/>
        <h4 className='align-items-center text-center my-3'>{job.titl}</h4>
        <p className="align-items-center text-center notHov">{job.desc}</p>
        <p className="align-items-center text-center notHov">{job.salary}</p>
      </a>
    </UserContextProvider>
  );
}
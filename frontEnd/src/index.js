//imports
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//the pages
import App from './App';
import RegistorForm from './pages/Registor';
import LoginForm from './pages/Login';
import HomePage from './pages/Home';
import TimeCrePage from './pages/TimeCreate';
import TimeEditPage from './pages/TimeEdit';
import PortPage from './pages/Port';
import PortCrePage from './pages/PortCreate';
import PortEditPage from './pages/PortEdit';
import ContPage from './pages/Container';
import ContCrePage from './pages/ContainerCreate';
import ContEditPage from './pages/ContainerEdit';
import AccountPage from './pages/Account';
import AccountEditPage from './pages/AccoEdit';
import JobsPage from './pages/Jobs';
import JobPage from './pages/Job';
import JobCrePage from './pages/JobCreate';
import JobEditPage from './pages/JobEdit';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import Assetspage from './pages/Asset';

const router = createBrowserRouter([
    //start page
  {    path: "/",    element: <App/>,  },
  
  //registor page
  {    path: "/register",    element: <RegistorForm/>  },

  //login page
  {    path: "/login",    element: <LoginForm/>  },

  //home page
  {    path: "/home",    element: <HomePage/>  },

  //timeCreate page
  {    path: "/timeCreate",    element: <TimeCrePage/>  },

  //timeEdit page
  {    path: "/timeEdit/:id",    element: <TimeEditPage/>  },

  //port page
  {    path: "/ports",    element: <PortPage/>  },

  //portCreate page
  {    path: "/portCreate",    element: <PortCrePage/>  },

  //portEdit page
  {    path: "/portEdit/:id",    element: <PortEditPage/>  },

  //container page
  {    path: "/containers",    element: <ContPage/>  },

  //containerCreate page
  {    path: "/contCreate",    element: <ContCrePage/>  },

  //containerEdit page
  {    path: "/contEdit/:id",    element: <ContEditPage/>  },

   //jobs page
  {    path: "/jobs",    element: <JobsPage/>  },

  //jobs page
  {    path: "/jobs/:id",    element: <JobPage/>  },

  //jobCreate page
  {    path: "/jobCreate",    element: <JobCrePage/>  },

  //jobEdit page
  {    path: "/jobEdit/:id",    element: <JobEditPage/>  },

   //users page
  {    path: "/users",    element: <UsersPage/>  },

  //users page
  {    path: "/users/:id",    element: <UserPage/>  },

   //account page
  {    path: "/account",    element: <AccountPage/>  },

    //account page
  {    path: "/accoEdit/:id",    element: <AccountEditPage/>  },
    
  //user page
  {    path: "/assets",    element: <Assetspage/>  },
])

//root creator
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

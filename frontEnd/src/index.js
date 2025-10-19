//imports
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//the pages
import App from './App';
import RegistorForm from './pages/Registor';
import LoginForm from './pages/Login';
import HomePage from './pages/Home';
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

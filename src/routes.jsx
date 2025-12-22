import {createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'
import SymptomsBot from './SymptomsBot/SymptomsBot.jsx'
import Consultation from './Pages/Consultation/Consltation.jsx'
import EnterVideoCall from './Pages/VideoCallUi/EnterVideoCall.jsx'
// import VideoCall from './Pages/VideoCall/VideoCall.jsx'
import Signup from './Pages/signup/Signup.jsx'
import VideoCall from './components/videocall/VideoCall.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
    ]
  },
  {
    path: "/login",
    element: <App/>,
    children:[
      {
        path:"/login",
        element:<Login/>
      },
    ]
  },
  {
    path:"/symptomBot",
    element:<App/>,
    children:[{
      path:"/symptomBot",
      element: <SymptomsBot/>
    }]
  },
  {
    path:"/consultation",
    element:<App/>,
    children:[{  
         path:"/consultation",
         element:<Consultation/>

  }]
},
{
  path:"/enterVideo",
  element:<App/>,
  children:[{
    path:"/enterVideo",
    element:<VideoCall/>
  }]
},
{
  path:"/signup",
  element:<App/>,
  children:[{
    path:"/signup",
    element:<Signup/>,
  }]
}
])

export default router;
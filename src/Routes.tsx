import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'
import App from "./App";
import AuthRoute from "./AuthRoute";
import Login from "./Login";
import Signup from "./Signup";

function AllRoutes(){
    return(
        <Router>
        <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login/>}/>
           <Route path='/' element={<App/>}/> */}
          {/* <Route path='*' element={<Navigate to="/"/>}/> */}

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/' element={<AuthRoute><App/></AuthRoute>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<App />} />
          <Route path="*" element={<Navigate to="/login" />} />
  
         {/* <Route path="/" element={<AuthRoute><App /></AuthRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<App />} />
          <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </Router>
    )
}
export default AllRoutes;
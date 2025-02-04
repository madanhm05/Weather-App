import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AllRoutes from './Routes.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';


// import App from './App.tsx'
// import Login from './Login.tsx'
// import Signup from './Signup.tsx'
// import AuthRoute from './AuthRoute.tsx';
// import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRknygq3iw3D99kPVIQuNI6KO8wv17gvU",
  authDomain: "weatherapp-36afc.firebaseapp.com",
  projectId: "weatherapp-36afc",
  storageBucket: "weatherapp-36afc.firebasestorage.app",
  messagingSenderId: "104747659282",
  appId: "1:104747659282:web:4d18017bcb6f8d0d48e8cb"
};

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
      <AllRoutes />
    
  </StrictMode>,
)

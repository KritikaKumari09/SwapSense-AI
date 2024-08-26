import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider , createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './components/HomePage'
import Layout from './components/Layout'
import DeepFakeDetect from './components/DeepFakeDetect'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
     
      <Route path='' element={<HomePage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      
      <Route path='/detect-deepfake' element={<DeepFakeDetect/>}/>
     
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
   {/* above routerprovider is just a wrapper and it just needs one thing i.e. router */}
   {/* we above created router in 2 ways */}
  </React.StrictMode>,
)

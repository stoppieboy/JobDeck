import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Main_content from "./Components/Main_content"
import { Suspense, useState } from "react"
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import './App.css'

function App() {

  const [jobData, setJobData] = useState([])

  return (
    <>
    <Header setJobData={setJobData}/>
    <Suspense>
      <Main_content jobData={jobData}/>
    </Suspense>
    <Footer />
    </>
  )
}

export default App

import { Routes, Route } from "react-router";
import Layout from './components/Layout'
import { Outlet } from "react-router";

function App() {
  
  
  // console.table(products)
  
 


  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default App

import Layout from './components/Layout'
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

function App() {
  let navigate = useNavigate()
  const location = useLocation()
useEffect(()=>{
  if (location.pathname === '/'){
    navigate('/categories/all', {replace: true})
  }
}, [location.pathname, navigate])
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default App

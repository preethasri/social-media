import {Navigate,Outlet,useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute=()=>{
   const {token}=useSelector((state)=>state.auth || {})
   const location =useLocation()

   return token ?( <Outlet />):(
   <Navigate to ="/login" state={{from:location}} replace />)
}
export {PrivateRoute}
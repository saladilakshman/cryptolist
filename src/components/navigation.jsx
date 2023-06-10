import {useNavigate} from "react-router-dom";
 const RoutingNavigation=(componentname)=>{
    const navigate=useNavigate();
    document.startViewTransition(()=>{
         navigate(componentname)
    })
}
export default RoutingNavigation
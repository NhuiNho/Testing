import Home from "components/users/home"
import MasterLayoutUser from "pages/user/theme/masterLayoutUser"
import { Route, Routes } from "react-router-dom"
import { ROUTERS } from "utils/router"


export const renderUserRouter = () => {
     const routers = [
          {
               path: ROUTERS.USER.HOME,
               component: <Home />
          },
     ]

     return (
          <MasterLayoutUser>
               <Routes>
                    {routers.map((item, key) => (
                         <Route key={key} path={item.path} element={item.component}></Route>
                    ))}
               </Routes>
          </MasterLayoutUser>
     )
}
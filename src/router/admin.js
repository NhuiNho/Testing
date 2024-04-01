import Dashboard from "components/admins/dashboard"
import Menus from "components/admins/menus"
import MasterLayout from "pages/admin/theme/masterLayout"
import { Route, Routes } from "react-router-dom"
import { ROUTERS } from "utils/router"

export const renderAdminRouter = () => {
     const routers = [
          {
               path: ROUTERS.ADMIN.HOME,
               component: <Dashboard />
          },
          {
               path: ROUTERS.ADMIN.MENU,
               component: <Menus />
          },
     ]

     return (
          <MasterLayout>
               <Routes>
                    {routers.map((item, key) => (
                         <Route key={key} path={item.path} element={item.component}></Route>
                    ))}
               </Routes>
          </MasterLayout>
     )
}
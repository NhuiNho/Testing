import { useLocation } from "react-router-dom";
import { renderAdminRouter } from "router/admin";
import { renderUserRouter } from "./router/user";

const RouterCustom = () => {
     const location = useLocation(); // Di chuyển useLocation vào trong component

     const isAdmin = location.pathname.startsWith("/admin"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/admin"

     if (isAdmin) {
          return renderAdminRouter()
     }
     else {
          return renderUserRouter()
     }
}

export default RouterCustom
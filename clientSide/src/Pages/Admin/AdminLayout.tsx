import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Admin/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";

const AdminLayout = () => {
  console.log("AdminLayout rendered");
  return (
    <>
      <Header />
      <div className="w-full flex justify-center text-white">
        <div className="w-full flex justify-center text-white">
          <div className="w-[74.8125rem] flex gap-[3.25rem]">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout

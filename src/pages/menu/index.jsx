import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Header from "../../components/header";
import "./style.css";

const MenuPage = ({ setuserId }) => {
  const userID = useSelector((state) => state.slices.userID);
  const navigate = useNavigate();

  return (
    <>
      <div className="px-5 md:px-16 lg:px-24">
        <Header />

        <Outlet />
      </div>
    </>
  );
};

export default MenuPage;

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import MenuPage from "./pages/menu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useLocalStorageState, useTitle } from "ahooks";
import CategoryCardsPage from "./pages/category-cards";
import Menu from "./pages/menu/menu";
import TicketPage from "./pages/ticket";
import Busket from "./pages/busket";
import "./App.css";
import Admin from "./pages/admin";
import AdminLogin from "./pages/admin/login";
import Tickets from "./pages/admin/tickets";
import TicketsSold from "./pages/admin/tickets-sold";
import Users from "./pages/admin/users";

function App() {
  const queryClient = useQueryClient();

  const userID = useSelector((state) => state.slices.userID);
  const [userType, setUserType] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useTitle("Tickets");

  const [userId, setuserId] = useLocalStorageState("user-id-app", {
    defaultValue: false,
  });

  const { data } = useQuery("user-one", () => {
    return axios
      .get(`https://todo-task-4qt6.onrender.com/users?id=${userID}`)
      .then((response) => {
        response?.data?.map((data) => {
          setUserType(data?.role);
        });

        return response?.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  const { data: ticketPricesData } = useQuery(["tickets-prices-data"], () => {
    return axios
      .get("https://todo-task-4qt6.onrender.com/tickets-prices")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching ticket prices data:", error);
        throw error;
      });
  });

  const { mutate } = useMutation(
    (id) => {
      return axios.delete(
        `https://todo-task-4qt6.onrender.com/tickets-prices/${id}`
      );
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["tickets-prices-data"]);
      },
    }
  );

  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/" && userId == false) {
      navigate("/login");
    }
    if (!userId && location.pathname != "/register") {
      setuserId(false);
      navigate("/login");
    }
  }, [userId, location?.pathname]);

  useEffect(() => {
    ticketPricesData?.filter((t) => {
      if (t.ticketLineCount <= 0) {
        mutate(t?.id);
      }
    });
  }, [ticketPricesData, location?.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MenuPage setuserId={setuserId} />}>
          <Route path="busket" element={<Busket />} />
          <Route path="/" element={<Menu />} />
          <Route path=":type/tickets" element={<CategoryCardsPage />} />
          <Route path=":type/:id" element={<TicketPage />} />
        </Route>
        <Route path="login" element={<LoginPage setuserId={setuserId} />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="admin" element={<Admin userType={userType} />}>
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets-sold" element={<TicketsSold />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;

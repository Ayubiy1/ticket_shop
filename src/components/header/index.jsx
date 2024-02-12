import { SlBasket } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { AiOutlineMenuUnfold } from "react-icons/ai";

import "./style.css";
import { useState } from "react";
import { Input, Modal, Form, Drawer, Dropdown } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const { Search } = Input;

const Header = () => {
  const userID = useSelector((state) => state?.slices?.userID);

  const [form] = useForm();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useQuery(["orders-prices-data"], () => {
    return axios
      .get(`https://todo-task-4qt6.onrender.com//orders?userId=${+userID}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching ticket prices data:", error);
        throw error;
      });
  });

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishSearch = (values) => {
    console.log("Success:", values);
    form.setFieldValue("search", "");
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Log Out
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
  ];

  return (
    <div>
      <div style={{ position: "sticky", top: 0 }}>
        <div className="flex items-center justify-between py-5">
          <a
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            Logo
          </a>

          <ul className="flex gap-4 items-center justify-center ul">
            <li
              onClick={() => {
                navigate("/all/tickets");
              }}
            >
              Barcha tadbirlar
            </li>
            <li
              onClick={() => {
                navigate("/concerts/tickets");
              }}
            >
              Konsertlar
            </li>
            <li
              onClick={() => {
                navigate("/theaters/tickets");
              }}
            >
              Madaniy tadbirlar
            </li>
            <li
              onClick={() => {
                navigate("/kids/tickets");
              }}
            >
              Bolalar
            </li>
          </ul>

          <div className="flex items-center gap-4 user text-white">
            <span className="search" onClick={showModal}>
              <CiSearch />
            </span>

            <span
              className="basket flex gap-1 items-center text-white"
              onClick={() => {
                navigate("/busket");
              }}
            >
              <SlBasket />
              {data?.length}
            </span>

            <span className="menu" onClick={showDrawer}>
              <AiOutlineMenuUnfold />
            </span>

            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <span className="h-[10px] w-[10px] text-[17px] flex items-center justify-center">
                <FaRegUser />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>

      <ul className="flex gap-4 items-center justify-center ul-two">
        <li
          onClick={() => {
            navigate(`/`);
          }}
        >
          Barcha tadbirlar
        </li>
        <li
          onClick={() => {
            navigate(`concerts/tickets`);
          }}
        >
          Konsertlar
        </li>
        <li
          onClick={() => {
            navigate(`theaters/tickets`);
          }}
        >
          Teatrlar
        </li>
        <li
          onClick={() => {
            navigate(`kids/tickets`);
          }}
        >
          Bolalar
        </li>
      </ul>

      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        style={{ zIndex: "99999" }}
      >
        <Form form={form} onFinish={onFinishSearch}>
          <Form.Item
            name="search"
            rules={[
              {
                required: true,
                message: "Qidirish uchun bironta so'z kiriting!",
              },
            ]}
          >
            <Search placeholder={"Search"} enterButton="Search" />
          </Form.Item>
        </Form>

        <ul className="flex flex-col gap-4 items-start justify-center ul-drawer">
          <li
            onClick={() => {
              navigate(`/`);
              onClose();
            }}
          >
            Barcha tadbirlar
          </li>
          <li
            onClick={() => {
              navigate(`concerts/tickets`);
              onClose();
            }}
          >
            Konsertlar
          </li>
          <li
            onClick={() => {
              navigate(`theaters/tickets`);
              onClose();
            }}
          >
            Teatrlar
          </li>
          <li
            onClick={() => {
              navigate(`kids/tickets`);
              onClose();
            }}
          >
            Bolalar
          </li>
        </ul>
      </Drawer>

      <Modal
        title="Qidiruv"
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinishSearch}>
          <Form.Item
            name="search"
            rules={[
              {
                required: true,
                message: "Qidirish uchun bironta so'z kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Header;

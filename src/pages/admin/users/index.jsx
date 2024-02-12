import { Button, Modal, Table, Typography } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserIdAdmin } from "../../../redux/slice";

const Users = () => {
  const userIdAdmin = useSelector((state) => state?.slices?.userIdAdmin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(1);

  const dispatch = useDispatch();

  const { data } = useQuery("admin-users", () => {
    return axios.get("https://todo-task-4qt6.onrender.com/users");
  });
  const { data: userData } = useQuery("admin-user", () => {
    return axios.get(`https://todo-task-4qt6.onrender.com/users?id=${userId}`);
  });

  const showModal = (id) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Optisons",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <div className="flex gap-3 items-center">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                showModal(id);
                setUserId(id);
                dispatch(setUserIdAdmin(id));
              }}
            >
              <EyeFilled className="text-[11px]" />
            </Button>

            <Button size="small" type="primary" danger>
              <FaTrashAlt className="text-[11px]" />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.data}
        scroll={{
          y: 450,
        }}
      />

      {/* <SeeUser
        userData={userData?.data}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      /> */}

      <Modal
        title="User"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        {userData?.data?.map((user, index) => {
          return (
            <div key={index}>
              <Typography>{user?.userName}</Typography>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default Users;

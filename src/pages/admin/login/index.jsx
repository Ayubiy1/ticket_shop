import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useQuery } from "react-query";
import "./style.css";
import axios from "axios";
import { useLocalStorageState } from "ahooks";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserID } from "../../../redux/slice";
// import { setUserID } from "../../../redux/slice";

const AdminLogin = ({ setuserId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Successfully added to the account",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "User not found or credentials are incorrect",
    });
  };

  const { data } = useQuery("users", () => {
    return axios.get("http://localhost:3001/users");
  });

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [userID, setUserIDS] = useLocalStorageState("userID", {
    defaultValue: null,
  });

  const onFinish = (values) => {
    const foundUser = data?.data.find(
      (user) =>
        user?.email === values?.email && user.password === values?.password
    );

    if (foundUser) {
      success();
      setTimeout(function () {
        setuserId(true);
        setUserIDS(+foundUser?.id);
        dispatch(setUserID(+foundUser?.id));
        localStorage.setItem("user-id", foundUser.id);
        navigator("/");
      }, 1234);
    } else {
      setUserIDS(null);
      error();
    }
  };

  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center login">
      {contextHolder}
      <Form onFinish={onFinish} layout="vertical" className="login-form">
        <h2 className="text-center text-white">Admin</h2>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex gap-2 justify-center">
          <Form.Item>
            <Button className="w-[100px]" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <Typography
            onClick={() => {
              navigator("/register");
            }}
            className="h-[32px] text-blue-600 flex items-center justify-center cursor-pointer"
          >
            Register
          </Typography>
        </div>
      </Form>
    </div>
  );
};
export default AdminLogin;

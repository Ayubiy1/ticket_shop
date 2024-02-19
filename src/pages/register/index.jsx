import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router";

const RegisterPage = ({ setuserId }) => {
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

  const queryClient = useQueryClient();
  const navigator = useNavigate();

  const { data } = useQuery("users", () => {
    return axios.get("https://todo-task-4qt6.onrender.com/users");
  });

  const { mutate } = useMutation(
    (newData) => {
      return axios.post("https://todo-task-4qt6.onrender.com/users", newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        success();
        navigator("/login");
      },
    }
  );

  const onFinish = (values) => {
    const foundUser = data?.data.find(
      (user) =>
        user?.email == values?.email || user.userName == values?.userName
    );

    const newUser = {
      ...values,
      role: "user",
    };

    if (!foundUser) {
      mutate(newUser);
    } else {
      error();
    }
  };

  return (
    <div className="h-[100vh] w-[100%] flex items-center justify-center login">
      {contextHolder}
      <Form onFinish={onFinish} layout="vertical" className="login-form">
        <h2 className="text-center text-white">Register</h2>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your fullName!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="User Name"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your userName!",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
              Register
            </Button>
          </Form.Item>

          <Typography
            onClick={() => {
              navigator("/login");
            }}
            className="h-[32px] text-blue-600 flex items-center justify-center cursor-pointer"
          >
            login
          </Typography>
        </div>
      </Form>
    </div>
  );
};
export default RegisterPage;

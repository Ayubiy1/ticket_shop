import { Button, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useQuery } from "react-query";

import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

const TicketsSold = () => {
  const { data } = useQuery("admin-tickets", () => {
    return axios.get("https://todo-task-4qt6.onrender.com/orders");
  });

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: "150px",
      render: (img) => {
        return (
          <>
            <img src={img} className="w-[100px] h-[80px]" alt="" />
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "age",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ticket count",
      dataIndex: "ticketCount",
      key: "ticketCount",
    },
    {
      title: "Start time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => <>{dayjs(startTime).format("DD MMMM YYYY")}</>,
    },
    {
      title: "Optisons",
      dataIndex: "",
      key: "",
      render: () => {
        return (
          <div className="flex gap-3 items-center justify-center">
            <Button size="small" type="primary">
              <FaPen className="text-[11px]" />
            </Button>
            <Button size="small" type="primary" danger>
              <FaTrashAlt className="text-[11px]" />
            </Button>
          </div>
        );
      },
      // width: "200px",
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
    </>
  );
};

export default TicketsSold;

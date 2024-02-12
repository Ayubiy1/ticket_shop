import { Col, Row, Typography } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { FaAngleRight } from "react-icons/fa6";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

import "./style.css";
import Loading from "../loding";

const Cards = ({ type, title, ticketsData, isLoading }) => {
  const navigate = useNavigate();

  // const { data: ticketsData, isLoading } = useQuery("tickets-data", () => {
  //   return axios.get("http://localhost:3001/tickets");
  // });

  return (
    <div className="mt-10">
      <h2 className="text-white flex items-center ms-3 cursor-pointer">
        {title}

        <FaAngleRight />
      </h2>

      <Row className={"flex items-start justify-center sm:justify-start p-2"}>
        {ticketsData?.data
          ?.filter((t) => t?.type == type)
          .slice(0, 4)
          .map((ticket) => {
            return (
              <Col
                span={12}
                xs={{ span: 20 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                xl={{ span: 6 }}
                key={ticket?.id}
                className="card"
                onClick={() => navigate(`/${ticket?.type}/${ticket.id}`)}
              >
                <div
                  className="m-2 cursor-pointer rounded-lg overflow-hidden card-item relative"
                  style={{ border: "1px solid #8080802e" }}
                >
                  <div className="img-div w-[100%] h-[258px]">
                    <img
                      src={ticket?.img}
                      alt={ticket?.name}
                      className="w-[100%] h-[100%] img"
                    />
                    <div className="absolute bottom-0 left-0 info">
                      <Typography className="title">{ticket?.name}</Typography>
                      <Typography className="title">
                        {dayjs(ticket?.startTime).format("DD-MMMM-YYYY")}
                      </Typography>
                    </div>
                  </div>
                  <button className="see-btn">view ticket</button>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Cards;

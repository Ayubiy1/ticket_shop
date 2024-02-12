import { Col, Row, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import Loading from "../../components/loding";
import { useTitle } from "ahooks";

const CategoryCardsPage = () => {
  const { type, id } = useParams();
  const navigator = useNavigate();
  useTitle(type.toLowerCase());

  const { data: ticketsData, isLoading } = useQuery("tickets-data", () => {
    return axios.get("https://todo-task-4qt6.onrender.com/tickets");
  });

  return (
    <>
      <h2
        className="text-white flex items-center ms-3 cursor-pointer"
        onClick={() => {
          navigator("/");
        }}
      >
        {/* {title} */}
        <FaArrowLeft />
      </h2>

      <div>
        {isLoading ? (
          <div className="">
            <Loading />
          </div>
        ) : (
          <Row className={"flex items-start p-2"}>
            {ticketsData?.data
              ?.filter((t) =>
                type == "all" ? t?.type !== type : t?.type == type
              )
              .map((ticket) => {
                return (
                  <Col
                    span={12}
                    xs={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 6 }}
                    xl={{ span: 6 }}
                    key={ticket?.id}
                    className="card"
                    onClick={() => navigator(`/${ticket?.type}/${ticket.id}`)}
                  >
                    <div className="m-2 cursor-pointer rounded-lg overflow-hidden card-item relative">
                      <div className="img-div w-[100%] h-[258px]">
                        <img
                          src={ticket?.img}
                          alt={ticket?.name}
                          className="w-[100%] h-[100%] img"
                        />
                        <div className="absolute bottom-0 left-0 info">
                          <Typography className="title">
                            {ticket?.name}
                          </Typography>
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
        )}
      </div>
    </>
  );
};

export default CategoryCardsPage;

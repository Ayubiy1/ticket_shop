import { Col, Row, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Busket = () => {
  const userId = useSelector((state) => state?.slices?.userID);
  const navigator = useNavigate();

  const { data: ticketsData, isLoading: ticketsIsLoding } = useQuery(
    "orders-data",
    () => {
      return axios.get("http://localhost:3001/orders");
    }
  );

  return (
    <>
      <div className="mt-5">
        <Row className={"flex items-start p-2"}>
          {ticketsData?.data
            ?.filter((t) => t?.userId == +userId)
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
      </div>
    </>
  );
};
export default Busket;

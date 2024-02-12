import { Button, Col, Empty, Row, Typography, message } from "antd";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";

import "./index.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const PriceCards = ({ img }) => {
  const userId = useSelector((state) => state?.slices?.userID);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.success("success");
  };

  const [ticketCounts, setTicketCounts] = useState([]);

  const {
    data: ticketPricesData,
    isLoading,
    isError,
  } = useQuery(["tickets-prices-data", id], () => {
    return axios
      .get("http://localhost:3001/tickets-prices")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching ticket prices data:", error);
        throw error;
      });
  });

  const { mutate, isLoading: butTicketLoading } = useMutation(
    (newDate) => {
      return axios.post("http://localhost:3001/orders", newDate);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries([
          "tickets-prices-data",
          "orders-prices-data",
        ]);
        success();
      },
    }
  );

  const { mutate: mutateTickets } = useMutation(
    ({ newDataPrices, dataId }) => {
      return axios.put(
        `http://localhost:3001/tickets-prices/${dataId}`,
        newDataPrices
      );
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["tickets-prices-data"]);
        success();
        setTicketCounts([]);
      },
    }
  );

  const handleDecrease = (index) => {
    const newTicketCounts = [...ticketCounts];

    const currentCount = newTicketCounts[index]?.count || 0;

    newTicketCounts[index] = {
      ...newTicketCounts[index],
      count: currentCount - 1,
    };

    setTicketCounts(newTicketCounts);
  };

  const handleIncrease = (index) => {
    const newTicketCounts = [...ticketCounts];

    const currentCount = newTicketCounts[index]?.count || 0;

    newTicketCounts[index] = {
      ...newTicketCounts[index],
      count: currentCount + 1,
    };

    setTicketCounts(newTicketCounts);
  };

  const buyTicket = (index, ticket) => {
    const newData = {
      userId: userId,
      img: img,
      type: ticket?.type,
      price: "50000",
      totolPrice: ticketCounts[index].count * ticket?.price,
      ticketPriceId: 8,
      ticketId: 4,
      ticketLine: 4,
      ticketCount: ticketCounts[index].count,
    };
    let dataId = ticket?.id;

    const newDataPrices = {
      img: img,
      ticketId: ticket?.ticketId,
      ticketLine: ticket?.ticketLine,
      ticketLineCount: ticket?.ticketLineCount - ticketCounts[index].count,
      price: "100000",
    };

    mutate(newData);
    mutateTickets({ newDataPrices, dataId });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading ticket prices data</div>;
  }

  const filteredTicketPrices = ticketPricesData?.filter(
    (t) => t.ticketId === +id
  );

  return (
    <>
      {contextHolder}
      <Row className={"flex items-start justify-center p-2"}>
        {filteredTicketPrices?.map((ticket, index) => {
          return (
            <Col
              span={12}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              key={ticket?.id}
              className="card"
              title={`${ticket.ticketLine}`}
            >
              <div className="py-2 px-3 m-2 cursor-pointer rounded-lg overflow-hidden card-item relative bg-[#293747]">
                <Typography className="text-white flex items-center justify-between">
                  <span>Narxi:</span>
                  {new Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "UZS",
                  }).format(ticket?.price)}
                </Typography>
                <p>{ticket.ticketcLine}</p>

                <div className="flex items-start justify-between">
                  <Button
                    className="btn"
                    onClick={() => handleDecrease(index)}
                    disabled={!ticketCounts[index]?.count}
                  >
                    -
                  </Button>
                  <span>{ticketCounts[index]?.count || 0}</span>
                  <Button
                    className="btn"
                    disabled={
                      ticketCounts[index]?.count == ticket?.ticketLineCount
                    }
                    onClick={() => handleIncrease(index)}
                  >
                    +
                  </Button>
                </div>

                <Typography className="text-white flex items-center justify-between my-2">
                  <span>Chiptalar soni:</span> {ticket.ticketLineCount}
                </Typography>

                <Button
                  className="btn w-[100%]"
                  onClick={() => {
                    buyTicket(index, ticket);
                  }}
                  disabled={!ticketCounts[index]?.count}
                >
                  Sotib olish
                </Button>
              </div>
            </Col>
          );
        })}
        {filteredTicketPrices.length < 1 && (
          <>
            <Typography className="text-white font-bold text-[20px]">
              Chiptalar mavjud emas!
            </Typography>
            {/* <Empty />{" "} */}
          </>
        )}
      </Row>
    </>
  );
};

export default PriceCards;

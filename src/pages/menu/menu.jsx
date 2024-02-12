import { Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.css";
import Cards from "../../components/cards";
import { useRef } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../../components/loding";

const Menu = () => {
  const sliderRef = useRef(null);

  const { data: ticketsData, isLoading } = useQuery("tickets-data", () => {
    return axios.get("https://todo-task-4qt6.onrender.com/tickets");
  });

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.next();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.prev();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Button onClick={next} icon={<RightOutlined />} />,
    prevArrow: <Button onClick={previous} icon={<LeftOutlined />} />,
  };
  return (
    <>
      <div className="relative mt-5">
        <Carousel
          className="flex items-center justify-center"
          autoplay
          dotPosition="bottom"
          ref={sliderRef}
          {...settings}
        >
          <div className="w-[400px] max-h-[555px]">
            <img
              src="https://cdn.iticket.uz/event/slide/pwfE3AXk1Rk2992cmx8HIylxchH90FUWZ2DGv5FE.jpg"
              className="w-[100%]"
            />
          </div>

          <div className="w-[400px] max-h-[555px]">
            <img
              src="https://cdn.iticket.uz/event/slide/Yun93gQWrChKkVIWUvMt6iLdPkrhd1zgTTYS6PaH.jpg"
              className="w-[100%]"
            />
          </div>

          <div className="w-[400px] max-h-[555px]">
            <img
              src="https://cdn.iticket.uz/event/slide/Anl28gDJFGYsx2Y8bmpVWszByTkdGHxpbGshEFF9.jpg"
              className="w-[100%]"
            />
          </div>

          <div className="w-[400px] max-h-[555px]">
            <img
              src="https://cdn.iticket.uz/event/slide/visa_local_discount.jpg"
              className="w-[100%]"
            />
          </div>
        </Carousel>

        <Button className="absolute top-[50%] previous" onClick={previous}>
          <LeftOutlined />
        </Button>
        <Button className="absolute top-[50%] right-0 next" onClick={next}>
          <RightOutlined />
        </Button>
      </div>

      {isLoading ? (
        <div className="">
          <Loading />
        </div>
      ) : (
        <div className="mt-20">
          <Cards
            ticketsData={ticketsData}
            isLoading={isLoading}
            type={"kids"}
            title={"Bolalar uchun"}
          />

          <Cards
            ticketsData={ticketsData}
            isLoading={isLoading}
            type={"theaters"}
            title={"Teatrlar"}
          />

          <Cards
            ticketsData={ticketsData}
            isLoading={isLoading}
            type={"hockey"}
            title={"Hokkey"}
          />
        </div>
      )}
    </>
  );
};

export default Menu;

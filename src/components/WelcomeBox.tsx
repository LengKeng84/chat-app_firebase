import React, { useContext } from "react";
import { Carousel, Image } from "react-bootstrap";
import { MainContext } from "../context/MainProvider";
import { GrPrevious, GrNext } from "react-icons/gr";

const WelcomeBox = () => {
  const { darkMode } = useContext(MainContext);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="text-[25px] font-bold">Chào mừng đến với KChat</div>

      <div className="w-full h-[400px]">
        <Carousel variant="dark" className="w-full h-full">
          <Carousel.Item className="flex flex-col">
            <div className="flex justify-center">
              <img
                src={require("../assets/images/welcome-people.png")}
                className="w-[400px] h-[300px]"
              />
            </div>
            <div className="text-center mt-3">
              <p className="text-[18px]">Gửi tin nhắn mọi lúc mọi nơi!</p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="flex justify-center">
              <img
                src={require("../assets/images/welcome-people2.png")}
                className="w-[400px] h-[300px]"
              />
            </div>
            <div className="text-center mt-3">
              <p className="text-[18px]">Chat nhóm vơi bạn bè!</p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="flex justify-center">
              <img
                src={require("../assets/images/welcome-people3.png")}
                className="w-[400px] h-[300px]"
              />
            </div>
            <div className="text-center mt-3">
              <p className="text-[18px]">
                Trao đổi công việc thuận tiện và dễ dàng!
              </p>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="flex justify-center">
              <img
                src={require("../assets/images/welcome-people4.png")}
                className="w-[400px] h-[300px]"
              />
            </div>
            <div className="text-center mt-3">
              <p className="text-[18px]">Video call với người thân!</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomeBox;

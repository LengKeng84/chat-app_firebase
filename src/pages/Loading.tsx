import React from "react";
import { Image, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-2">
      <div className="w-[150px]">
        <Image src={require("../assets/images/brandLogo.png")} />
      </div>
      <div className="text-[30px] font-bold">Đang tải</div>
      <div className="flex gap-4">
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
      </div>
    </div>
  );
};

export default Loading;

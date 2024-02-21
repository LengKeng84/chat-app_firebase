import { useState, useContext } from "react";

import LoginBox from "../components/LoginBox";
import RegisterBox from "../components/RegisterBox";

import { MdDarkMode } from "react-icons/md";

import { Button } from "react-bootstrap";
import { MainContext } from "../context/MainProvider";
import { ToastContainer } from "react-toastify";
import Loading from "./Loading";

const Login = () => {
  const { darkMode, setDarkMode, currentUser } = useContext(MainContext);
  const [active, setActive] = useState<boolean>(true);

  return (
    <>
      <ToastContainer />
      <div className="relative h-full flex justify-center items-center">
        <div className="w-[400px] shadow-sFull dark:shadow-[#fff] rounded-[10px] px-4 py-3">
          {active ? <LoginBox /> : <RegisterBox />}

          <div className="mt-[25px]">
            <div className="h-[1px] w-full bg-[#b2b2b2]"></div>
            {active ? (
              <div className="flex justify-center items-center flex-col mt-[10px]">
                <p className="mb-[10px]">Chưa có tài khoản?</p>
                <Button onClick={() => setActive(false)} variant="success">
                  Tạo tài khoản
                </Button>
              </div>
            ) : (
              <div className="flex justify-center items-center flex-col mt-[10px]">
                <p className="mb-[10px]">Đã có tài khoản?</p>
                <Button onClick={() => setActive(true)} variant="primary">
                  Đăng nhập
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

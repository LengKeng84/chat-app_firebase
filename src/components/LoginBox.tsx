import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Stack } from "react-bootstrap";
import { app } from "../firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotifiModal from "./NotifiModal";
import { MainContext } from "../context/MainProvider";

const LoginBox = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [notifiText, setNotifiText] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  // Login with email
  const auth = getAuth(app);
  const loginWithEmail = () => {
    if (email === "" || password === "") {
      setShowModal(true);
      setNotifiText("Vui lòng nhập email/mật khẩu!");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // navigate
        // ...
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("Lỗi đăng nhập: ", errorCode);

        if (errorCode === "auth/wrong-password") {
          setShowModal(true);
          setNotifiText("Sai mật khẩu!");
        } else if (errorCode === "auth/user-not-found") {
          setShowModal(true);
          setNotifiText("Không tìm thấy người dùng nào!");
        } else if (errorCode === "auth/too-many-requests") {
          setShowModal(true);
          setNotifiText(
            "Lỗi! Gửi yêu cầu quá nhiều và liên tục! Đợi một tí rồi thực hiện lại:(("
          );
        }
        setLoading(false);
      });
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithEmail();
  };
  return (
    <>
      <NotifiModal
        notifiText={notifiText}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Stack gap={3}>
        {/* Title */}
        <h1 className="text-center text-3xl font-bold">Đăng nhập</h1>
        {/* Content */}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-4" controlId="formGroupEmail">
            <Form.Label className="font-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label className="font-semibold">Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="flex justify-center mt-[10px]">
            <Button
              type="submit"
              variant="primary"
              className="w-[150px] h-[40px]"
            >
              {loading ? (
                <div className=" flex justify-center items-center">
                  <AiOutlineLoading3Quarters className="text-[25px] animate-spin" />
                </div>
              ) : (
                <span className="text-[18px]">Đăng nhập</span>
              )}
            </Button>
          </div>
        </Form>
      </Stack>
    </>
  );
};

export default LoginBox;

import { App, Button, Checkbox, Form, Input } from "antd";
import "../style/app.form.scss";
import background from "../img/background.jpg";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { UserContext } from "../context/Context";
import { useContext } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);

  const { message, notification } = App.useApp();
  const navigate = useNavigate();
  // console.log(import.meta.env.VITE_BACKEND_URL);

  const onFinish = async (values) => {
    const { email, password } = values;
    let res = await login(email, password);
    console.log(res);

    Cookies.set("token", res.token);
    Cookies.set("refreshToken", res.refreshToken);

    if (res && res.token) {
      setIsAuthenticated(true);
      setUser(res.employee);
      message.success("Login succeed");
      navigate("/");
    } else {
      notification.error({
        message: "Login failed",
        description: res.message,
        duration: 3,
      });
    }
  };

  return (
    <div
      className="container"
      style={{
        background: `url(${background}) no-repeat center center / cover`,
        height: "100vh",
      }}
    >
      <div className="container-form">
        <h2 className="sign">Sign in</h2>
        <div style={{ color: "#58595A" }}>
          Please enter your account and password to continue
        </div>
        <div>
          <Form
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{ width: 500 }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null} style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  padding: "20px",
                  width: "80%",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

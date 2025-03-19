import { Button, Checkbox, Form, Input } from "antd";
import "../style/app.form.scss";
import background from "../img/background.jpg";

const Login = () => {
  console.log(import.meta.env.VITE_BACKEND_URL);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
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

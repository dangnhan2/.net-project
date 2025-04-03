import { App, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import background from "../img/background.jpg";
import { changePassword } from "../api/api";
const ChangePassword = () => {
  const { message, notification } = App.useApp();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    let res = await changePassword(oldPassword, newPassword, confirmPassword);
    console.log(res);

    if (res && res.statusCode === 200) {
      message.success(res.message);
      navigate("/");
    } else {
      notification.error({
        message: "Action failed",
        description: res.ConfirmPassword ? res.ConfirmPassword[0] : res.message,
        duration: 5,
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
        <h2 className="sign">Change Password</h2>

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
              label="Old Password"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input new password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input confirm password!",
                },
              ]}
            >
              <Input.Password />
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
export default ChangePassword;

//Страница Логина на фронте

import { Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Wrapper } from "./style";
import { useState } from "react";
import {} from "../../Store";
import { useStores } from "../../Store/useStores";

export default () => {
  const [loginV, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const disabled = loginV && password;
  const onClickHandler = () => {
    login.login({ login: loginV, password });
  };
  const { login } = useStores();
  return (
    <Wrapper>
      <div className="form">
        <Input
          size="large"
          placeholder="Логин"
          prefix={<UserOutlined />}
          className="input"
          value={loginV}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input.Password
          size="large"
          placeholder="Пароль"
          prefix={<LockOutlined />}
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          style={{ width: "100%" }}
          type="primary"
          disabled={!disabled}
          onClick={onClickHandler}
        >
          Войти
        </Button>
      </div>
    </Wrapper>
  );
};

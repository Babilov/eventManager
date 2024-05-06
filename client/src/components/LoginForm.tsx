"use client";
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useLogin } from "@/hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = useLogin();

  return (
    <div className={"shadow-2xl p-5 flex flex-col"}>
      <TextField
        label="Почта"
        variant="standard"
        className="mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Пароль"
        variant="standard"
        type="password"
        className={"mb-2"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Typography>{error}</Typography>
      <Button
        variant="outlined"
        onClick={() => login(email, password, setError)}
      >
        Войти
      </Button>
    </div>
  );
};

export default LoginForm;

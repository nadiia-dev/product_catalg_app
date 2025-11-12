"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth";
import "./login-form.scss";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === process.env.NEXT_PUBLIC_ADMIN_LOGIN &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASS
    ) {
      dispatch(login());
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Admin Login</h2>

        <div className="login__field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login__field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="login__error">{error}</p>}

        <button type="submit" className="login__btn">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

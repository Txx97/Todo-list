import { useRouter } from "next/router";
import React, { SyntheticEvent, useContext, useState } from "react";

import { auth } from "../src/Config/Config";
import { UserContext } from "../pages/_app";

const Login = (props) => {
  const router = useRouter();

  const { setUser } = useContext(UserContext);
  
  const navigateTo = (event: SyntheticEvent, url: string) => {
    if (event) {
      event.preventDefault();
    }
    router.push(url);
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<string>("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setUser({
          username: email
        });
        setEmail("");
        setPassword("");
        setLoginError("");
        navigateTo(null, "/");
      })
      .catch((err) => setLoginError(err.message));
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h2>LOGIN HERE</h2>
      <br></br>
      <form autoComplete="off" className="form-group" onSubmit={handleLogin}>
        <label>Enter Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br></br>
        <label>Enter Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br></br>
        <button type="submit" className="btn btn-success mybtn2">
          LOGIN
        </button>
      </form>
      {loginError && <div className="error-msg">{loginError}</div>}

      <span>
        Don't have an account? Create One
        <a
          href="#"
          onClick={(event: SyntheticEvent) => {
            navigateTo(event, "/signup");
          }}
        >
          {" "}
          here
        </a>
      </span>
    </div>
  );
};

export default Login;

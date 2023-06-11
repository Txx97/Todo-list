import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { auth, db } from "../src/Config/Config";

const Signup = (props) => {
  const router = useRouter();

  const navigateTo = (event: SyntheticEvent, url: string) => {
    if (event) {
      event.preventDefault();
    }
    router.push(url);
  };

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [registerationError, setRegisterationError] = useState<string>("");

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection("users")
          .doc(cred.user.uid)
          .set({
            Name: fullName,
            Email: email,
            Password: password,
          })
          .then(() => {
            setFullName("");
            setEmail("");
            setPassword("");
            setRegisterationError("");
            navigateTo(null, "/login");
          })
          .catch((err) => setRegisterationError(err.message));
      })
      .catch((err) => setRegisterationError(err.message));
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h2>REGISTER HERE</h2>
      <br></br>
      <form autoComplete="off" className="form-group" onSubmit={handleRegister}>
        <label>Enter Full Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        <br></br>
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
          REGISTER
        </button>
      </form>
      {registerationError && (
        <div className="error-msg">{registerationError}</div>
      )}

      <span>
        Already have an account? Login
        <a
          href="#"
          onClick={(event: SyntheticEvent) => {
            navigateTo(event, "/login");
          }}
        >
          {" "}
          here
        </a>
      </span>
    </div>
  );
};

export default Signup;

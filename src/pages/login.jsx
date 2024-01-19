import { useState, useEffect } from "react";
import {useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../store/loginSlice";
import { requestLogin } from "../store/loginSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {email, password, isLogged} = useSelector((store) => store.loginSliceReducer);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLogged) {
      navigate("/Admin");
    }
  }, [isLogged]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestLogin({email, password}));    

    if (!isLogged) {
      setTimeout(() => {
        dispatch(setEmail(""));
        dispatch(setPassword(""));
        setErrorMessage("Mauvaise authentification");
      }, 500);
    }
  };


  return (
    <>
      <h1>Connexion</h1>
      <div className="login-form">
        <form action="/" onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <label>Votre adresse mail : </label>
              <input
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}required
              />
            </div>
            <div>
              <label>Votre mot de passe : </label>
              <input
                type="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}required
              />
            </div>
          </fieldset>
          <button type="submit">Connexion</button>
          {errorMessage && <p className="invalid">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
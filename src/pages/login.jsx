import { useState } from "react";
import {useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword } from "../store/loginSlice";
import { requestLogin } from "../store/loginSlice";

function LoginPage() {
  const dispatch = useDispatch(); 
  const {email, password} = useSelector((store) => store.loginSliceReducer);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const preventDefault = (e) => {
    e.preventDefault();
    console.log({ email }, { password });

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return; 
    }

    setEmail("");
    setPassword("");
    setMessage("Merci, vous allez être redirigé vers l'accueil");
  };
  return (
    <>
      <h1>Connexion</h1>
      <div className="login-form">
        <form action="/" onSubmit={(e) => dispatch (requestLogin(email, password))}>
          <fieldset>
            <div>
              <label>Votre adresse mail : </label>
              <input
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
            </div>
            <div>
              <label>Votre mot de passe : </label>
              <input
                type="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
            </div>
          </fieldset>
          <button onClick={preventDefault} type="submit">
            Envoyer
          </button>
          {message && <p className="valid">{message}</p>}
          {!message && errorMessage && (
            <p className="invalid">{errorMessage}</p>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
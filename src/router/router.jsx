import { createBrowserRouter, Link, Outlet } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import GamePage from "../pages/game";
import ContactPage from "../pages/contact";

const Root = () => {
  return (
    <div>
      <header>
        <nav>
          <ul className="router">
            <li>
              <Link to="/Home">Accueil</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <Link to="/">Jeu</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <GamePage />,
      },
      {
        path: "Home",
        element: <HomePage />,
      },
      {
        path: "Login",
        element: <LoginPage />,
      },
      {
        path: "Contact",
        element: <ContactPage />,
      },
    ],
  },
]);

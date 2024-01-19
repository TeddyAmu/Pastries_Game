import "../styles/admin.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestLogout } from "../store/loginSlice";
import { useEffect } from "react";
import { requestPastries } from "../store/pastriesSlice";


function AdminPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.loginSliceReducer.isLogged);

    const { pastries } = useSelector((store) => store.pastriesSliceReducer);

  useEffect(() => {
    dispatch(requestPastries());
  }, []);



    useEffect(() => {
        if (!isLogged) {
          navigate("/Home");
        }
      }, [isLogged]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
          await dispatch(requestLogout());
          console.log("Déconnexion réussie");
        } catch (error) {
          console.error("Erreur lors de la déconnexion:", error.message);
        }    
      };

return (
    <>
      <h1>Admin</h1>

      <div className="home">

      <div className="logout-form">
      <button type="button" onClick={handleLogout}>Déconnexion</button>
      </div>

        <ul className="pastriesList">
          {pastries.length > 0 &&
            pastries.map((pastry, index) => (
              <li key={index}>
                <img src={`/public/${pastry.image}`} alt={pastry.name} />
                <p>
                  {pastry.name} : <span>{pastry.quantity}</span> restant(e)(s)
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

  export default AdminPage;
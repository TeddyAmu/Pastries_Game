import "../styles/admin.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestLogout } from "../store/loginSlice";
import { useEffect } from "react";
import { requestPastries, modifyPastry, deletePastry, addPastry } from "../store/pastriesSlice";


function AdminPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.loginSliceReducer.isLogged);
    const { pastries } = useSelector((store) => store.pastriesSliceReducer);

  useEffect(() => {
    dispatch(requestPastries());
  }, [pastries]);

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


      const handleDelete = (id, name) => {
        try {
          const userConfirmation = window.confirm(
            `Êtes-vous sûr de vouloir supprimer la pâtisserie : ${name} ?`
          );
    
          if (userConfirmation) {
            dispatch(deletePastry(id));
          }
        } catch (error) {
          console.error("Erreur : ", error);
        }
      };
    

      const handleAdd = () => {
        try {
          let name = prompt(
            "Entrez le nom de la pâtisserie : "
          );
          while (name.trim() === "") {
            name = prompt("Donnez un nom à la pâtisserie");
          }
          let quantity = Number(prompt("Combien en voulez-vous ? "));
          while (isNaN(quantity) || quantity <= 0) {
            quantity = Number(prompt("Merci d'entrer un nombre valide"));
          }
          dispatch(addPastry({ name, quantity }));
        } catch (error) {
          console.error("Erreur : ", error);
        }
      };


      const handleModify = (id, name) => {
        try {
          let newName = prompt("Entrez un nom : ");
    
          if (newName === null || newName.trim() === "") {
            newName = name;
          }
    
          let newQuantity = Number(prompt("Entrez la quantité : "));
          while (newQuantity <= 0) {
            newQuantity = Number(prompt("Merci d'entrer une quantité > 0 : "));
          }
    
          dispatch(modifyPastry({ id, newName, newQuantity }));
        } catch (error) {
          console.error("Erreur : ", error);
        }
      };


return (
    <>
      <h1>Admin</h1>

      <div className="home">

      <div className="logout-form">
      <button className="add" type="button" onClick = {handleAdd}>Ajouter une pâtisserie</button>
      </div>

        <ul className="pastriesList">
          {pastries&& pastries.length > 0 &&
            pastries.map((pastry, index) => (
              <li
              key={index}
              id={pastry.id}
              name={pastry.name}
              quantity={pastry.quantity}
              >
                <img src={`/public/${pastry.image}`} alt={pastry.name} />
                <p>
                  {pastry.name} : <span>{pastry.quantity}</span> restant(e)(s)
                </p>
                <div className="add-form">
                <button className="modify" type="button" onClick={() => handleModify(pastry.id, pastry.name)}>Modifier</button>
                <button className="delete" type="button" onClick={() => handleDelete(pastry.id, pastry.name)}>Supprimer</button>
               </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="logout-form">
      <button className="deconnexion" type="button" onClick={handleLogout}>Déconnexion</button>
      </div>
    </>
  );
}

  export default AdminPage;
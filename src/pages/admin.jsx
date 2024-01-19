import "../styles/admin.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestLogout } from "../store/loginSlice";
import { useEffect } from "react";
import { requestPastries, modifyPastry } from "../store/pastriesSlice";


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


      /*const handleDelete = (id) => {
        try {
          const userConfirmation = window.confirm('Voulez vous supprimer la pâtisserie ?');
      
        if (userConfirmation){
          dispatch(deletePastrie(id));
        }
      }
        catch (error) {
          console.error("Erreur:", error.message);
        }    
      };*/

      /*const handleAdd = () => {
        try {
          let name = prompt("Nom de la pâtisserie :");
      
          if (name === null || name.trim() === "") {
            return;
          }
      
          let quantity = Number(prompt("Nombre de pâtisserie : "));
          const addConfirmation = window.confirm("Ajouter ${quantity} ${name} ?");
      
          if (addConfirmation) {
            dispatch(addPastry({ name, quantity }));
          }
        } catch (error) {
          console.error("Erreur: ", error.message);
        }
      };*/


      const handleModify = (id, name) => {
        try {
          let newName = prompt("Entrez le nouveau nom : ");
    
          if (newName === null || newName.trim() === "") {
            newName = name;
          }
    
          let newQuantity = Number(prompt("Entrez la nouvelle quantité : "));
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
      <button className="add" type="button" >Ajouter une pâtisserie</button>
      </div>

        <ul className="pastriesList">
          {pastries.length > 0 &&
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
                <button className="delete" type="button">Supprimer</button>
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
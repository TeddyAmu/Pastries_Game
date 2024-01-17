import React, { useEffect } from "react";
import { requestPastries } from "../store/pastriesSlice";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();
  const { pastries } = useSelector((store) => store.pastriesSliceReducer);

  useEffect(() => {
    dispatch(requestPastries());
  }, []);

  return (
    <>
      <div className="home">
        <h1>Tenter de remporter des pâtisseries !</h1>
        <a href="/">JOUER</a>
        <h3>Pâtisseries restantes :</h3>

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

export default HomePage;
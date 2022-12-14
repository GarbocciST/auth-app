import { useDispatch, useSelector } from "react-redux";
import { logout, startLogout } from "../../store/auth"


export const JournalPage = () => {
  const {displayName, email} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => { 
    dispatch(startLogout());
  }

  return (
    <>
      <div>
        <div className="m-2">
          <h1>JournalPage</h1>
          <hr />
          <h4>Bienvenido {displayName}</h4> 
          <h6>Su mail es: {email}</h6> 
        </div>

        <button className="btn btn-primary m-2" onClick={onLogout}>Regresar</button>
      </div>
    </>
  )
}

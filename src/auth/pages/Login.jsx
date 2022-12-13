import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleSignIn, startSingInWithEmailPassword } from '../../store/auth';
import { ErrMsg } from './';


export const Login = () => {
  const {status, errorMessage} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const isAutheticating = useMemo( () => status === 'checking', [status])

  const {register, formState: {errors}, reset, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmitted = (data) => {

    dispatch(startSingInWithEmailPassword(data))
    reset({
      email: '',
      password: '',
    })
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }


  return (
    <div className="contenedor d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmitted)} className=" rounded p-4 p-sm-3">
        <span>Email</span>
        <input type="text" 
        name="email"
        className="d-block form-control mt-2" 
        placeholder="Ingresar Email"
        {...register("email", { required: "correo electronico es requerido" })}
        aria-invalid={errors?.email ? "true" : "false"}  
        />
        {errors?.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>}


        <p className="parrafo mt-3">Password</p>
        <input type="password"
        name="password" 
        className="d-block form-control mt-2" 
        placeholder="Ingresar Contraseña"
        {...register("password", { required: "contraseña es requerida" })}
        aria-invalid={errors?.password ? "true" : "false"} 
        />
        {errors?.password && <span className="text-danger text-small d-block mb-2">{errors.password.message}</span>}

        <button disabled={isAutheticating} className="btn btn-light mt-2">Login</button>
        <button onClick={onGoogleSignIn} disabled={isAutheticating} className="boton btn btn-primary mt-2">Google Sign</button>
        <ErrMsg errorMessage={errorMessage} />
        <Link to="/auth/register" className=" btn-link mt-1 d-flex">¿no tienes cuenta?</Link>
      </form>
    </div>
  )
}

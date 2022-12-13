import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { ErrMsg } from './';


export const Register = () => {
  
  const {status, errorMessage} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const isAutheticating = useMemo( () => status === 'checking', [status])

  const {register, formState: {errors}, reset, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    }
  });

  const onSubmitted = (data) => {

    dispatch(startCreatingUserWithEmailPassword(data)); 
    reset({
      email:'',
      password: '',
      displayName: '',
    })
  }

  return (
    <div className="contenedor d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmitted)} className=" rounded p-4 p-sm-3">
        <span>Nombre completo</span>
        <input type="text" 
        name="displayName"
        className="d-block form-control mt-2" 
        placeholder="Ingresar Nombre completo"
        {...register("displayName", { 
            required: "nombre completo es requerido",
          }
        )}
        aria-invalid={errors?.displayName ? "true" : "false"}  
        />
        {errors?.displayName && <span className="text-danger text-small d-block mb-2">{errors.displayName.message}</span>}

        
        <p className="parrafo mt-3">Email</p>
        <input type="text" 
        name="email"
        className="d-block form-control mt-2" 
        placeholder="Ingresar Email"
        {...register("email", { 
            required: "correo electrónico es requerido",
            pattern :{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "correo electrónico no valido"
            } 
          }
        )}
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


       
        <button className="btn btn-light mt-2" disabled={isAutheticating}>Crear Cuenta</button>
        <ErrMsg errorMessage={errorMessage} />
        <Link to="/auth/login" className=" btn-link mt-1 d-flex">poseo una cuenta</Link>

      </form>
    </div>
  )
}

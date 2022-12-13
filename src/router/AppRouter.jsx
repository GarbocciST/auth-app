import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FirebaseAuth } from '../firebase/config';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { login, logout } from '../store/auth';
import { CheckingAuth } from '../components';


export const AppRouter = () => {
  
  const {status} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    
    onAuthStateChanged( FirebaseAuth, async(user) => {
      if (!user?.uid) return dispatch( logout() );
      
      const { uid, displayName, email, photoURL } = user;

      dispatch(login({ uid, displayName, email, photoURL}));
    });
  
  }, []);

  if (status === 'checking') {
    return <CheckingAuth />
  }
  
    
  return (
    <Routes>
        
        { 
            (status === 'authenticated') 
              ? <Route path="/*" element={<JournalRoutes />} /> 
              : <Route path="/auth/*" element={<AuthRoutes />} /> 
        }
        
        <Route path="/*" element={<Navigate to="/auth/login" />} />

    </Routes>
  )
}

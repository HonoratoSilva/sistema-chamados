import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import PrivateOutlet from './PrivateOutlet';

const Dashboard = React.lazy(() => import('../pages/Dashboard'))

const Rotas = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={<PrivateOutlet />}>
                <Route path='/dashboard' element={
                <Suspense fallback={<div>Loading....</div>}>
                    <Dashboard />
                </Suspense>
                } />
            </Route>

            <Route path='/' element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />
        </Routes>
    )
}

export default Rotas;
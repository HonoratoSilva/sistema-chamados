import React from "react";
import { Navigate, Outlet } from 'react-router-dom';

function PrivateOutlet () {
    
    const signed = true;

    return signed ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateOutlet;
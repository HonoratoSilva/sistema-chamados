import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import { FcHome, FcSettings, FcButtingIn } from "react-icons/fc";
import './header.css';

function Header () {
    const { user } = useContext(AuthContext);

    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl || avatar} alt='Avatar' />
            </div>

            <Link to="/dashboard">
                <FcHome size={24} />
                Chamados
            </Link>

            <Link to="/costumers">
                <FcButtingIn size={24} />
                Clientes
            </Link>

            <Link to="/profile">
                <FcSettings size={24} />
                Configurações
            </Link>
        </div>
    )
}

export default Header;
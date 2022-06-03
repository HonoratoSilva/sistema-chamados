import { useState, useEffect, createContext, useCallback } from 'react';
import { db, auth } from '../services/firebaseConnection';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadStorage = useCallback(() => {
        const storeUser = localStorage.getItem('sistema');

        if(storeUser) {
            const userParsed = JSON.parse(storeUser);
            setUser(userParsed);
            navigate('/dashboard');
        }
        setLoading(false);
    }, [navigate]);

    useEffect(() => {
        loadStorage();
    }, [loadStorage]);

    useEffect(() => {
        if(user){
            navigate('/dashboard')
        }
    }, [navigate, user]);

    //CADASTRAR NOVO USER

    async function signUp(email, password, name) {
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password).then( async (userCredential) => {
            let uid = userCredential.user.uid;

            await setDoc(doc(db,'user', uid), {
                nome: name,
                avatarUrl: null
            }).then(() => {
                let data = {
                    uid,
                    name,
                    email: userCredential.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
            }).catch((error) => {
                toast.error('Ocorreu algum erro ao cadastrar o usuário!');
                console.error(error);
            }).finally(() =>{
                setLoadingAuth(false);
            })
        });
    };

    //DESLOGAR USER
    function logout() {
        signOut(auth).then(() => {
            toast.success('Usuário deslogado com sucesso');
            localStorage.removeItem('sistema');
            setUser(null);
        }).catch((error) => {
            toast.error('Erro ao deslogar usuário');
            console.error(error);
        })
    };

    //LOGAR USER
    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
           
            const {user: { uid }} = userCredential;

            getDoc(doc(db, 'user', uid)).then((userInfo) => {
                const userInfoData = userInfo.data();

                const data = {
                    uid,
                    name: userInfoData.nome,
                    email,
                    avatarUrl: userInfoData.avatarUrl
                };

                setUser(data);
                storageUser(data);
                toast.success('Bem-Vindo a plataforma');
            }).catch((err) => {
                toast.error('Ocorreu um erro ao acessar os dados do usuário');
                console.error(err);
            })

        }).catch((error) => {
            toast.error('Ocorreu um erro ao logar o usuário!');
            console.error(error);
        }).finally(() => setLoadingAuth(false));
    }

    function storageUser(data){
        const userStringify = JSON.stringify(data);
        localStorage.setItem('sistema', userStringify);
    }
    
    return(
        <AuthContext.Provider value={{ signed: !!user,  user, loading, signUp, logout, signIn, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
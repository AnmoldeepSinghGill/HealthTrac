import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
    }, []);

  
        const user = loadUser;
      
  
    
    return (
        
        <div>
            <h1>Home Screen</h1>
           
        </div>
    );
};

export default Home;
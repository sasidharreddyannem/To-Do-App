import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);


    const logoutHandler = async () => {
        setLoading(true);
        try {
          await axios.get('http://localhost:4000/api/v1/users/logout', {
            withCredentials: true,
          });
    
          toast.success("Logged Out Successfully");
          setIsAuthenticated(false);
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
          setIsAuthenticated(true);
          setLoading(false);
        }
      };

  return (
    <nav className='header'>
        <div>
            <h2>Todo App</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {isAuthenticated ? (
          <button onClick={logoutHandler} disabled={loading} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
           
        </article>
    </nav>
  )
}

export default Header
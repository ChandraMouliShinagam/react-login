import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import api from '../../utils/axiosAPI';
// import { useHistory } from 'react-router-dom';

export default function SignInPage() {

    // const history = useHistory();
    
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            
            var body = {
                'password': e.target.password.value,
                'email': e.target.email.value
            }
    
            await api.post('/verifyUser', body).then(res => {
                console.log(res)
                window.location.href = 'http://localhost:3000/home';
            }).catch(err => {
                console.log(err)
                alert(err.response.data)
            })
        } catch (err) {
             console.log(err.mesaage)
        }
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handleLogin}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="email" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

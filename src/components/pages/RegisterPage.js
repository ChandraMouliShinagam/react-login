import React from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/axiosAPI'
import { useHistory } from 'react-router-dom'

import '../../App.css'

export default function SignUpPage() {

    const history = useHistory();

    const handleResgister = async (e) => {
        try {
            e.preventDefault();
            console.log(e.target.first_name)
            
            var body = {
                'name': e.target.first_name.value,
                'mobile': e.target.mobile.value,
                'password': e.target.password.value,
                'email': e.target.email.value
            }
    
            const res = await api.post('/addUser', body);
            if(res.status === 200) {
                alert('Registered Sucessfully...!')
                history.push('/login')
            } else {
                alert('something went wrong...');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleResgister}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Mobile</label><br/>
                    <input type="text" name="mobile" required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" requiredc />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}

import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import '../../App.css'
import api from '../../utils/axiosAPI'

export default function ForgetPasswordPage() {

    const history = useHistory();

    let [isCodeVerified, setIsCodeVerified] = useState(false);
    let [isEmailVerified, setIsEmailVerified] = useState(false);

    let [email, setEmail] = useState(null);

    useEffect(() => {
        console.log(email);
    }, [email])
    

    const handleEmailVerification = async (e) => {
        e.preventDefault();

        try {
            if(!email) setEmail(e.target.email.value);
            let data = {
                email
            }

            if(isEmailVerified) {
                data.code = e.target.code.value;
                await api.post('/verifyResetCode', data).then(res => {
                    setIsCodeVerified(true);
                }).catch(err => {
                    alert(err.response.data);
                })
            } else {
                await api.post('/sendResetCode', data).then(res => {
                    console.log(res)
                    setIsEmailVerified(true)
                }).catch(err => {
                    alert(err.response.data);
                })
            }
    
        } catch (err) {
            console.log(err.message);
        }

    }

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
            let new_pw = e.target.new_pw.value;
            let conf_pw = e.target.conf_pw.value;

            if(new_pw !== conf_pw) {
                alert("password doesn't match");
                return;
            }
            
            let data = {
                email,
                password: new_pw
            }
            console.log(data);

            await api.post('/resetPassword', data).then(res => {
                alert('password updated sucessfully proceed to login.')
                history.push('/login')
            }).catch(err => {
                alert(err.response.data);
            })

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>{ !isCodeVerified ? "Enter your email address and we will send you a reset code" : "Enter your new password"}</h5>
            
            {
                isCodeVerified ?
                <form onSubmit={handlePasswordReset}>
                    <p>
                        <label id="new_password">New Password</label><br/>
                        <input type="password" name="new_pw" required />
                    </p>
                    <p>
                        <label id="confirm_password">Confirm Password</label><br/>
                        <input type="password" name="conf_pw" required />
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Reset Password</button>
                    </p>
                </form> :

                <form onSubmit={handleEmailVerification}>
                    <p>
                        <label id="reset_email_lbl">Email address</label><br/>
                        <input type="email" name="email" required />
                    </p>
                    {
                        isEmailVerified && 
                        <p>
                            <label id="reset_code_lbl">Enter Verification Code</label><br/>
                            <input type="text" name="code" required />
                        </p>
                    }
                    <p>
                        <button id="sub_btn" type="submit">Send password reset email</button>
                    </p>
                </form>
              

            }
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

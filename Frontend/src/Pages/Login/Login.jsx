import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext';
import './loginStyles.css'

function Login() {
    let { loginUser } = useContext(AuthContext);

    return (
        <>
            <div className="outlet">
                <div className="leftSide">
                    <div className="logo"> Regalia </div>
                    <div className="fr">
                        <div className="text">
                            <div className="text-head">Responsibly crafted jewellery</div>
                            <div className="text-small">True Luxury in jewellery</div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="log-head">
                        <div className="log">Log into your account</div>
                        <div className="acc">Don't have an account? <a href="/signup">Sign Up</a></div>
                        <div className ="pwd">Forgot your password? <a href="/forgotpassword">Reset Password</a></div>
                    </div>

                    <div className="mid">
                        <div className="inWith">Log in with</div>
                        <div className="social-login">
                            <div className="box1"></div>
                            <div className="box1"></div>
                            <div className="box1"></div>
                        </div>
                        <div className="divider">
                            <div className="line"></div>
                            <div className="or">OR</div>
                            <div className="line"></div>
                        </div>
                    </div>


                    <div className="form">
                        <form action="" onSubmit={loginUser}>
                            <div className="entry">
                                <label>Email:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="text"
                                    name="email"
                                />
                            </div>
                            <div className="entry">
                                <label>Password:</label>
                                <input
                                    className="border-2 border-black rounded-md"
                                    type="password"
                                    name="password"
                                />
                            </div>
                            {/* <div className="rem">
                                <input type="checkbox" className='cb' />
                                <label>Remember me</label>
                            </div> */}
                            {/* <div className="FPass">Forgot Password?</div> */}
                            <div className="btn">
                                <button type='submit'>Log In</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Login
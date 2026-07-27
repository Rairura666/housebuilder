import { Link } from 'react-router-dom'
import { useSignup } from '../model/useSignUp'
import "./SignUpPage.css"

export const SignUpPage = () => {

    const { email, setEmail, password, setPassword, handleSignUpSubmit } = useSignup()

    return (<>
        <div className="signUpWrapper">
            <div className="signUpContent">
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    type='text'
                    value={""}
                    onChange={()=>{}}
                    placeholder='Username'
                />

                <input
                    placeholder="Password"
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignUpSubmit}
                >Sign up</button>

                <div className="signInRedirectToSignIn">
                    <span>Already have an account?</span>
                    <Link to="/signin">Sign in</Link>
                </div>
            </div>
        </div>
    </>)
}
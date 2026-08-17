import { Link } from 'react-router-dom'
import { useSignIn } from '../model/useSignIn'
import "./SignInPage.css"

export const SignInPage = () => {

    const { email, setEmail, password, setPassword, handleSignInSubmit, isSignInFailed } = useSignIn()

    return (<>
        <div className="signInWrapper">
            <div className="signInContent">
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    placeholder="Password"
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSignInSubmit}
                >Sign in</button>

                {isSignInFailed && 
                <span className='signInErrorMessage'>Invalid email or password</span>
                }


                <div className="signInRedirectToSignUp">
                    <span>Don't have an account yet?</span>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    </>)
}
import { Link } from 'react-router-dom'
import { useSignup } from '../model/useSignUp'
import "./SignUpPage.css"

export const SignUpPage = () => {

    const signUpErrorMessages: Record<string, string> = {
        user_already_exists: "User already exists",
        email_address_invalid: "Invalid email address",
        weak_password: "Password must be at least 6 characters"
    }

    const { email, setEmail, password, setPassword, username, setUsername, handleSignUpSubmit, signUpError } = useSignup()

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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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

                {signUpError && (
                    <div className="signUpErrorMessage">
                        {signUpErrorMessages[signUpError] ?? "Something went wrong. Please try again."}
                    </div>
                )}

                <div className="signUpRedirectToSignIn">
                    <span>Already have an account?</span>
                    <Link to="/signin">Sign in</Link>
                </div>
            </div>
        </div>
    </>)
}
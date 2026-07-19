import { useSignup } from '../model/useSignUp'

export const SignUpPage = () => {
        
    const {email, setEmail, password, setPassword, handleSignUpSubmit} = useSignup()

    return (<>
    <input
    type='email'
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="email"
    />

    <input
    placeholder="password"
    value={password}
     onChange={(e) => setPassword(e.target.value)}
    />

    <button
    onClick={handleSignUpSubmit}
    >sign up</button>
    </>)
}
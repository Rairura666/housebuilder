import { useSignIn } from '../model/useSignIn'

export const SignInPage = () => {

    const { email, setEmail, password, setPassword, handleSignInSubmit } = useSignIn()

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
            onClick={handleSignInSubmit}
        >sign in</button>
    </>)
}
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => signIn('google')}>Login with Google</button>
    </div>
  );
}

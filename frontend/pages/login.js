import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '../components/ErrorBoundary';

function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() =>{
    if (mounted && status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [mounted, status, router]);

  if (!mounted || status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated' && !session) {
    // Se status for "authenticated" mas session for indefinido, isso é um erro.
    return <p>Session data is missing!</p>;
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>Login with Google</button>
    </div>
  );
}
const LoginWithErrorBoundary = dynamic(
  () => Promise.resolve((props) => (
    <ErrorBoundary>
      <Login {...props} />
    </ErrorBoundary>
  )),
  { ssr: false }
);

export default LoginWithErrorBoundary;
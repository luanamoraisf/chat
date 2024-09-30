import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '../components/ErrorBoundary';

function Login() {
  const { status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [mounted, status, router]);

  if (!mounted || status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    // Se status for "authenticated" mas session for indefinido, isso é um erro.
    return <p>Session data is missing!</p>;
  }

  return (
    <div className="text-center">
      <h2 className='text-4xl font-serif mb-11 mt-11'>Login</h2>
      <button className='bg-violet-300 border-8 border-violet-300 rounded hover:bg-violet-400 hover:border-violet-400' onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
        Login with Google
      </button>
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

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
  
}


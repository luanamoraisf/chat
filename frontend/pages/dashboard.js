import { getSession, signOut } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const Dashboard = ({ session }) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      <h1>Bem-vindo, {session.user.name}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

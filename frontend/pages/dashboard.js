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
    <div className='text-right'>
      <button className='bg-violet-300 border-4 border-violet-300 hover:bg-violet-400 hover:border-violet-400 rounded' onClick={handleLogout}>Logout</button>
      <h1 className='mb-28 text-center text-2xl'>Bem-vindo, {session.user.name}!</h1>
   
      <div className="relative top-96 flex justify-center ">
        <input className="w-3/5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Digite aqui..."></input>

        <button
          class="absolute right-96 top-1 rounded bg-violet-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-violet-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Enter
        </button>
      </div>
    </div>

  );
};

export default Dashboard;

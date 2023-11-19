import Cookies from 'cookies';
import JSCookie from 'js-cookie';
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()

  let id, username;

  const Login = () => {
    const userInfo = {
      id: id, username: username
    }
    JSCookie.set('name', JSON.stringify(userInfo));
    router.push('/dashboard');
    // loginName(id, username);


  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24`}
    >


      <div className={`container-square w-[304px]`}>
        <div className={`font-bold text-[#537178] mb-[24px]`}>
          Login
        </div>

        <input onChange={e => { id = e.target.value }} className={`w-full bg-[#EEF1F8] text-[14px] rounded-[8px] font py-[9px] px-[14px] input-text mb-[12px]`} placeholder='Id' type="text" />

        <input onChange={e => { username = e.target.value }} className={`w-full bg-[#EEF1F8] text-[14px] rounded-[8px] py-[9px] px-[14px] input-text mb-[12px]`} placeholder='Name' type="text" />

        <button onClick={e => { Login() }} className={`w-full rounded-[8px] text-[14px] bg-[#5285EC] text-white py-[11px]`}>Login</button>

      </div>


    </main>
  )
}


Home.getInitialProps = async ({ req, res }) => {
  // Create a cookies instance
  const cookies = new Cookies(req, res)

  if (req && cookies && cookies.get('name')) {
    await res.writeHead(301, {
      Location: `/dashboard`,
    });
    await res.end();

  } else {
    return { modal: true }

  }
}
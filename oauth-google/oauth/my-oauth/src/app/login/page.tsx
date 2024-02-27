'use client';
import { Session } from "next-auth"
import { signIn, useSession, SessionProvider } from "next-auth/react"
interface Props {
    session: Session | null
    children: React.ReactNode
  }
const Page: React.FC <Props> = ({ children, session } ) => {
    return (
        <SessionProvider session={session}>
            <Content />
        </SessionProvider>
    )
}

function Content() {
    const { data: session } = useSession();

    const handleClickLoginGG = () => {
        signIn('google');
    }

    // Lấy thông tin email của người dùng nếu có
    let userEmail = null;
    if (session && session.user && session.user.email) {
        userEmail = session.user.email;
    }

    return (
        <div>
            {userEmail ? (
                <p>Email của người dùng: {userEmail}</p>
            ) : (
                <button onClick={handleClickLoginGG}>LOGIN GOOGLE</button>
            )}
        </div>
    )
}
export default Page;
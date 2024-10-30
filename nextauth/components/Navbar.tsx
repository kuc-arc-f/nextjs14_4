import { getServerSession } from "next-auth/next";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div>
            <a href="/" className="text-xl font-bold">
              サイト名
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span>
                  ようこそ {session.user?.name || session.user?.email}さん
                </span>
                <LogoutButton />
              </>
            ) : (
              <a
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                ログイン
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
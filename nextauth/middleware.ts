// middleware.ts

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", // 未認証の場合のリダイレクト先
  },
});

export const config = {
  matcher: ['/((?!api|signin|_next).*)'], //認証例外　api, signin, etc
};


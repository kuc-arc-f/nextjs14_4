import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('メールアドレスとパスワードが必要です');
        }
        console.log("AUTH_USER_MAIL=", process.env.AUTH_USER_MAIL);
        console.log("AUTH_USER_ID=", process.env.AUTH_USER_ID);
        //console.log("AUTH_PASSWORD=", process.env.AUTH_PASSWORD);

        const matched =
        credentials?.email === process.env.AUTH_USER_MAIL && 
        credentials?.password === process.env.AUTH_PASSWORD

        console.log("matched=", matched);
        if (!matched) {
          throw new Error('パスワードが正しくありません');
        }else{
          return {
            id: process.env.AUTH_USER_ID,
          }
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
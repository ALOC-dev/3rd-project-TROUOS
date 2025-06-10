import NextAuth from "next-auth/next"; 
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; //ID,PW 형태의 인증을 가능하게 해주는 provider
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, //jwt 서명 키. 쿠키 안전을 위해 필요
  session: {
    strategy: "jwt"
  },
  //인증 방식 등록 : credentials 사용
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //userId, password 입력 검사
        if (!credentials?.userId || !credentials?.password) return null;

        const user = await prisma.user.findUnique({ //DB에서 조회
          where: { userId: credentials.userId },
        });
        if (!user) throw new Error("존재하지 않는 ID입니다.");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("비밀번호가 틀렸습니다.");

        return { id: user.id.toString(), name: user.name }; //성공 시 id, name 객체 반환. callback의 인자로 넘어감감
      },
    }),
  ],
  callbacks: {
    //로그인 성공하면 user.id를 token에 추가가
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    //클라이언트가 useSession() 할 때마다 실행.
    //token.id를 session.user.id에 추가가
    async session({ session, token }) {
      if (token.id) session.user.id = token.id;
      return session;
    },
  },
};

//handler 생성 및 export. 인증 관련 요청 내부적으로 처리
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
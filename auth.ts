import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 認証プロバイダーにGitHubを追加する
  providers: [
    GitHub({
      // GitHub のアカウント情報で使用するものを指定する
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, profile, user }) {
      // 初回サインイン時にprofileからtokenにデータをコピー
      if (user && profile) {
        token.id = profile.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        // GitHubの一意のIDをセッションに追加
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

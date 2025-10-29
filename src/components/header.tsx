import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "../../auth";
import UserAvatar from "./user-avatar";
import SignInButton from "./sign-in-button";

const navItems = [
  { label: "ホーム", href: "/" },
  { label: "クエスト", href: "/quests" },
  //   { label: "使い方", href: "/how-to-submit" },
];

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-purple-100 to-background backdrop-blur-md">
      <div className="container mx-auto px-4 py-8 flex items-center justify-between">
        {/* ロゴとタイトル */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-3xl">🫐⚔️</span>
          <span className="text-xl font-bold">Blueberry Quest</span>
        </Link>

        {/* ナビゲーション */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <Button
                variant="ghost"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                {item.label}
              </Button>
            </Link>
          ))}

          {/* <Link href="/how-to-submit">
            <Button
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950"
            >
              使い方
            </Button>
          </Link> */}
          <div className="ml-auto flex items-center space-x-4">
            {session?.user ? (
              <UserAvatar />
            ) : (
              <SignInButton className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950" />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

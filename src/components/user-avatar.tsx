import Image from "next/image";
import { auth, signOut } from "../../auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          width={40}
          height={40}
          src={session.user.image!}
          alt="User Avatar"
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">ログアウト</button>
          </form>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { useUserStore } from "@/lib/userManager";
import Link from "next/link";

const UserHeader = () => {
  const profile = useUserStore((state) => state.profile);

  return (
    <div className="ad-card-container">
      {profile ? (
        <Link href="/user/me">Hello {profile.mail}!</Link>
      ) : (
        <Link href="/login">Care to log in ?</Link>
      )}
    </div>
  );
};

export default UserHeader;

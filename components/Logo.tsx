import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href={"/"}
      className="hover:opacity-75 transition-all items-center gap-x-2 hidden md:flex"
    >
      <Image src="/logo.png" alt="logo" height={25} width={25} />
      <p className={`text-lg pb-1 ${className}`}>Trullo</p>
    </Link>
  );
};

export default Logo;

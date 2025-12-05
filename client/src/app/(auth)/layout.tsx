import Link from "next/link";
import { IconBook } from "@tabler/icons-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full" />
        <div className="absolute top-1/4 right-12 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute bottom-1/4 left-16 w-12 h-12 bg-white/10 rounded-full" />

        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-3 text-3xl font-heading font-semibold text-white"
        >
          <IconBook size={40} />
          RentABook
        </Link>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg-main">
        {children}
      </div>
    </div>
  );
}

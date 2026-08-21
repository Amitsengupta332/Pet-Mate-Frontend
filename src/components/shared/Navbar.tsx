"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Dog, Menu, User, LogOut, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { getUser, logoutUser } from "@/services/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; role?: string; email?: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // 👈 পেজ পাথ ট্র্যাক করার জন্য

useEffect(() => {
  const getCurrentUser = async () => {
    const userdata = await getUser();
    console.log("Current User in Navbar:", userdata); // 👈 ব্রাউজার কনসোলে আউটপুট চেক করুন
    setUser(userdata);
  };
  getCurrentUser();
}, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    const role = user.role?.toLowerCase();
    if (role === "admin") return "/admin";
    if (role === "sitter") return "/sitter/dashboard";
    return "/dashboard";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Dog className="h-6 w-6 text-orange-500" />
          <span>PetMate</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href="/sitters"
            className="transition-colors hover:text-primary"
          >
            Find Sitters
          </Link>
          <Link
            href="/about-us"
            className="transition-colors hover:text-primary"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium border border-input bg-background rounded-full hover:bg-accent hover:text-accent-foreground gap-2 transition-colors cursor-pointer outline-none">
                <User className="h-4 w-4" />
                <span className="capitalize">{user.name || "User"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="capitalize">
                    {user.name} ({user.role?.toLowerCase() || "user"})
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={getDashboardLink()}>
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="flex items-center gap-2 text-lg font-bold text-primary mb-4">
                <Dog className="h-5 w-5 text-orange-500" /> PetMate
              </SheetTitle>

              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/sitters"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Find Sitters
                </Link>
                <Link
                  href="/about-us"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Contact
                </Link>

                <div className="border-t pt-4 mt-2 flex flex-col gap-2">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-muted-foreground capitalize">
                        Logged in as <span className="font-semibold text-foreground">{user.name}</span>
                      </p>
                      <Link href={getDashboardLink()} onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                        variant="destructive"
                        className="w-full justify-start gap-2"
                      >
                        <LogOut className="h-4 w-4" /> Log out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                      >
                        <Button className="w-full">Register</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
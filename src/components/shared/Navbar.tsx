"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Dog,
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  Loader2,
} from "lucide-react";

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
  const [user, setUser] = useState<{
    name?: string;
    role?: string;
    email?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      try {
        const userdata = await getUser();
        setUser(userdata);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    setUser(null);
    setIsOpen(false);
    router.push("/login");
    router.refresh();
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    return "/dashboard";
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Find Sitters", href: "/sitters" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Dog className="h-6 w-6 text-orange-500" />
          <span>PetMate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-orange-500 ${
                pathname === link.href
                  ? "text-orange-500 font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth / Profile */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-24 bg-accent/60 animate-pulse rounded-full flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium border border-input bg-background rounded-full hover:bg-accent gap-2 transition-colors cursor-pointer outline-none">
                <User className="h-4 w-4" />
                <span className="capitalize">{user.name || "User"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="capitalize text-xs">
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
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              aria-label="Toggle Menu"
              className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background p-2 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex flex-col justify-between w-[280px] p-6"
            >
              <div className="flex flex-col gap-6">
                <SheetTitle className="flex items-center gap-2 text-lg font-bold text-primary">
                  <Dog className="h-5 w-5 text-orange-500" /> PetMate
                </SheetTitle>

                {/* Mobile Menu Links (No Arrow Icons) */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-orange-50 text-orange-600 font-semibold dark:bg-orange-950/40 dark:text-orange-400"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Bottom Auth Buttons */}
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                {loading ? (
                  <div className="h-9 w-full bg-accent/60 animate-pulse rounded-md flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                ) : user ? (
                  <div className="flex flex-col gap-2">
                    <div className="px-3 py-2 rounded-md bg-muted/40 border text-xs">
                      <p className="text-muted-foreground text-[10px]">Signed in as</p>
                      <p className="font-semibold text-foreground truncate capitalize">
                        {user.name || "User"}
                      </p>
                    </div>
                    <Link href={getDashboardLink()} onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2 h-9 text-xs">
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full h-9">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full h-9 bg-orange-500 hover:bg-orange-600 text-white">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Dog,
  LayoutDashboard,
  PawPrint,
  Calendar,
  User,
  Users,
  Briefcase,
  FolderTree,
  Home,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { getUser } from "@/services/auth";

// Pass icons as JSX elements (<Icon />) to match NavMain's ReactNode expectation
const navConfigs = {
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Manage Users",
      url: "/dashboard/users",
      icon: <Users className="size-4" />,
    },
    {
      title: "All Bookings",
      url: "/dashboard/bookings",
      icon: <Calendar className="size-4" />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <FolderTree className="size-4" />,
    },
  ],
  sitter: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Manage Requests",
      url: "/dashboard/bookings",
      icon: <Calendar className="size-4" />,
    },
    {
      title: "My Services & Rates",
      url: "/dashboard/services",
      icon: <Briefcase className="size-4" />,
    },
    {
      title: "My Profile",
      url: "/dashboard/profile",
      icon: <User className="size-4" />,
    },
  ],

  owner: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "My Pets",
      url: "/dashboard/pets",
      icon: <PawPrint className="size-4" />,
      items: [
        {
          title: "All Pets",
          url: "/dashboard/pets",
        },
        {
          title: "Add New Pet",
          url: "/dashboard/addPets",
        },
      ],
    },
    {
      title: "My Bookings",
      url: "/dashboard/bookings",
      icon: <Calendar className="size-4" />,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: <User className="size-4" />,
    },
  ],
  // owner: [
  //   {
  //     title: "Dashboard",
  //     url: "/dashboard",
  //     icon: <LayoutDashboard className="size-4" />,
  //   },
  //   {
  //     title: "Pets",
  //     url: "/dashboard/pets",
  //     icon: <PawPrint className="size-4" />,
  //   },
  //   {
  //     title: "My Bookings",
  //     url: "/dashboard/bookings",
  //     icon: <Calendar className="size-4" />,
  //   },
  //   {
  //     title: "Profile",
  //     url: "/dashboard/profile",
  //     icon: <User className="size-4" />,
  //   },
  // ],
};

interface UserType {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: UserType | null;
}

export function AppSidebar({ user: initialUser, ...props }: AppSidebarProps) {
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    initialUser || null,
  );

  useEffect(() => {
    if (!initialUser) {
      const fetchUser = async () => {
        const data = await getUser();
        setCurrentUser(data);
      };
      fetchUser();
    }
  }, [initialUser]);

  const role = currentUser?.role?.toLowerCase() as
    | "admin"
    | "sitter"
    | "owner"
    | undefined;

  const navItems =
    role && navConfigs[role] ? navConfigs[role] : navConfigs.owner;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Removed asChild prop to fix DOM button warning */}
            <SidebarMenuButton size="lg">
              <Link href="/" className="flex items-center gap-2 w-full">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                  <Dog className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PetMate</span>
                  <span className="truncate text-xs capitalize text-muted-foreground">
                    {role || "Dashboard"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <SidebarMenu className="mb-2">
          <SidebarMenuItem>
            {/* Removed asChild prop */}
            <SidebarMenuButton tooltip="Back to Website">
              <Link href="/" className="flex items-center gap-2 w-full">
                <Home className="size-4" />
                <span>Main Website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <NavUser
          user={{
            name: currentUser?.name || "User",
            email: currentUser?.email || "user@petmate.com",
            avatar: currentUser?.avatar || "",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}


"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Bot,
  Briefcase,
  Calendar,
  Inbox,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Settings,
  Users,
  Vault,
  ChevronsLeft,
  ChevronsRight,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/rebecca", label: "Rebecca", icon: Bot },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/vault", label: "Vault", icon: Vault },
  { href: "/media", label: "Media", icon: ImageIcon },
  { href: "/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/60"
    >
      <SidebarHeader className="h-16 flex items-center justify-between p-2">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-primary [text-shadow:0_0_10px_hsl(var(--primary))]" />
          <span
            className={cn(
              "font-bold text-lg text-primary [text-shadow:0_0_10px_hsl(var(--primary))] transition-opacity duration-200",
              state === "collapsed" && "opacity-0 hidden"
            )}
          >
            ISHE HQ
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === href}
                tooltip={{ children: label }}
                className="aria-[current=page]:text-primary aria-[current=page]:[text-shadow:0_0_10px_hsl(var(--primary))]"
                aria-current={pathname === href ? "page" : undefined}
              >
                <Link href={href}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter className="p-2">
        <Button
            variant="ghost"
            className="w-full justify-center"
            onClick={toggleSidebar}
        >
            {state === 'expanded' ? <ChevronsLeft /> : <ChevronsRight />}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

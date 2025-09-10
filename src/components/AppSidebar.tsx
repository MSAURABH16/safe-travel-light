import { 
  Home, 
  LayoutDashboard, 
  MapPin, 
  Accessibility, 
  UtensilsCrossed, 
  Shield, 
  Stethoscope, 
  Wifi, 
  Users, 
  UserPlus, 
  AlertTriangle 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
];

const servicesItems = [
  { title: "Places", url: "/places", icon: MapPin },
  { title: "Accessibility", url: "/accessibility", icon: Accessibility },
  { title: "Restaurants", url: "/restaurants", icon: UtensilsCrossed },
  { title: "Safety Info", url: "/safety-info", icon: Shield },
  { title: "Medical", url: "/medical", icon: Stethoscope },
  { title: "Connectivity", url: "/connectivity", icon: Wifi },
];

const communityItems = [
  { title: "Volunteers", url: "/volunteers", icon: Users },
  { title: "Register", url: "/register", icon: UserPlus },
];

const emergencyItems = [
  { title: "Emergency", url: "/emergency", icon: AlertTriangle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  const renderMenuItems = (items: typeof navigationItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink to={item.url} end className={getNavCls}>
              <item.icon className="h-4 w-4" />
              {state !== "collapsed" && <span>{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(navigationItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(servicesItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Community</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(communityItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Emergency</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(emergencyItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
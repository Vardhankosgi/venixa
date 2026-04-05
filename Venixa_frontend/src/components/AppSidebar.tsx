import {
  Home, Users, Video, Star, ShoppingBag, Church, GraduationCap,
  Calendar, Bot, BookOpen, Package, MapPin, MessageSquare, Settings,
  CreditCard, BarChart3, Shield, Bell, Search, Globe, Compass,
  Heart, Flame, Sun, Moon, Eye, Mic, FileText, Award, Clock,
  ChevronDown
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navGroups = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "AI Assistant", url: "/ai-assistant", icon: Bot },
    ],
  },
  {
    label: "Services",
    items: [
      {
        title: "Pandit Booking",
        icon: Users,
        children: [
          { title: "Find Pandits", url: "/pandits/find" },
          { title: "My Bookings", url: "/pandits/bookings" },
          { title: "Pandit Profiles", url: "/pandits/profiles" },
          { title: "Reviews & Ratings", url: "/pandits/reviews" },
        ],
      },
      {
        title: "Live Online Pooja",
        icon: Video,
        children: [
          { title: "Browse Poojas", url: "/live-pooja/browse" },
          { title: "Schedule Pooja", url: "/live-pooja/schedule" },
          { title: "My Sessions", url: "/live-pooja/sessions" },
          { title: "Recordings", url: "/live-pooja/recordings" },
        ],
      },
      {
        title: "Astrology & Vastu",
        icon: Star,
        children: [
          { title: "Horoscope", url: "/astrology/horoscope" },
          { title: "Kundali Matching", url: "/astrology/kundali" },
          { title: "Consult Astrologer", url: "/astrology/consult" },
          { title: "Vastu Analysis", url: "/astrology/vastu" },
          { title: "My Reports", url: "/astrology/reports" },
        ],
      },
      {
        title: "Pooja Samagri",
        icon: Package,
        children: [
          { title: "Browse Kits", url: "/samagri/browse" },
          { title: "Custom Kits", url: "/samagri/custom" },
          { title: "Subscriptions", url: "/samagri/subscriptions" },
          { title: "My Orders", url: "/samagri/orders" },
        ],
      },
      {
        title: "Temple Services",
        icon: Church,
        children: [
          { title: "Find Temples", url: "/temples/find" },
          { title: "Book Pooja", url: "/temples/book" },
          { title: "Live Darshan", url: "/temples/darshan" },
          { title: "Prasad Delivery", url: "/temples/prasad" },
        ],
      },
    ],
  },
  {
    label: "Learning",
    items: [
      {
        title: "Vedapatashala",
        icon: GraduationCap,
        children: [
          { title: "Browse Courses", url: "/vedapatashala/courses" },
          { title: "Live Classes", url: "/vedapatashala/live" },
          { title: "My Learning", url: "/vedapatashala/my-learning" },
          { title: "Certifications", url: "/vedapatashala/certifications" },
        ],
      },
    ],
  },
  {
    label: "Tools",
    items: [
      {
        title: "Panchang & Muhurat",
        icon: Calendar,
        children: [
          { title: "Daily Panchang", url: "/panchang/daily" },
          { title: "Muhurat Finder", url: "/panchang/muhurat" },
          { title: "Festival Calendar", url: "/panchang/festivals" },
          { title: "Reminders", url: "/panchang/reminders" },
        ],
      },
    ],
  },
  {
    label: "Marketplace",
    items: [
      {
        title: "E-Commerce",
        icon: ShoppingBag,
        children: [
          { title: "Shop", url: "/shop/browse" },
          { title: "Cart", url: "/shop/cart" },
          { title: "My Orders", url: "/shop/orders" },
          { title: "Wishlist", url: "/shop/wishlist" },
        ],
      },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile & Settings", url: "/settings", icon: Settings },
      { title: "Notifications", url: "/notifications", icon: Bell },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (children?: { url: string }[]) =>
    children?.some((c) => currentPath === c.url) ?? false;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-saffron flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-sidebar-primary">SarvaPooja</h1>
              <p className="text-xs text-sidebar-foreground/60">AI-Powered Spiritual Platform</p>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-lg gradient-saffron flex items-center justify-center mx-auto">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="py-2">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-sidebar-foreground/40 uppercase text-[10px] tracking-widest font-body">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) =>
                  "children" in item && item.children ? (
                    <Collapsible key={item.title} defaultOpen={isGroupActive(item.children)}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between hover:bg-sidebar-accent">
                            <span className="flex items-center gap-2">
                              <item.icon className="w-4 h-4" />
                              {!collapsed && <span>{item.title}</span>}
                            </span>
                            {!collapsed && <ChevronDown className="w-3 h-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {!collapsed && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((child) => (
                                <SidebarMenuSubItem key={child.url}>
                                  <SidebarMenuSubButton asChild>
                                    <NavLink
                                      to={child.url}
                                      end
                                      className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground"
                                      activeClassName="text-sidebar-primary font-medium bg-sidebar-accent"
                                    >
                                      {child.title}
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={(item as any).url}
                          end
                          className="hover:bg-sidebar-accent"
                          activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-[10px] text-sidebar-foreground/40 text-center">
            © 2026 SarvaPooja AI • Venixa
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

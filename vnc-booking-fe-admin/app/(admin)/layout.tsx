"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { StrapiStatus } from "@/components/strapi-status"
import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { Menu, Home, Car, Building, BarChart3, LogOut, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "Guest House Bookings",
    href: "/guest-house-bookings",
    icon: Home,
  },
  {
    name: "Car Rental Bookings",
    href: "/car-rental-bookings",
    icon: Car,
  },
  {
    name: "Guest Houses",
    href: "/guest-houses",
    icon: Building,
  },
  {
    name: "Cars",
    href: "/cars",
    icon: Car,
  },
]

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading, logout } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-background border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              <NavItems />
            </nav>
          </div>
          <div className="flex-shrink-0 p-4 border-t space-y-3">
            <StrapiStatus />
            {user && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="h-7 px-2 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40 bg-transparent">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center flex-shrink-0 px-4 py-5">
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex-grow">
              <nav className="px-4 space-y-1">
                <NavItems />
              </nav>
            </div>
            <div className="flex-shrink-0 p-4 border-t space-y-3">
              <StrapiStatus />
              {user && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="h-7 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  )
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/inventory", label: "Inventory", icon: "📦" },
  { href: "/admin/orders", label: "Orders", icon: "📋" },
  { href: "/admin/orders/new", label: "New Order", icon: "➕" },
  { href: "/admin/products/new", label: "Add Product", icon: "🆕" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  // Login page doesn't need auth
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setAuthed(true);
      setChecking(false);
    }
  }, [isLoginPage, router]);

  if (checking && !isLoginPage) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner" />
        <p>Loading admin panel...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authed) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    router.replace("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link href="/admin">
            <img src="/images/logo.png" alt="Hide Haven" className="admin-sidebar__logo" />
          </Link>
          <span className="admin-sidebar__sub">Admin Panel</span>
        </div>
        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar__link ${pathname === item.href ? "active" : ""}`}
            >
              <span className="admin-sidebar__icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <span className="admin-sidebar__user">
            👤 {typeof window !== "undefined" ? localStorage.getItem("admin_username") || "Admin" : "Admin"}
          </span>
          <button onClick={handleLogout} className="admin-sidebar__logout">
            Logout
          </button>
          <Link href="/" className="admin-sidebar__view-site">View Site →</Link>
        </div>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}

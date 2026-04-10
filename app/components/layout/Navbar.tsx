"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

const shopCategories = [
  { label: "All", href: "/shop" },
  { label: "Best Sellers", href: "/shop/product-category/best-sellers" },
  { label: "New", href: "/shop/product-category/new" },
  { label: "Sale", href: "/shop/product-category/sale" },
  { label: "Clearance", href: "/shop/product-category/clearance" },
];

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Shop", href: "/shop", hasDropdown: true },
  { label: "Skin Consultations", href: "/skin-consultation" },
  { label: "Magazine", href: "/magazine" },
  { label: "Starry Club", href: "/membership" },
  { label: "Treatment", href: "https://glowismhk.com/", external: true },
  { label: "My account", href: "/account" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #eaeaea",
        textAlign: "center",
        padding: "8px 16px",
        fontSize: "12px",
        letterSpacing: "0.08em",
        fontFamily: "var(--font-sans)",
        color: "#333",
      }}>
        FREE LOCAL SHIPPING(HK) ON ORDERS OVER HK$500
      </div>

      {/* Main Header */}
      <header style={{
        background: "#ffffff",
        borderBottom: "1px solid #eaeaea",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 0.3s ease",
      }}>
        {/* Desktop Header */}
        <div style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 20px",
          alignItems: "center",
          height: 72,
          display: "flex",
        }} className="hide-on-mobile">
          {/* Left decoration */}
          <div style={{ width: 100, flexShrink: 0 }}>
            <Image
              src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/02/202502_header_img_left.png?fit=169%2C114&ssl=1"
              alt="decoration"
              width={100}
              height={67}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Logo */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Link href="/">
              <Image
                src="https://littlestardusthk.com/wp-content/uploads/2020/04/cropped-cropped-cropped-Logotype-Black-155x42.png"
                alt="Little Stardust Skincare"
                width={155}
                height={42}
                priority
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#333", padding: 4, display: "flex", alignItems: "center" }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link href="/account" style={{ color: "#333", display: "flex", alignItems: "center" }}>
              <User size={20} />
            </Link>
            <Link href="/cart" style={{ color: "#333", display: "flex", alignItems: "center" }}>
              <ShoppingCart size={20} />
            </Link>
            <Image
              src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/02/202502_header_img_right.png?fit=172%2C88&ssl=1"
              alt="decoration"
              width={80}
              height={41}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Desktop Nav Menu */}
        <nav style={{
          borderTop: "1px solid #f0f0f0",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          display: "flex",
        }} className="hide-on-mobile">
          {navLinks.map((link) => (
            <div key={link.label} className="nav-item">
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className="nav-link"
              >
                {link.label}
              </Link>
              {link.hasDropdown && (
                <div className="nav-dropdown">
                  {shopCategories.map((cat) => (
                    <Link key={cat.label} href={cat.href} className="nav-dropdown-link">
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Header */}
        <div style={{
          padding: "12px 16px",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
        }} className="show-on-mobile">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#333" }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/">
            <Image
              src="https://littlestardusthk.com/wp-content/uploads/2020/04/cropped-cropped-cropped-Logotype-Black-155x42.png"
              alt="Little Stardust"
              width={120}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </Link>
          <Link href="/cart" style={{ color: "#333" }}>
            <ShoppingCart size={20} />
          </Link>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "#fff",
            zIndex: 200,
            overflowY: "auto",
            padding: "20px 24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image
                  src="https://littlestardusthk.com/wp-content/uploads/2020/04/cropped-cropped-cropped-Logotype-Black-155x42.png"
                  alt="Little Stardust"
                  width={120}
                  height={32}
                />
              </Link>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={24} />
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "14px 0",
                    fontSize: "16px",
                    fontFamily: "var(--font-serif)",
                    color: "#333",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
              <Link href="/account" style={{ fontSize: "14px", color: "#333" }}>Login</Link>
              <Link href="/register" style={{ fontSize: "14px", color: "#333" }}>Register</Link>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div style={{ background: "#fff", padding: "16px 20px", borderTop: "1px solid #eaeaea" }}>
            <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  border: "1px solid #eaeaea",
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  outline: "none",
                  background: "#faf8f5",
                }}
              />
              <button onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

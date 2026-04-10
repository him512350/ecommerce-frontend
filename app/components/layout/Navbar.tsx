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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Announcement bar ───────────────────────────── */}
      <div
        className="text-center text-xs font-semibold tracking-widest py-2 px-4 text-white"
        style={{ background: "var(--announce-bg)" }}
      >
        FREE LOCAL SHIPPING(HK) ON ORDERS OVER HK$500
      </div>

      {/* ── Sticky header ──────────────────────────────── */}
      <header
        className="bg-white border-b border-gray-100 sticky top-0 z-50 transition-shadow duration-300"
        style={{ boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none" }}
      >
        {/* Desktop top bar */}
        <div className="hidden lg:flex items-stretch h-[88px] overflow-hidden">
          {/* Left deco */}
          <div className="flex-none w-44 flex items-end overflow-hidden">
            <Image
              src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/02/202502_header_img_left.png?fit=338%2C228&ssl=1"
              alt=""
              width={169}
              height={114}
              loading="eager"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Logo */}
          <div className="flex-1 flex items-center justify-center">
            <Link href="/">
              <Image
                src="https://littlestardusthk.com/wp-content/uploads/2020/04/cropped-cropped-cropped-Logotype-Black-155x42.png"
                alt="Little Stardust Skincare"
                width={155}
                height={42}
                priority
                className="w-auto h-auto"
                style={{ maxWidth: 155 }}
              />
            </Link>
          </div>

          {/* Icons + right deco */}
          <div className="flex-none flex items-center">
            <div className="flex items-center gap-1 px-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:text-[#c9a98a] transition-colors cursor-pointer bg-transparent border-0"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link href="/account" className="p-2 text-gray-700 hover:text-[#c9a98a] transition-colors">
                <User size={20} />
              </Link>
              <Link href="/cart" className="p-2 text-gray-700 hover:text-[#c9a98a] transition-colors">
                <ShoppingCart size={20} />
              </Link>
            </div>
            {/* Right deco */}
            <div className="w-44 flex items-end overflow-hidden">
              <Image
                src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/02/202502_header_img_right.png?fit=344%2C176&ssl=1"
                alt=""
                width={172}
                height={88}
                loading="eager"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Desktop nav menu */}
        <nav
          className="hidden lg:flex justify-center items-center border-t border-white/30"
          style={{ background: "var(--nav-bg)" }}
        >
          {navLinks.map((link) => (
            <div key={link.label} className="nav-item relative">
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="block px-5 py-3 text-sm text-gray-700 hover:text-white hover:bg-black/10 transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {link.label}
              </Link>

              {link.hasDropdown && (
                <div
                  className="nav-dropdown absolute top-full left-0 bg-white border border-gray-100 shadow-lg min-w-[190px] z-50 opacity-0 pointer-events-none"
                  style={{ transform: "translateY(6px)", transition: "opacity 0.15s ease, transform 0.15s ease" }}
                >
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-stone-50 transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile top bar */}
        <div className="flex lg:hidden items-center justify-between px-4 py-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 text-gray-700 bg-transparent border-0 cursor-pointer"
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
              className="w-auto h-auto"
              style={{ maxWidth: 120 }}
            />
          </Link>
          <Link href="/cart" className="p-1 text-gray-700">
            <ShoppingCart size={20} />
          </Link>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="bg-white px-5 py-3 border-t border-gray-100">
            <div className="max-w-xl mx-auto flex items-center gap-3">
              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                className="flex-1 px-4 py-2.5 border border-gray-200 bg-stone-50 text-sm outline-none focus:border-[#c9a98a]"
                style={{ fontFamily: "var(--font-sans)" }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-500 bg-transparent border-0 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-[200] overflow-y-auto px-6 py-5">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="https://littlestardusthk.com/wp-content/uploads/2020/04/cropped-cropped-cropped-Logotype-Black-155x42.png"
                alt="Little Stardust"
                width={120}
                height={32}
                className="w-auto h-auto"
                style={{ maxWidth: 120 }}
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 bg-transparent border-0 cursor-pointer text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3.5 text-base text-gray-800 border-b border-gray-100 hover:text-[#c9a98a] transition-colors"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex gap-6 text-sm text-gray-600">
            <Link href="/account">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>
      )}
    </>
  );
}

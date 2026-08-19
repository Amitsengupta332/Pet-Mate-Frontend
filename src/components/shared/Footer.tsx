"use client";

import React from "react";
import Link from "next/link";
import { Dog, Mail, Phone, MapPin, Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border pt-12 pb-6">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-border">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-primary">
              <Dog className="h-7 w-7 text-orange-500" />
              <span>PetMate</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Loving care for your furry friends while you are away. Connecting pet parents with trusted, verified local sitters and walkers.
            </p>
            
            {/* Social Media Icons (Clean SVG Icons) */}
            <div className="flex items-center gap-3 pt-2">
              <Link href="#" className="h-9 w-9 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>

              <Link href="#" className="h-9 w-9 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>

              <Link href="#" className="h-9 w-9 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-base text-foreground">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/sitters" className="hover:text-orange-500 transition-colors">Find Sitters</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-base text-foreground">Our Services</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/sitters?service=walking" className="hover:text-orange-500 transition-colors">Dog Walking</Link>
              </li>
              <li>
                <Link href="/sitters?service=sitting" className="hover:text-orange-500 transition-colors">House Sitting</Link>
              </li>
              <li>
                <Link href="/sitters?service=boarding" className="hover:text-orange-500 transition-colors">Pet Boarding</Link>
              </li>
              <li>
                <Link href="/sitters?service=daycare" className="hover:text-orange-500 transition-colors">Doggy Daycare</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-base text-foreground">Newsletter</h3>
            <p className="text-xs text-muted-foreground">
              Subscribe to get special offers, pet care tips, and updates!
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-10 px-3 border border-border rounded-xl text-xs bg-background focus:outline-none focus:ring-1 focus:ring-orange-500 text-foreground"
                />
              </div>
              <Button type="submit" className="h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-3.5 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex flex-col gap-2 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>Cox&apos;s Bazar, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>support@petmate.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} PetMate. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            <span>for pet lovers.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
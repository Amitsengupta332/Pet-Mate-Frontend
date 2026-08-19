"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="w-full bg-background min-h-screen py-12 lg:py-20">
      <div className="container px-4 md:px-8 mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-semibold mb-4">
            <MessageSquare className="h-4 w-4" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            We’re Here to <span className="text-orange-500">Help You</span> & Your Pet
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-3">
            Have questions about booking, becoming a sitter, or need emergency support? Reach out to us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-md">
              <h2 className="text-xl font-bold text-foreground mb-6">Contact Details</h2>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Emergency & Phone</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">+1 (800) 123-4567</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">24/7 Urgent Booking Support</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Email Us</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">support@petmate.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Office Address</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">Cox&apos;s Bazar, Chittagong, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Support Hours</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">Mon - Sun: 8:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Info Banner */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-lg flex items-center gap-4">
              <ShieldCheck className="h-10 w-10 shrink-0 text-white/90" />
              <div>
                <h3 className="font-bold text-sm">Need Urgent Replacement?</h3>
                <p className="text-xs text-orange-100 mt-1">Our emergency support handles last-minute sitter cancellations.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-md">
            <h2 className="text-xl font-bold text-foreground mb-2">Send Us a Message</h2>
            <p className="text-xs text-muted-foreground mb-6">Fill out the form below and we’ll get back to you within 24 hours.</p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Name</label>
                  <Input placeholder="John Doe" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input type="email" placeholder="name@example.com" className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Query Type</label>
                <select className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer">
                  <option value="general">General Inquiry</option>
                  <option value="booking">Booking Assistance</option>
                  <option value="sitter">Become a Sitter Question</option>
                  <option value="feedback">Feedback / Suggestion</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you and your pet?" 
                  className="w-full p-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                />
              </div>

              <Button type="submit" className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all">
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
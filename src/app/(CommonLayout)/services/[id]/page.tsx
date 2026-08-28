// export default async function page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   return <div>page : {id} </div>;
// }


import React from "react";
import Link from "next/link";
import { 
  User, 
  Award, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSingleService } from "@/services/service";

interface ServiceDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsProps) {
  const { id } = await params;
  
  // আপনার পরিষেবা হেলপার থেকে ডাটা ফেচ
  const res = await getSingleService(id);
  const service = res?.data;

  // ডাটা না থাকলে সেফ ফলব্যাক ইউআই
  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-destructive">Service Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          The requested service might have been removed or the link is invalid.
        </p>
        <Link href="/services">
          <Button variant="outline" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Services
          </Button>
        </Link>
      </div>
    );
  }

  const sitter = service?.sitter;
  const sitterUser = sitter?.user;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Back Link */}
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-orange-500 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Services</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Details Section */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Service Header Card */}
            <div className="bg-card border border-orange-100 dark:border-orange-950/60 p-6 rounded-3xl shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400 text-xs font-bold border border-orange-200/60 uppercase">
                  {service.serviceType}
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-black text-orange-500">${service.price}</span>
                  <span className="text-xs text-muted-foreground font-medium">/hour</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground capitalize">
                {service.serviceType?.toLowerCase()} Service
              </h1>
              
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {service.description || "No specific description provided by the sitter."}
              </p>
            </div>

            {/* Service Provider Info */}
            <div className="bg-card border border-orange-100 dark:border-orange-950/60 p-6 rounded-3xl shadow-xs">
              <h2 className="text-lg font-bold text-foreground mb-4">Service Provider</h2>
              
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-orange-500/20">
                    <User className="h-7 w-7" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-card p-0.5 rounded-full">
                    <ShieldCheck className="h-4 w-4 text-emerald-500 fill-emerald-100" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground">
                    {sitterUser?.name || "Verified Pet Sitter"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{sitterUser?.email}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Award className="h-3.5 w-3.5 text-orange-500" />
                      {sitter?.experience || "N/A"} Experience
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                      Quick Responder
                    </span>
                  </div>
                </div>
              </div>

              {sitter?.bio && (
                <div className="mt-4 pt-4 border-t border-border/60">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    About Sitter
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sitter.bio}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-5 bg-card border border-orange-100 dark:border-orange-950/60 p-6 rounded-3xl shadow-md sticky top-24">
            <h2 className="text-xl font-bold text-foreground mb-1">Book This Service</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Reserve your slot with this sitter.
            </p>

            <div className="space-y-3.5 text-xs text-muted-foreground mb-6">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Verified & Background Checked Sitter</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Instant Confirmation & Updates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>24/7 Support & Safety Guarantee</span>
              </div>
            </div>

            <Link href={`/dashboard/bookings/new?serviceId=${service.id}&sitterId=${sitter?.id || service.sitterId}`}>
              <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                <Sparkles className="h-4 w-4" />
                <span>Proceed to Book</span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Check } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 bg-primary text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="z-10">
          <Link href="/" className="flex items-center gap-2 mb-20">
             <div className="bg-white text-primary p-2 rounded-xl">
               <Sparkles className="h-6 w-6" />
             </div>
             <span className="text-2xl font-headline font-bold">ResumeAI Pro</span>
          </Link>
          <h2 className="text-5xl font-headline font-bold leading-tight mb-8">Elevate your career with AI-driven precision.</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Smart Bullet Points</h4>
                <p className="text-white/70">Turn simple tasks into powerful achievement statements.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-lg">ATS-Optimized</h4>
                <p className="text-white/70">Engineered to get you through the digital gatekeepers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Premium Templates</h4>
                <p className="text-white/70">Designed by career experts for maximum impact.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl opacity-30"></div>
        
        <p className="z-10 text-white/50 text-sm">© 2024 ResumeAI Pro. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="bg-primary text-white p-2 rounded-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-2xl font-headline font-bold text-primary">ResumeAI Pro</span>
            </Link>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-headline font-bold text-primary">Join ResumeAI Pro</h1>
            <p className="text-muted-foreground mt-2">Start your journey to a better job today.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">First Name</label>
                <Input placeholder="John" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Last Name</label>
                <Input placeholder="Doe" className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Email Address</label>
              <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Password</label>
              <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" />
            </div>
            <Button className="w-full h-12 rounded-xl bg-secondary text-white text-lg font-medium shadow-lg shadow-secondary/20 hover:bg-secondary/90" asChild>
              <Link href="/dashboard">Create Account</Link>
            </Button>
            
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground font-medium">Or sign up with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-12 rounded-xl border-2 font-medium">
              Google
            </Button>
          </div>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

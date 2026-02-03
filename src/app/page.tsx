import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, CheckCircle, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-20 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-xl font-headline font-bold text-primary">ResumeAI Pro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium hover:text-secondary transition-colors">Login</Link>
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6">
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 md:px-12 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            <span>AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary leading-tight mb-6">
            Land your dream job with <span className="text-secondary underline underline-offset-8 decoration-accent">AI assistance</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Build a professional, ATS-optimized resume in minutes. Use our expert AI to rewrite your experience, suggest skills, and perfect your summary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-white h-14 px-10 rounded-xl text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
              <Link href="/signup">Create My Resume</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl text-lg border-2" asChild>
              <Link href="/templates">View Templates</Link>
            </Button>
          </div>
        </section>

        <section className="bg-white py-24 px-6 border-y">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard 
                icon={<Sparkles className="h-8 w-8 text-secondary" />}
                title="AI Content Generation"
                description="Our AI understands your career path and generates impactful bullet points that capture recruiter attention."
              />
              <FeatureCard 
                icon={<CheckCircle className="h-8 w-8 text-secondary" />}
                title="ATS-Friendly Templates"
                description="Designed specifically to pass Applicant Tracking Systems with clean code and readable structures."
              />
              <FeatureCard 
                icon={<FileText className="h-8 w-8 text-secondary" />}
                title="Pixel-Perfect PDF"
                description="Export your resume as a high-quality PDF that maintains formatting across all devices and printers."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-primary text-lg">ResumeAI Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 ResumeAI Pro. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="#" className="hover:text-secondary">Privacy</Link>
            <Link href="#" className="hover:text-secondary">Terms</Link>
            <Link href="#" className="hover:text-secondary">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col gap-4 p-8 rounded-2xl border bg-background hover:shadow-lg transition-all border-border/50 group">
      <div className="bg-accent w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold text-primary">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

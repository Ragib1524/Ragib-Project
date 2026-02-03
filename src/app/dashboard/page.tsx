"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Plus, FileText, MoreVertical, Edit2, Trash2, Copy, Clock, Search, Sparkles } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function Dashboard() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulated load from local storage
    const saved = localStorage.getItem('resumes');
    if (saved) {
      setResumes(JSON.parse(saved));
    } else {
      const initial = [{
        id: '1',
        title: 'Software Engineer 2024',
        lastEdited: new Date().toISOString(),
        template: 'Modern'
      }];
      setResumes(initial);
      localStorage.setItem('resumes', JSON.stringify(initial));
    }
  }, []);

  const deleteResume = (id: string) => {
    const filtered = resumes.filter(r => r.id !== id);
    setResumes(filtered);
    localStorage.setItem('resumes', JSON.stringify(filtered));
  };

  const duplicateResume = (id: string) => {
    const original = resumes.find(r => r.id === id);
    if (!original) return;
    const duplicated = {
      ...original,
      id: Math.random().toString(36).substr(2, 9),
      title: `${original.title} (Copy)`,
      lastEdited: new Date().toISOString()
    };
    const updated = [duplicated, ...resumes];
    setResumes(updated);
    localStorage.setItem('resumes', JSON.stringify(updated));
  };

  const filteredResumes = resumes.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b bg-white px-6 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-white p-1 rounded-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-headline font-bold text-primary">ResumeAI Pro</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="rounded-full">Support</Button>
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">AJ</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary mb-2">My Resumes</h1>
            <p className="text-muted-foreground">Manage and create your professional resumes here.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search resumes..." 
                className="pl-9 h-11 rounded-xl bg-white border-muted"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="bg-secondary text-white h-11 px-6 rounded-xl shadow-lg shadow-secondary/20 hover:bg-secondary/90 flex items-center gap-2" asChild>
              <Link href="/builder/new">
                <Plus className="h-5 w-5" />
                Create New
              </Link>
            </Button>
          </div>
        </div>

        {filteredResumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-muted text-center">
            <div className="h-20 w-20 bg-accent rounded-full flex items-center justify-center mb-6">
              <FileText className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-xl font-headline font-bold text-primary mb-2">No resumes found</h2>
            <p className="text-muted-foreground max-w-sm mb-8">Start by creating your first professional resume with the help of our AI.</p>
            <Button className="bg-primary text-white" asChild>
               <Link href="/builder/new">Get Started Now</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResumes.map((resume) => (
              <Card key={resume.id} className="group hover:shadow-xl transition-all border-border/50 bg-white overflow-hidden rounded-2xl">
                <CardHeader className="pb-3 border-b bg-accent/30 relative">
                  <div className="h-40 flex items-center justify-center text-muted-foreground">
                    <FileText className="h-16 w-16 opacity-20" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                      <DropdownMenuItem className="rounded-lg gap-2" asChild>
                        <Link href={`/builder/${resume.id}`}>
                          <Edit2 className="h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2" onClick={() => duplicateResume(resume.id)}>
                        <Copy className="h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg gap-2 text-destructive focus:text-destructive" onClick={() => deleteResume(resume.id)}>
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="pt-5">
                  <CardTitle className="text-lg font-headline font-bold truncate text-primary group-hover:text-secondary transition-colors">{resume.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Edited {new Date(resume.lastEdited).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-5">
                  <Button variant="outline" className="w-full rounded-xl border-2 hover:bg-secondary hover:text-white hover:border-secondary transition-all" asChild>
                    <Link href={`/builder/${resume.id}`}>Open Builder</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

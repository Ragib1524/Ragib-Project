"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sparkles, Download, ArrowLeft, Eye, Save, Layout, Palette, Settings } from 'lucide-react';
import { INITIAL_RESUME_DATA } from '@/lib/mock-data';
import { ResumeData } from '@/lib/types';
import ResumeForm from '@/components/builder/ResumeForm';
import ResumePreview from '@/components/builder/ResumePreview';
import { useToast } from '@/hooks/use-toast';

export default function BuilderPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [activeTab, setActiveTab] = useState('content');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (id !== 'new') {
      const saved = localStorage.getItem('resumes');
      if (saved) {
        const resumes = JSON.parse(saved);
        const resume = resumes.find((r: any) => r.id === id);
        if (resume && resume.data) {
          setData(resume.data);
        }
      }
    }
  }, [id]);

  const saveResume = () => {
    const saved = localStorage.getItem('resumes');
    let resumes = saved ? JSON.parse(saved) : [];
    
    const newResume = {
      id: id === 'new' ? Math.random().toString(36).substr(2, 9) : id,
      title: data.personalInfo.fullName || 'Untitled Resume',
      lastEdited: new Date().toISOString(),
      data: data
    };

    if (id === 'new') {
      resumes.push(newResume);
      router.push(`/builder/${newResume.id}`);
    } else {
      resumes = resumes.map((r: any) => r.id === id ? newResume : r);
    }

    localStorage.setItem('resumes', JSON.stringify(resumes));
    toast({
      title: "Success",
      description: "Resume saved successfully",
    });
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background h-screen overflow-hidden">
      {/* Top Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0 z-30 no-print">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1 rounded-md">
              <Sparkles className="h-4 w-4" />
            </div>
            <h1 className="font-headline font-bold text-primary truncate max-w-[200px]">{data.title || 'Untitled Resume'}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={saveResume} className="rounded-lg gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="md:hidden rounded-lg gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button className="bg-secondary text-white rounded-lg gap-2 h-9 px-4 shadow-lg shadow-secondary/20 hover:bg-secondary/90" onClick={downloadPDF}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Editor */}
        <div className={`flex-1 flex flex-col border-r bg-white overflow-hidden transition-all duration-300 no-print ${isPreviewOpen ? 'hidden md:flex' : 'flex'}`}>
          <div className="border-b px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent h-14 w-full justify-start gap-4 p-0">
                <TabsTrigger value="content" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary font-medium px-4 gap-2">
                  <Layout className="h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="appearance" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary font-medium px-4 gap-2">
                  <Palette className="h-4 w-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="settings" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent data-[state=active]:text-secondary font-medium px-4 gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {activeTab === 'content' && <ResumeForm data={data} onChange={setData} />}
            {activeTab === 'appearance' && (
               <div className="grid grid-cols-2 gap-4">
                  {['modern', 'classic', 'minimal'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setData({...data, templateId: t as any})}
                      className={`p-4 rounded-xl border-2 transition-all ${data.templateId === t ? 'border-secondary bg-accent' : 'border-border bg-white hover:border-secondary/50'}`}
                    >
                      <div className="h-32 bg-muted rounded-md mb-2 flex items-center justify-center opacity-50">
                        <Layout className="h-8 w-8" />
                      </div>
                      <span className="capitalize font-medium">{t} Template</span>
                    </button>
                  ))}
               </div>
            )}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                 <div>
                   <label className="text-sm font-medium mb-1 block">Resume Title</label>
                   <input 
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-secondary/20 outline-none" 
                    value={data.title}
                    onChange={(e) => setData({...data, title: e.target.value})}
                   />
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className={`flex-1 bg-muted/30 overflow-y-auto p-10 flex justify-center custom-scrollbar transition-all duration-300 ${isPreviewOpen ? 'flex' : 'hidden md:flex'} print:p-0 print:bg-white`}>
          <div className="w-full max-w-[800px] print:max-w-none print:w-full">
            <ResumePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

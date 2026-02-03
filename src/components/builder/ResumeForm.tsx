"use client";

import { ResumeData, Experience, Education, Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Wand2 } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { rewriteResumeBulletPoints } from '@/ai/flows/rewrite-resume-bullet-points';
import { getRoleSpecificSuggestions } from '@/ai/flows/get-role-specific-suggestions';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: Props) {
  const { toast } = useToast();
  const [isRewriting, setIsRewriting] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const updateExperienceBullet = (expId: string, index: number, value: string) => {
    const updated = data.experience.map(exp => {
      if (exp.id === expId) {
        const bullets = [...exp.description];
        bullets[index] = value;
        return { ...exp, description: bullets };
      }
      return exp;
    });
    onChange({ ...data, experience: updated });
  };

  const addExperienceBullet = (expId: string) => {
    const updated = data.experience.map(exp => 
      exp.id === expId ? { ...exp, description: [...exp.description, ''] } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const rewriteBullet = async (expId: string, index: number) => {
    const bullet = data.experience.find(e => e.id === expId)?.description[index];
    if (!bullet) return;

    setIsRewriting(`${expId}-${index}`);
    try {
      const result = await rewriteResumeBulletPoints({
        bulletPoint: bullet,
        tone: 'Professional',
        jobRole: data.personalInfo.jobTitle
      });
      updateExperienceBullet(expId, index, result.rewrittenBulletPoint);
      toast({ title: "Optimized!", description: "AI enhanced your bullet point." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to rewrite. Try again.", variant: "destructive" });
    } finally {
      setIsRewriting(null);
    }
  };

  const handleRoleSuggestions = async () => {
    if (!data.personalInfo.jobTitle) {
      toast({ title: "Info", description: "Please enter a job title first." });
      return;
    }

    setIsSuggesting(true);
    try {
      const resumeString = JSON.stringify(data);
      const result = await getRoleSpecificSuggestions({
        jobRole: data.personalInfo.jobTitle,
        resumeContent: resumeString
      });
      // For this demo, we'll show a toast with instructions or add to summary
      toast({
        title: "AI Suggestions Ready",
        description: "Reviewing your resume for: " + data.personalInfo.jobTitle,
      });
      // In a real app, we'd open a modal with the result.suggestions markdown
      console.log("AI SUGGESTIONS:", result.suggestions);
    } catch (err) {
      toast({ title: "Error", description: "Could not get suggestions.", variant: "destructive" });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Personal Info */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline font-bold text-primary">Personal Details</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg gap-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
            onClick={handleRoleSuggestions}
            disabled={isSuggesting}
          >
            <Sparkles className="h-4 w-4" />
            {isSuggesting ? 'Analyzing...' : 'Get Role Tips'}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">Full Name</label>
            <Input value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} className="rounded-xl h-11" placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">Job Title</label>
            <Input value={data.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} className="rounded-xl h-11" placeholder="Software Engineer" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">Email</label>
            <Input value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} className="rounded-xl h-11" placeholder="john@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase">Location</label>
            <Input value={data.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} className="rounded-xl h-11" placeholder="City, State" />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h3 className="text-xl font-headline font-bold text-primary">Professional Summary</h3>
        <Textarea 
          value={data.summary} 
          onChange={(e) => onChange({...data, summary: e.target.value})} 
          placeholder="A brief overview of your professional background and key achievements..."
          className="min-h-[120px] rounded-xl"
        />
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline font-bold text-primary">Experience</h3>
          <Button variant="ghost" size="sm" onClick={addExperience} className="text-secondary gap-2 hover:bg-accent">
            <Plus className="h-4 w-4" /> Add Experience
          </Button>
        </div>
        
        <Accordion type="multiple" className="space-y-4">
          {data.experience.map((exp) => (
            <AccordionItem key={exp.id} value={exp.id} className="border rounded-2xl bg-white shadow-sm overflow-hidden">
              <AccordionTrigger className="px-5 hover:no-underline">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-bold text-primary">{exp.position || 'Position'}</span>
                  <span className="text-sm text-muted-foreground">{exp.company || 'Company'}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="rounded-xl" placeholder="Company Name" />
                  <Input value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className="rounded-xl" placeholder="Job Title" />
                  <Input value={exp.startDate} type="month" onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="rounded-xl" />
                  <Input value={exp.endDate} type="month" disabled={exp.current} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className="rounded-xl" />
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center justify-between">
                    Key Responsibilities
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-secondary gap-1" onClick={() => addExperienceBullet(exp.id)}>
                      <Plus className="h-3 w-3" /> Add bullet
                    </Button>
                  </label>
                  {exp.description.map((bullet, idx) => (
                    <div key={idx} className="flex gap-2 group">
                      <div className="flex-1 relative">
                        <Input 
                          value={bullet} 
                          onChange={(e) => updateExperienceBullet(exp.id, idx, e.target.value)} 
                          className="rounded-xl pr-10" 
                          placeholder="Built a mobile app using..."
                        />
                        <button 
                          onClick={() => rewriteBullet(exp.id, idx)}
                          disabled={isRewriting === `${exp.id}-${idx}` || !bullet}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:scale-110 transition-transform disabled:opacity-50"
                        >
                          {isRewriting === `${exp.id}-${idx}` ? (
                            <Wand2 className="h-4 w-4 animate-pulse" />
                          ) : (
                            <Sparkles className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const updated = [...exp.description];
                          updated.splice(idx, 1);
                          updateExperience(exp.id, 'description', updated);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                   <Button variant="ghost" size="sm" className="text-destructive gap-2" onClick={() => {
                     onChange({...data, experience: data.experience.filter(e => e.id !== exp.id)});
                   }}>
                     <Trash2 className="h-4 w-4" /> Remove Entry
                   </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h3 className="text-xl font-headline font-bold text-primary">Skills</h3>
        <div className="flex flex-wrap gap-2 p-4 border rounded-2xl bg-white min-h-[60px]">
          {data.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-accent text-secondary rounded-full font-medium text-sm group">
              {skill}
              <button onClick={() => onChange({...data, skills: data.skills.filter((_, idx) => idx !== i)})} className="hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <input 
            className="flex-1 bg-transparent outline-none min-w-[150px] text-sm" 
            placeholder="Type and press Enter..." 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val && !data.skills.includes(val)) {
                  onChange({...data, skills: [...data.skills, val]});
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
          />
        </div>
      </section>
    </div>
  );
}

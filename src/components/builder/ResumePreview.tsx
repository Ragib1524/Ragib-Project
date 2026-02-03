"use client";

import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  if (data.templateId === 'minimal') {
    return (
      <div className="resume-paper print-container font-sans text-sm leading-relaxed">
        <header className="mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase">{personalInfo.fullName || 'Name'}</h1>
          <p className="text-lg text-secondary font-medium mb-4 uppercase tracking-widest">{personalInfo.jobTitle || 'Role'}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {personalInfo.location}</span>}
          </div>
        </header>

        <div className="space-y-8">
          {summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 border-b pb-1">Summary</h2>
              <p className="text-slate-700">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 border-b pb-1">Experience</h2>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base">{exp.position}</h3>
                      <span className="text-xs font-medium text-slate-500 uppercase">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-slate-600 font-medium mb-2 italic">{exp.company} | {exp.location}</p>
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-slate-700">
                      {exp.description.map((bullet, i) => bullet && <li key={i}>{bullet}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
               <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-3 border-b pb-1">Skills</h2>
               <div className="flex flex-wrap gap-2">
                 {skills.join(' • ')}
               </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Modern Template (Default)
  return (
    <div className="resume-paper print-container flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-primary/10 pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary">{personalInfo.fullName || 'Full Name'}</h1>
          <p className="text-xl font-medium text-secondary">{personalInfo.jobTitle || 'Job Title'}</p>
        </div>
        <div className="text-right space-y-1.5 text-sm text-muted-foreground">
          {personalInfo.email && <div className="flex items-center justify-end gap-2">{personalInfo.email} <Mail className="h-3.5 w-3.5" /></div>}
          {personalInfo.phone && <div className="flex items-center justify-end gap-2">{personalInfo.phone} <Phone className="h-3.5 w-3.5" /></div>}
          {personalInfo.location && <div className="flex items-center justify-end gap-2">{personalInfo.location} <MapPin className="h-3.5 w-3.5" /></div>}
          {personalInfo.website && <div className="flex items-center justify-end gap-2">{personalInfo.website} <Globe className="h-3.5 w-3.5" /></div>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Main Column */}
        <div className="col-span-8 space-y-10">
          {summary && (
            <section>
              <h2 className="text-lg font-headline font-bold text-primary mb-3 uppercase tracking-wider">Profile</h2>
              <p className="text-slate-700 leading-relaxed text-sm">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-headline font-bold text-primary mb-4 uppercase tracking-wider">Experience</h2>
              <div className="space-y-8">
                {experience.map(exp => (
                  <div key={exp.id} className="relative pl-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base text-slate-800">{exp.position}</h3>
                      <span className="text-xs font-semibold text-secondary whitespace-nowrap bg-accent px-2 py-0.5 rounded uppercase">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-600 mb-3">{exp.company} — {exp.location}</div>
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-slate-700">
                      {exp.description.map((bullet, i) => bullet && <li key={i}>{bullet}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-10">
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-headline font-bold text-primary mb-4 uppercase tracking-wider">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-headline font-bold text-primary mb-4 uppercase tracking-wider">Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm text-slate-800">{edu.degree} {edu.field}</h3>
                    <p className="text-xs text-slate-600">{edu.school}</p>
                    <p className="text-[10px] text-muted-foreground uppercase mt-1">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

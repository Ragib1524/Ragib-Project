import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  id: 'new',
  userId: 'user-1',
  title: 'My Professional Resume',
  lastEdited: new Date().toISOString(),
  templateId: 'modern',
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    jobTitle: 'Senior Software Engineer'
  },
  summary: 'Experienced Software Engineer with 8+ years of expertise in building scalable web applications. Proven track record in leading engineering teams and delivering complex projects on time.',
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Solutions',
      position: 'Senior Engineer',
      location: 'New York, NY',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: [
        'Led a team of 5 developers to rebuild the core banking platform',
        'Implemented Micro-frontend architecture resulting in 40% faster deployment times',
        'Optimized database queries reducing latency by 200ms across all API endpoints'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Technology',
      degree: 'B.S.',
      field: 'Computer Science',
      location: 'Boston, MA',
      startDate: '2012-09',
      endDate: '2016-05'
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'System Design'],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenSource Dashboard',
      link: 'github.com/alex/dash',
      description: 'A community-driven monitoring tool with over 5k GitHub stars.'
    }
  ]
};
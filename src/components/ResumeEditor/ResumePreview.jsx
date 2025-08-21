import React from 'react';
import { useResumeContext } from './Editor';

const ResumePreview = () => {
  const { resumeData } = useResumeContext();
  const { personalInfo, experience, education, skills, projects, contact, certifications } = resumeData;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <div id="resume-preview" className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ minHeight: '842px', width: '595px' }}>
      {/* Header Section */}
      <div className="bg-[var(--blue-primary)] text-white p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            {personalInfo.firstName || 'Your'} {personalInfo.lastName || 'Name'}
          </h1>
          <div className="text-sm space-y-1">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
          </div>
          
          {/* Contact Links */}
          {(contact.linkedin || contact.github || contact.website || contact.portfolio) && (
            <div className="flex justify-center gap-4 mt-3 text-xs">
              {contact.linkedin && (
                <a href={contact.linkedin} className="hover:underline">LinkedIn</a>
              )}
              {contact.github && (
                <a href={contact.github} className="hover:underline">GitHub</a>
              )}
              {contact.website && (
                <a href={contact.website} className="hover:underline">Website</a>
              )}
              {contact.portfolio && (
                <a href={contact.portfolio} className="hover:underline">Portfolio</a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold text-[var(--black)] border-b-2 border-[var(--blue-primary)] pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm text-[var(--gray-dark)] leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--black)] border-b-2 border-[var(--blue-primary)] pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-[var(--black)]">{exp.jobTitle}</h3>
                      <p className="text-sm text-[var(--gray-dark)]">{exp.company} • {exp.location}</p>
                    </div>
                    <div className="text-xs text-[var(--gray-medium)] text-right">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-[var(--gray-dark)] leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--black)] border-b-2 border-[var(--blue-primary)] pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-[var(--black)]">{edu.degree}</h3>
                      <p className="text-sm text-[var(--gray-dark)]">
                        {edu.institution} • {edu.location}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </p>
                    </div>
                    <div className="text-xs text-[var(--gray-medium)] text-right">
                      {formatDate(edu.startDate)} - {edu.isCurrentlyStudying ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-[var(--gray-dark)] leading-relaxed mt-1">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--black)] border-b-2 border-[var(--blue-primary)] pb-1 mb-3">
              Skills
            </h2>
            <div className="space-y-3">
              {['technical', 'soft', 'languages', 'tools', 'other'].map(category => {
                const categorySkills = getSkillsByCategory(category);
                if (categorySkills.length === 0) return null;
                
                const categoryLabels = {
                  technical: 'Technical Skills',
                  soft: 'Soft Skills',
                  languages: 'Languages',
                  tools: 'Tools & Software',
                  other: 'Other Skills'
                };

                return (
                  <div key={category}>
                    <h4 className="font-medium text-[var(--black)] text-sm mb-1">
                      {categoryLabels[category]}:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill, index) => (
                        <span key={skill.id} className="text-sm text-[var(--gray-dark)]">
                          {skill.name}
                          {index < categorySkills.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--black)] border-b-2 border-[var(--blue-primary)] pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--black)]">{project.title}</h3>
                      <div className="flex gap-3 text-xs text-[var(--blue-primary)] mt-1">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    {project.startDate && (
                      <div className="text-xs text-[var(--gray-medium)] text-right">
                        {formatDate(project.startDate)} - {project.isOngoing ? 'Present' : formatDate(project.endDate)}
                      </div>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="text-sm text-[var(--gray-dark)] leading-relaxed mt-2">
                      {project.description}
                    </p>
                  )}
                  
                  {project.technologies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs font-medium text-[var(--gray-dark)]">Technologies: </span>
                      <span className="text-xs text-[var(--gray-dark)]">
                        {project.technologies.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[var(--black)] border-b-2 border-[var(--blue-primary)] pb-1 mb-3">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--black)]">{cert.name}</h3>
                      <p className="text-sm text-[var(--gray-dark)]">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-xs text-[var(--gray-medium)]">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.credentialUrl && (
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-[var(--blue-primary)] hover:underline"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                    <div className="text-xs text-[var(--gray-medium)] text-right">
                      {formatDate(cert.issueDate)}
                      {cert.expiryDate && !cert.neverExpires && (
                        <div>Expires: {formatDate(cert.expiryDate)}</div>
                      )}
                    </div>
                  </div>
                  {cert.description && (
                    <p className="text-sm text-[var(--gray-dark)] leading-relaxed mt-1">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!personalInfo.firstName && !personalInfo.lastName && experience.length === 0 && 
         education.length === 0 && skills.length === 0 && projects.length === 0 && 
         certifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[var(--gray-medium)] mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[var(--gray-dark)] mb-2">Your Resume Preview</h3>
            <p className="text-[var(--gray-medium)] text-sm">
              Start filling out your information to see your resume come to life!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
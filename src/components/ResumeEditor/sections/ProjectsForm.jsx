import React, { useState } from 'react';
import { useResumeContext } from '../Editor';

const ProjectsForm = () => {
  const { resumeData, updateResumeData, goToNextSection, goToPreviousSection } = useResumeContext();
  const { projects } = resumeData;
  
  const [currentProject, setCurrentProject] = useState({
    id: Date.now(),
    title: '',
    description: '',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    startDate: '',
    endDate: '',
    isOngoing: false
  });

  const [currentTech, setCurrentTech] = useState('');

  const handleInputChange = (field, value) => {
    setCurrentProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTechnology = () => {
    if (currentTech.trim() && !currentProject.technologies.includes(currentTech.trim())) {
      setCurrentProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, currentTech.trim()]
      }));
      setCurrentTech('');
    }
  };

  const removeTechnology = (tech) => {
    setCurrentProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addProject = () => {
    if (currentProject.title && currentProject.description) {
      updateResumeData('projects', [...projects, currentProject]);
      setCurrentProject({
        id: Date.now(),
        title: '',
        description: '',
        technologies: [],
        liveUrl: '',
        githubUrl: '',
        startDate: '',
        endDate: '',
        isOngoing: false
      });
    }
  };

  const removeProject = (id) => {
    updateResumeData('projects', projects.filter(project => project.id !== id));
  };

  const editProject = (project) => {
    setCurrentProject(project);
    removeProject(project.id);
  };

  const handleTechKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div className="space-y-6">
      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--gray-dark)]">Added Projects</h3>
          {projects.map((project) => (
            <div key={project.id} className="p-4 border border-[var(--gray-light)] rounded-lg bg-[var(--gray-light)]/30">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--black)]">{project.title}</h4>
                  <p className="text-sm text-[var(--gray-dark)] mt-1 line-clamp-2">{project.description}</p>
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-[var(--blue-primary)]/10 text-[var(--blue-primary)] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4 mt-2 text-sm text-[var(--gray-medium)]">
                    {project.startDate && (
                      <span>{project.startDate} - {project.isOngoing ? 'Present' : project.endDate}</span>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--blue-primary)] hover:underline">
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--blue-primary)] hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => editProject(project)}
                    className="p-2 text-[var(--blue-primary)] hover:bg-[var(--blue-primary)]/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="p-2 text-[var(--red-primary)] hover:bg-[var(--red-primary)]/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Project Form */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[var(--gray-dark)]">
          {projects.length > 0 ? 'Add Another Project' : 'Add Project'}
        </h3>

        {/* Project Title */}
        <div>
          <label htmlFor="projectTitle" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Project Title *
          </label>
          <input
            type="text"
            id="projectTitle"
            value={currentProject.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            placeholder="e.g. E-commerce Website"
          />
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Project Description *
          </label>
          <textarea
            id="projectDescription"
            rows={4}
            value={currentProject.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Describe what the project does, your role, and key achievements..."
          />
        </div>

        {/* Technologies Used */}
        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Technologies Used
          </label>
          
          {/* Current Technologies */}
          {currentProject.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {currentProject.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-[var(--blue-primary)]/10 text-[var(--blue-primary)] rounded-full text-sm"
                >
                  <span>{tech}</span>
                  <button
                    onClick={() => removeTechnology(tech)}
                    className="p-1 hover:bg-[var(--red-primary)]/10 hover:text-[var(--red-primary)] rounded-full transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Technology Input */}
          <div className="flex gap-3">
            <input
              type="text"
              id="technologies"
              value={currentTech}
              onChange={(e) => setCurrentTech(e.target.value)}
              onKeyPress={handleTechKeyPress}
              className="flex-1 px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. React, Node.js, MongoDB"
            />
            <button
              type="button"
              onClick={addTechnology}
              disabled={!currentTech.trim()}
              className="px-4 py-3 bg-[var(--blue-primary)] text-white rounded-lg hover:bg-[var(--blue-dark)] transition-colors disabled:bg-[var(--gray-light)] disabled:text-[var(--gray-medium)] disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live URL */}
          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Live Demo URL
            </label>
            <input
              type="url"
              id="liveUrl"
              value={currentProject.liveUrl}
              onChange={(e) => handleInputChange('liveUrl', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="https://your-project.com"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              GitHub Repository
            </label>
            <input
              type="url"
              id="githubUrl"
              value={currentProject.githubUrl}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Start Date
            </label>
            <input
              type="month"
              id="startDate"
              value={currentProject.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              End Date
            </label>
            <input
              type="month"
              id="endDate"
              value={currentProject.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              disabled={currentProject.isOngoing}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all disabled:bg-[var(--gray-light)] disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Ongoing Project Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isOngoing"
            checked={currentProject.isOngoing}
            onChange={(e) => handleInputChange('isOngoing', e.target.checked)}
            className="w-4 h-4 text-[var(--blue-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--blue-primary)] focus:ring-2"
          />
          <label htmlFor="isOngoing" className="ml-2 text-sm text-[var(--gray-dark)]">
            This is an ongoing project
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t border-[var(--gray-light)]">
          <button
            type="button"
            onClick={goToPreviousSection}
            className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentProject({
                id: Date.now(),
                title: '',
                description: '',
                technologies: [],
                liveUrl: '',
                githubUrl: '',
                startDate: '',
                endDate: '',
                isOngoing: false
              })}
              className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={addProject}
              className="px-6 py-2 bg-[var(--gray-medium)] text-white rounded-lg hover:bg-[var(--gray-dark)] transition-colors"
            >
              Add Project
            </button>
            <button
              type="button"
              onClick={goToNextSection}
              className="px-6 py-2 bg-[var(--blue-primary)] text-white rounded-lg hover:bg-[var(--blue-dark)] transition-colors"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
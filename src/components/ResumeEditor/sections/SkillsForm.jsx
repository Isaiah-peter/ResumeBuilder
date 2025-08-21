import React, { useState } from 'react';
import { useResumeContext } from '../Editor';

const SkillsForm = () => {
  const { resumeData, updateResumeData, goToNextSection, goToPreviousSection } = useResumeContext();
  const { skills } = resumeData;
  
  const [currentSkill, setCurrentSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState('technical');

  const skillCategories = [
    { value: 'technical', label: 'Technical Skills' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'languages', label: 'Languages' },
    { value: 'tools', label: 'Tools & Software' },
    { value: 'other', label: 'Other Skills' }
  ];

  const addSkill = () => {
    if (currentSkill.trim()) {
      const newSkill = {
        id: Date.now(),
        name: currentSkill.trim(),
        category: skillCategory
      };
      
      updateResumeData('skills', [...skills, newSkill]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (id) => {
    updateResumeData('skills', skills.filter(skill => skill.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };

  const getCategoryLabel = (category) => {
    const categoryObj = skillCategories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.label : category;
  };

  return (
    <div className="space-y-6">
      {/* Skills Display by Category */}
      {skillCategories.map(category => {
        const categorySkills = getSkillsByCategory(category.value);
        if (categorySkills.length === 0) return null;

        return (
          <div key={category.value} className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--gray-dark)]">{category.label}</h3>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 px-3 py-2 bg-[var(--blue-primary)]/10 text-[var(--blue-primary)] rounded-full border border-[var(--blue-primary)]/20"
                >
                  <span className="text-sm font-medium">{skill.name}</span>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="p-1 hover:bg-[var(--red-primary)]/10 hover:text-[var(--red-primary)] rounded-full transition-colors"
                    title="Remove skill"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Add New Skill Form */}
      <div className="space-y-6 pt-6 border-t border-[var(--gray-light)]">
        <h3 className="text-lg font-semibold text-[var(--gray-dark)]">Add New Skill</h3>

        {/* Skill Category */}
        <div>
          <label htmlFor="skillCategory" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Skill Category
          </label>
          <select
            id="skillCategory"
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
          >
            {skillCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Input */}
        <div>
          <label htmlFor="skillName" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Skill Name
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              id="skillName"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. JavaScript, React, Communication, etc."
            />
            <button
              type="button"
              onClick={addSkill}
              disabled={!currentSkill.trim()}
              className="px-6 py-3 bg-[var(--blue-primary)] text-white rounded-lg hover:bg-[var(--blue-dark)] transition-colors disabled:bg-[var(--gray-light)] disabled:text-[var(--gray-medium)] disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
          <p className="text-sm text-[var(--gray-medium)] mt-1">
            Press Enter or click Add to add the skill
          </p>
        </div>

        {/* Skill Suggestions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--gray-dark)]">Popular Skills (Click to add):</h4>
          
          {skillCategories.map(category => (
            <div key={category.value} className="space-y-2">
              <h5 className="text-sm font-medium text-[var(--gray-medium)]">{category.label}:</h5>
              <div className="flex flex-wrap gap-2">
                {getSkillSuggestions(category.value).map((suggestion, index) => {
                  const isAlreadyAdded = skills.some(skill => skill.name.toLowerCase() === suggestion.toLowerCase());
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isAlreadyAdded) {
                          const newSkill = {
                            id: Date.now() + Math.random(), // Ensure unique ID
                            name: suggestion,
                            category: category.value
                          };
                          updateResumeData('skills', [...skills, newSkill]);
                        }
                      }}
                      disabled={isAlreadyAdded}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        isAlreadyAdded 
                          ? 'bg-[var(--blue-primary)]/20 text-[var(--blue-primary)] cursor-not-allowed opacity-50' 
                          : 'bg-[var(--gray-light)] text-[var(--gray-dark)] hover:bg-[var(--blue-primary)] hover:text-white'
                      }`}
                      title={isAlreadyAdded ? 'Already added' : `Click to add ${suggestion}`}
                    >
                      {isAlreadyAdded ? `✓ ${suggestion}` : suggestion}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
              onClick={() => updateResumeData('skills', [])}
              className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
            >
              Clear All
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

// Helper function to get skill suggestions
const getSkillSuggestions = (category) => {
  const suggestions = {
    technical: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'],
    soft: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management'],
    languages: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese'],
    tools: ['VS Code', 'Figma', 'Adobe Creative Suite', 'Slack', 'Jira', 'Docker'],
    other: ['Project Management', 'Data Analysis', 'Public Speaking', 'Writing', 'Research']
  };
  
  return suggestions[category] || [];
};

export default SkillsForm;
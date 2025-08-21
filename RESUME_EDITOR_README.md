# Resume Editor Boilerplate

This is a comprehensive React-based resume editor boilerplate that provides a complete solution for building resumes with live preview functionality.

## 🚀 Features

- **Dynamic Sidebar Navigation**: Collapsible sidebar with sections for all resume components
- **Live Resume Preview**: Real-time preview of the resume as users fill in their information
- **Context-Based State Management**: Centralized state management using React Context
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Form Validation**: Built-in validation for required fields
- **Sequential Navigation**: "Save & Continue" buttons automatically navigate to the next section
- **Progress Tracking**: Real-time progress indicator showing completion status
- **Backward Navigation**: "Previous" buttons to go back to previous sections
- **Multiple Resume Sections**:
  - Personal Information
  - Work Experience
  - Education
  - Skills (categorized)
  - Projects
  - Contact Information
  - Certifications

## 📁 Project Structure

```
src/components/ResumeEditor/
├── Editor.jsx                 # Main editor component with context provider
├── Navbar.jsx                 # Top navigation bar
├── Sidebar.jsx                # Collapsible sidebar navigation
├── ResumePreview.jsx          # Live resume preview component
└── sections/
    ├── PersonalInfoForm.jsx   # Personal information form
    ├── ExperienceForm.jsx     # Work experience form
    ├── EducationForm.jsx      # Education form
    ├── SkillsForm.jsx         # Skills form with categories
    ├── ProjectsForm.jsx       # Projects form
    ├── ContactForm.jsx        # Contact information form
    └── CertificationForm.jsx  # Certifications form
```

## 🛠️ Components Overview

### Main Components

#### `Editor.jsx`
- **Purpose**: Main orchestrator component
- **Features**:
  - Provides Resume Context for state management
  - Handles section switching
  - Manages preview toggle
  - Contains all resume data state

#### `ResumePreview.jsx`
- **Purpose**: Live preview of the resume
- **Features**:
  - Real-time updates as user types
  - Professional resume layout
  - Responsive design
  - Print-ready format

#### `Sidebar.jsx`
- **Purpose**: Navigation between different resume sections
- **Features**:
  - Collapsible design
  - Progress indicator
  - Active section highlighting
  - Mobile-responsive

### Form Components

Each form component in the `sections/` directory handles a specific part of the resume:

1. **PersonalInfoForm**: Basic personal information and professional summary
2. **ExperienceForm**: Work experience with add/edit/delete functionality
3. **EducationForm**: Educational background with GPA and descriptions
4. **SkillsForm**: Categorized skills (Technical, Soft, Languages, Tools, Other)
5. **ProjectsForm**: Personal/professional projects with technologies and links
6. **ContactForm**: Professional social media links and websites
7. **CertificationForm**: Professional certifications with expiry dates

## 🎯 Usage

### Basic Setup

1. Import the main Editor component:
```jsx
import Editor from './components/ResumeEditor/Editor';

function App() {
  return (
    <div>
      <Editor />
    </div>
  );
}
```

### Using the Resume Context

Access resume data and navigation functions in any child component:

```jsx
import { useResumeContext } from '../Editor';

const MyComponent = () => {
  const { 
    resumeData, 
    updateResumeData, 
    goToNextSection, 
    goToPreviousSection,
    activeSection 
  } = useResumeContext();
  
  // Access data
  const { personalInfo, experience, skills } = resumeData;
  
  // Update data
  const handleUpdate = (newData) => {
    updateResumeData('personalInfo', newData);
  };
  
  // Navigate to next section
  const handleSaveAndContinue = () => {
    // Perform validation if needed
    if (isValid) {
      goToNextSection();
    }
  };
  
  return (
    // Your component JSX
  );
};
```

### Data Structure

The resume data follows this structure:

```javascript
{
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    summary: ''
  },
  experience: [
    {
      id: timestamp,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    }
  ],
  education: [
    {
      id: timestamp,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentlyStudying: false,
      gpa: '',
      description: ''
    }
  ],
  skills: [
    {
      id: timestamp,
      name: '',
      category: 'technical|soft|languages|tools|other'
    }
  ],
  projects: [
    {
      id: timestamp,
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
      isOngoing: false
    }
  ],
  contact: {
    linkedin: '',
    github: '',
    website: '',
    portfolio: ''
  },
  certifications: [
    {
      id: timestamp,
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      neverExpires: false,
      description: ''
    }
  ]
}
```

## 🎨 Styling

The project uses Tailwind CSS with custom CSS variables defined in `src/index.css`:

```css
:root {
  --white: #ffffff;
  --black: #000112;
  --gray-dark: #404553;
  --gray-medium: #4E4D4D;
  --gray-light: #E4E7EB;
  --red-primary: #EB5757;
  --blue-primary: rgb(0, 115, 230);
  --blue-dark: #2A50C1;
}
```

## 🔧 Customization

### Adding New Sections

1. Create a new form component in `sections/`
2. Add the section to the `sidebarItems` array in `Sidebar.jsx`
3. Add the section to the `sectionComponents` object in `Editor.jsx`
4. Update the resume data structure and preview component

### Modifying the Preview Layout

Edit `ResumePreview.jsx` to change the resume layout, styling, or add new sections.

### Changing the Theme

Modify the CSS variables in `src/index.css` or add new Tailwind classes.

## 📱 Responsive Design

The editor is fully responsive with:
- Mobile-first design approach
- Collapsible sidebar for mobile devices
- Responsive grid layouts in forms
- Touch-friendly interface elements

## 🚀 Features in Detail

### Sequential Navigation
- **Save & Continue**: Automatically moves to the next section after saving
- **Previous Button**: Navigate back to previous sections
- **Form Validation**: Required field validation before proceeding
- **Smart Progress**: Only Personal Info requires all fields; other sections are optional

### Live Preview
- Real-time updates as users type
- Toggle preview on/off
- Professional resume layout
- Print-ready format

### Form Validation
- Required field indicators
- URL validation for links
- Email format validation
- Character limits for text areas
- Section completion validation

### User Experience
- Sequential workflow guidance
- Real-time progress tracking
- Clear and intuitive interface
- Responsive button layouts
- Completion celebration
- **One-click skill addition**: Click popular skills to instantly add them
- **Smart duplicate prevention**: Already added items show checkmarks and are disabled
- **Quick certification setup**: Popular certifications can be added with one click
- **Multiple download options**: PDF download, direct printing, and JSON data export
- **Smart download availability**: Download button appears when minimum data is entered

## 🔄 State Management

The application uses React Context for state management:
- Centralized resume data
- Easy access from any component
- Efficient updates and re-renders
- Type-safe with proper TypeScript (if implemented)

## 📄 Export Options

The application provides multiple export options:

### **PDF Download**
- High-quality PDF generation using jsPDF and html2canvas
- Automatic filename with user's name
- A4 format optimized for printing
- Professional layout preservation

### **Direct Printing**
- Browser-based printing with optimized layout
- Print-ready formatting
- Automatic page breaks

### **Data Export**
- JSON export for backup and data portability
- Includes all resume data with timestamp
- Easy to import/restore functionality

### **Smart Availability**
- Download button appears when minimum data is entered (name and email)
- Located in top navigation for easy access
- Dropdown menu with multiple export options

## 🤝 Contributing

To extend this boilerplate:
1. Follow the existing component structure
2. Use the established naming conventions
3. Maintain responsive design principles
4. Add proper validation for new fields
5. Update the preview component for new sections

## 📝 License

This boilerplate is provided as-is for educational and development purposes.
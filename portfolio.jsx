import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code, GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Download, Play, Pause, Briefcase } from 'lucide-react';import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [skillsTab, setSkillsTab] = useState('technical');
  const [experienceTab, setExperienceTab] = useState('education');
  const [toolsTab, setToolsTab] = useState('All');
  const [isPlaying, setIsPlaying] = useState(false); 
  
  const formRef = useRef();
  const audioRef = useRef(null);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const enableAutoplay = () => {
      setIsPlaying(true);
      document.body.removeEventListener('click', enableAutoplay);
    };
    
    document.body.addEventListener('click', enableAutoplay);
    
    return () => {
      document.body.removeEventListener('click', enableAutoplay);
    };
  }, []); 

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.log("Audio autoplay was prevented.");
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const sendEmail = (e) => {
    e.preventDefault();
    const serviceID = 'service_m5imylg';
    const templateID = 'template_5d9k5ia';
    const publicKey = '_DYTUDB_14phqE19z';

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
    .then(
      (result) => {
        toast.success('Message sent successfully!');
        formRef.current.reset();
      },
      (error) => {
        toast.error('Something went wrong. Please try again.');
        console.error(error.text);
      }
    );
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'tools', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useTypedText = (words, speed = 100, pause = 1500) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [forward, setForward] = useState(true);

    useEffect(() => {
        if (index >= words.length) return;

        if (forward && subIndex === words[index].length + 1) {
            setTimeout(() => setForward(false), pause);
            return;
        }

        if (!forward && subIndex === 0) {
            setForward(true);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (forward ? 1 : -1));
        }, forward ? speed : speed / 2);

        return () => clearTimeout(timeout);
    }, [subIndex, index, forward, words, speed, pause]);

    return words[index].substring(0, subIndex);
  };

  const yourName = "Ewan Dirubut";
  
  // Custom JSX Introduction to highlight Ebizclouds
  const introduction = (
    <span>
      I am an Associate Software Engineer at <strong className="text-xl text-red-500">Ebizclouds</strong>, specializing in enterprise ERP systems, database design, and business process automation. With a strong foundation in backend architecture and reporting, I focus on building scalable modules for finance, inventory, and HR. I am passionate about transforming complex business logic into efficient, automated digital solutions that drive real-world impact.
    </span>
  );
  
  const roles = ['Associate Software Engineer', 'ERP Developer', 'Business Automation Specialist'];
  const typedText = useTypedText(roles, 100, 1500);

  const technicalSkills = [
      { name: 'ERP Development', level: 85 },
      { name: 'PostgreSQL / MariaDB / SQL', level: 90 },
      { name: 'Java / Backend', level: 85 },
      { name: 'Auvit Framework', level: 85 },
      { name: 'JasperReports', level: 80 },
      { name: 'Database Design', level: 90 },
      { name: 'Git/GitHub', level: 88 },
  ];  

  const softSkills = [
      { name: 'Problem Solving', level: 95 },
      { name: 'Business Logic Analysis', level: 90 },
      { name: 'Communication', level: 90 },
      { name: 'Time Management', level: 85 },
      { name: 'Team Collaboration', level: 88 },
  ];

  const educationData = [
      {
          year: 'Nov 2024 - Jan 2026',
          title: 'Higher National Diploma in Software Engineering',
          institution: 'National Institute of Business Management (NIBM)',
          description: 'Focused on advanced software development, programming, and enterprise database management.'
      },
      {
          year: '2024',
          title: 'Career Essentials in Generative AI',
          institution: 'Microsoft and LinkedIn',
          description: 'Covered Computer Ethics, Artificial Intelligence (AI), Generative AI, and Microsoft Copilot.'
      },
      {
          year: '2023 - 2024',
          title: 'Diploma in Software Engineering',
          institution: 'National Institute of Business Management (NIBM)',
          description: 'Gained hands-on experience with core software engineering techniques and tools.'
      },
      {
          year: '2021',
          title: 'Introduction to Business Management',
          institution: "King's College London",
          description: 'Developed foundational understanding of organizational structures and business workflows.'
      },
  ];

  const experienceData = [
       {
        year: 'Jan 2026 - Present',
        title: 'Associate Software Engineer',
        institution: 'Ebizclouds',
        description: 'Developing and customizing enterprise ERP systems using the Auvit Framework. Responsible for business process automation, database design in PostgreSQL & MariaDB, and building robust backend modules for Finance, Inventory, and HR operations using JasperReports.'
      },
       {
        year: '2020 - Present',
        title: 'Freelance Developer & Designer',
        institution: 'Self-employed',
        description: 'Collaborated with clients to deliver digital solutions including full-stack web development, digital content, and branding. Managed end-to-end project delivery and client communications.'
      },
      {
        year: '2020 - 2021',
        title: 'Data Entry Operator',
        institution: "Abdul Aziz & Son's Lanka fuel mart",
        description: 'Managed and processed large sets of data. Developed an understanding of data management systems and business data workflows.'
      },
  ];

  const projects = [
     {
        title: 'Tuition Management Android App',
        category: 'Mobile App',
        description: 'Designed to help tuition centers streamline their operations and enhance learning experiences. This app simplifies student management, attendance tracking, assignment submissions, and much more.',
        technologies: ['Android Studio', 'Firebase (Firestore, Firebase Storage)', 'QR Code Scanning'],
        image: 'MAD.png',  
        github: 'https://github.com/ewan1027/MAD.git',  
    },
      {
          title: 'Smart Parcel Box',
          category: 'IoT Project',
          description: "This system automates the package drop-off process, ensuring deliveries are secure, constantly monitored, and accessible only by the owner.",
          technologies: ['ESP8266', 'Firebase', 'Sensors', 'Servo Motor'],
          image: 'https://i.postimg.cc/nLgG4FkT/IOT.jpg',
          github: 'https://github.com/ewan1027', 
      },
      {
          title: 'Autonomous Luggage Transporter Robot',
          category: 'IoT Project',
          description: 'This robot automates luggage handling in airports, using line-following and obstacle detection for safe navigation. It features weight measurement, RFID-based gate selection, and a secure luggage compartment.',
          technologies: ['Arduino Mega', 'IR & Ultrasonic Sensors', 'RFID', 'Bluetooth', 'Servo Motors'],
          image: 'https://i.postimg.cc/QN50qTv7/Robot.jpg',
          github: 'https://github.com/ewan1027', 
      },
       {
          title: 'Urban Food E-Commerce Platform',
          category: 'Web App',
          description: 'A fresh food e-commerce platform connecting customers with healthy, high-quality products. Features a robust backend with MongoDB & SQL and a user-friendly frontend.',
          technologies: ['PHP', 'HTML', 'CSS', 'MongoDB', 'SQL'],
          image: 'https://i.postimg.cc/SKTtwbGz/Urban-Food.png',
          github: 'https://github.com/ewan1027/Urban-Food-.git',
      },
      {
          title: 'Modern Room Clothing Website',
          category: 'Web App',
          description: 'A fully developed, responsive e-commerce website for a clothing brand, built with HTML, CSS, and JavaScript. It features a secure authentication system and a clean, intuitive UI/UX.',
          technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
          image: 'https://i.postimg.cc/s2DN6g5r/Modern-Room.png',
          github: 'https://github.com/ewan1027/Modern-Room-Clothing-Website',
      },
  ];
  
  const socialLinks = {
      github: "https://github.com/ewan1027",
      linkedin: "https://www.linkedin.com/in/ewandirubut",
      facebook: "https://web.facebook.com/ewan.dirubut",
      instagram: "https://www.instagram.com/btwewan/"
  };

  const contactInfo = {
      email: "ewan6852@ebizclouds.com",
      phone: "+94 773681923",
      location: "Colombo, Sri Lanka"
  };

  const cvUrl = "https://drive.google.com/file/d/1P06yRlajiRuLEGcUUK2Mn-GHNX7ugcxq/view?usp=drive_link"; 
  const profilePicUrl = "https://i.postimg.cc/zBNGvYnF/image-jpeg.jpg";

  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects.filter((project) => {
      if (activeCategory === 'All') return true;
      return project.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black ">
        <audio ref={audioRef} src="/background-music.mp3" loop />

        <button
          onClick={toggleMusic}
          className="fixed z-50 flex items-center justify-center w-12 h-12 text-white transition-all border rounded-full bottom-5 right-5 bg-red-600/50 backdrop-blur-sm border-white/20 hover:bg-red-600"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <nav className="fixed top-0 z-50 w-full border-b bg-black/20 backdrop-blur-md border-white/10">
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-500 via-red-700 to-red-900 bg-clip-text">
                        {yourName}
                    </div>
                    
                    <div className="hidden space-x-8 md:flex">
                        {['home', 'about', 'projects', 'tools','contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`capitalize transition-all duration-300 hover:text-red-600 ${
                                    activeSection === item 
                                    ? 'text-red-600 border-b-2 border-red-600' 
                                    : 'text-white/80'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <button
                        className="text-white md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t md:hidden bg-black/40 backdrop-blur-md border-white/10">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {['home', 'about', 'projects','tools', 'contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="block w-full px-3 py-2 text-left capitalize transition-colors text-white/80 hover:text-red-600"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>

        <section id="home" className="flex items-center justify-center min-h-screen px-6 pt-20">
            <div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2">
                <div className="order-2 space-y-6 md:order-1 animate-fade-in">
                    <h1 className="text-4xl font-bold text-red-600 md:text-6xl">
                        Hi, I'm <span className="text-red-600">{yourName.split(' ')[0]}</span>
                    </h1>
                    <div className="text-2xl font-semibold text-gray-300 md:text-3xl">
                        I'm an <span className="text-red-500">{typedText}</span>
                    </div>
                    <p className="max-w-lg text-lg leading-relaxed text-gray-400">
                        {introduction}
                    </p>
                    
                    <div className="flex space-x-6">
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 transition-colors duration-300 hover:text-red-600">
                            <Github />
                        </a>
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 transition-colors duration-300 hover:text-red-600">
                            <Linkedin />
                        </a>
                    </div>
                    
                    <a href={cvUrl} download className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25">
                        <Download size={18} />
                        Download CV
                    </a>
                </div>
                
                <div className="flex justify-center order-1 md:order-2">
                    <div className="relative">
                        <div className="w-64 h-64 transition-transform duration-500 transform shadow-2xl md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 shadow-red-600/25 rotate-3 hover:rotate-0"></div>
                        <img 
                            src={profilePicUrl}
                            alt="Profile" 
                            className="absolute top-0 left-0 object-cover w-64 h-64 transition-transform duration-500 transform border-4 border-red-600 md:w-80 md:h-80 rounded-2xl -rotate-3 hover:rotate-0"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section id="about" className="px-4 py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
                    About Me
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Changed from generic User Intro to Professional Experience Profile */}
                    <div className="p-8 transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:transform hover:scale-105">
                        <div className="flex items-center mb-6">
                            <Briefcase className="mr-3 text-red-600" size={24} />
                            <h3 className="text-2xl font-bold text-white">Professional Experience</h3>
                        </div>
                        <p className="leading-relaxed text-white/80">
                            {introduction}
                        </p>
                        <div className="flex mt-6 space-x-4">
                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="transition-colors text-white/60 hover:text-red-600"><Github size={20} /></a>
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors text-white/60 hover:text-red-600"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="p-8 transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-600/50 hover:transform hover:scale-105">
                        <div className="flex items-center mb-6">
                            <Code className="mr-3 text-red-600" size={24} />
                            <h3 className="text-2xl font-bold text-white">Skills</h3>
                        </div>
                        <div className="flex p-1 mb-6 rounded-lg bg-white/5">
                            <button onClick={() => setSkillsTab('technical')} className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${skillsTab === 'technical' ? 'bg-gradient-to-r from-red-600 to-pink-900 text-white' : 'text-white/60 hover:text-white'}`}>Technical</button>
                            <button onClick={() => setSkillsTab('soft')} className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${skillsTab === 'soft' ? 'bg-gradient-to-r from-red-600 to-pink-900 text-white' : 'text-white/60 hover:text-white'}`}>Soft Skills</button>
                        </div>
                        <div className="space-y-4">
                            {(skillsTab === 'technical' ? technicalSkills : softSkills).map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2"><span className="text-sm text-white/80">{skill.name}</span><span className="text-sm text-red-500">{skill.level}%</span></div>
                                    <div className="w-full h-2 rounded-full bg-white/10"><div className="h-2 transition-all duration-1000 rounded-full bg-gradient-to-r from-red-600 to-pink-500" style={{ width: `${skill.level}%` }}></div></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-600/50 hover:transform hover:scale-105">
                        <div className="flex items-center mb-6">
                            <GraduationCap className="mr-3 text-red-600" size={24} />
                            <h3 className="text-2xl font-bold text-white">Background</h3>
                        </div>
                        <div className="flex p-1 mb-6 rounded-lg bg-white/5">
                            <button onClick={() => setExperienceTab('education')} className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${experienceTab === 'education' ? 'bg-gradient-to-r from-red-600 to-pink-900 text-white' : 'text-white/60 hover:text-white'}`}>Education</button>
                            <button onClick={() => setExperienceTab('experience')} className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${experienceTab === 'experience' ? 'bg-gradient-to-r from-red-600 to-pink-900 text-white' : 'text-white/60 hover:text-white'}`}>Experience</button>
                        </div>
                        <div className="space-y-6">
                            {(experienceTab === 'education' ? educationData : experienceData).map((item, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-red-500/30">
                                    <div className="absolute top-0 w-3 h-3 bg-red-500 rounded-full -left-2"></div>
                                    <div className="mb-1 text-sm font-semibold text-red-500">{item.year}</div>
                                    <h4 className="mb-1 font-semibold text-white">{item.title}</h4>
                                    <p className="mb-2 text-sm text-red-500">{item.institution}</p>
                                    <p className="text-sm text-white/60">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="projects" className="px-4 py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
                    Featured Projects
                </h2>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['All', 'Web App', 'IoT Project', 'Mobile App', 'UI/UX Design', 'Desktop App'].map((category) => (
                        <button key={category} onClick={() => { setActiveCategory(category); setShowAll(false); }} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 border border-white/20 ${activeCategory === category ? 'bg-gradient-to-r from-red-600 to-pink-800 text-white' : 'text-white/70 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-800 hover:text-white'}`}>
                            {category}
                        </button>
                    ))}
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.slice(0, showAll ? filteredProjects.length : 6).map((project, index) => (
                        <div key={index} className="overflow-hidden transition-all duration-300 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-600/50 hover:transform hover:scale-105 group">
                            <div className="relative overflow-hidden"><img src={project.image} alt={project.title} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div></div>
                            <div className="p-6">
                                <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
                                <p className="mb-4 leading-relaxed text-white/70">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, techIndex) => (<span key={techIndex} className="px-3 py-1 text-sm text-red-400 border rounded-full bg-red-700/20 border-red-500/30">{tech}</span>))}
                                </div>
                                <div className="flex gap-4 mt-4">
                                    {project.github && (<a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-red-600 transition-colors hover:text-red-500"><Github className="mr-1" size={18} /> GitHub</a>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!showAll && filteredProjects.length > 6 && (
                    <div className="mt-12 text-center">
                        <button onClick={() => setShowAll(true)} className="px-6 py-3 font-semibold text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25">
                            View More
                        </button>
                    </div>
                )}
            </div>
        </section>

        <section id="tools" className="px-4 py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
                    Tools & Technics
                </h2>
                <div className="flex justify-center mb-12">
                    <div className="flex flex-wrap justify-center p-2 border rounded-xl bg-white/5 backdrop-blur-md border-white/10">
                        {/* Reordered to highlight Databases and Frameworks */}
                        {['All', 'Databases', 'Frameworks', 'Languages', 'Tools'].map((category) => (
                            <button key={category} onClick={() => setToolsTab(category)} className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${toolsTab === category ? 'bg-gradient-to-r from-red-600 to-pink-800 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
                    {/* Database Section */}
                    {(toolsTab === 'All' || toolsTab === 'Databases') && [
                        { name: 'PostgreSQL', color: '#336791', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                        { name: 'MariaDB', color: '#003545', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg' },
                        { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                        { name: 'SQL', color: '#CC292B', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqldeveloper/sqldeveloper-original.svg' },
                    ].map((tool, index) => (<div key={index} className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"><div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full" style={{ backgroundColor: `${tool.color}20` }}><img src={tool.icon} alt={tool.name} className="w-10 h-10" /></div><h3 className="font-semibold text-center text-white transition-colors group-hover:text-red-400">{tool.name}</h3></div>))}
                    
                    {/* Frameworks Section */}
                    {(toolsTab === 'All' || toolsTab === 'Frameworks') && [
                        { name: 'Auvit Framework', color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' }, // Webpack cube used as generic framework visualization
                        { name: 'JasperReports', color: '#31A8FF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                        { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                        { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                    ].map((tool, index) => (<div key={index} className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"><div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full" style={{ backgroundColor: `${tool.color}20` }}><img src={tool.icon} alt={tool.name} className="w-10 h-10" /></div><h3 className="font-semibold text-center text-white transition-colors group-hover:text-red-400">{tool.name}</h3></div>))}

                    {/* Languages Section */}
                    {(toolsTab === 'All' || toolsTab === 'Languages') && [
                        { name: 'Java', color: '#ED8B00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                        { name: 'PHP', color: '#777BB4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
                        { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                        { name: 'HTML/CSS', color: '#E34F26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                    ].map((tool, index) => (<div key={index} className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"><div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full" style={{ backgroundColor: `${tool.color}20` }}><img src={tool.icon} alt={tool.name} className="w-10 h-10" /></div><h3 className="font-semibold text-center text-white transition-colors group-hover:text-red-400">{tool.name}</h3></div>))}

                    {/* General Tools Section */}
                    {(toolsTab === 'All' || toolsTab === 'Tools') && [
                        { name: 'Git', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                        { name: 'VS Code', color: '#007ACC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                        { name: 'Android Studio', color: '#3DDC84', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
                        { name: 'Figma', color: '#F24E1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                    ].map((tool, index) => (<div key={index} className="flex flex-col items-center p-6 transition-all duration-300 transform border bg-white/5 backdrop-blur-md rounded-2xl border-white/10 hover:border-red-400/50 hover:scale-105 hover:shadow-lg group"><div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full" style={{ backgroundColor: `${tool.color}20` }}><img src={tool.icon} alt={tool.name} className="w-10 h-10" /></div><h3 className="font-semibold text-center text-white transition-colors group-hover:text-red-400">{tool.name}</h3></div>))}
                </div>
            </div>
        </section>

        <section id="contact" className="px-4 py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-16 text-4xl font-bold text-center text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-red-800 bg-clip-text">
                    Let's Connect
                </h2>
                <div className="grid gap-10 md:grid-cols-2">
                    <div className="flex flex-col h-full p-8 border shadow-lg rounded-2xl bg-white/5 backdrop-blur-md border-white/10">
                        <h3 className="mb-6 text-2xl font-bold text-white">Get in Touch</h3>
                        <p className="mb-8 text-white/70">Feel free to reach out via email, phone, or the contact form.</p>
                        <div className="mb-8 space-y-6">
                            <div className="flex items-center gap-4"><Mail className="text-red-600" size={24} /><div><h4 className="font-semibold text-white">Email</h4><p className="text-white/60">{contactInfo.email}</p></div></div>
                            <div className="flex items-center gap-4"><Phone className="text-red-600" size={24} /><div><h4 className="font-semibold text-white">Phone</h4><p className="text-white/60">{contactInfo.phone}</p></div></div>
                            <div className="flex items-center gap-4"><MapPin className="text-red-600" size={24} /><div><h4 className="font-semibold text-white">Location</h4><p className="text-white/60">{contactInfo.location}</p></div></div>
                        </div>
                        <div className="flex mt-auto space-x-6">
                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-red-600" aria-label="GitHub"><Github size={24} /></a>
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-red-600" aria-label="LinkedIn"><Linkedin size={24} /></a>
                            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-red-600" aria-label="Facebook"><Facebook size={24} /></a>
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-red-600" aria-label="Instagram"><Instagram size={24} /></a>
                        </div>
                    </div>
                    <div className="p-8 border shadow-lg rounded-2xl bg-white/5 backdrop-blur-md border-white/10">
                        <h3 className="mb-6 text-2xl font-bold text-white">Send a Message</h3>
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                            <input type="text" name="user_name" placeholder="Your Name" required className="w-full p-4 text-white border bg-black/30 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                            <input type="email" name="user_email" placeholder="Your Email" required className="w-full p-4 text-white border bg-black/30 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                            <textarea name="message" rows="5" placeholder="Your Message" required className="w-full p-4 text-white border bg-black/30 border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                            <button type="submit" className="px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-red-600 to-pink-800 hover:from-red-700 hover:to-pink-600 hover:scale-105 hover:shadow-red-500/25">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <footer className="px-4 py-8 border-t border-white/10">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-white/60">
                    © {new Date().getFullYear()} {yourName}. Built with React. All rights reserved.
                </p>
            </div>
        </footer>
    </div>
  );
};

export default Portfolio;
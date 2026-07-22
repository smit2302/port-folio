// App.jsx
import React, { useState, useEffect, useRef } from 'react';


const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    // Intersection Observer for active nav link
    useEffect(() => {
        const observers = sections.map((section) => {
            const element = document.getElementById(section);
            if (!element) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(section);
                    }
                },
                { threshold: 0.3 }
            );
            observer.observe(element);
            return observer;
        });

        return () => {
            observers.forEach((obs) => obs?.disconnect());
        };
    }, []);

    // Typing effect for hero
    const [typedText, setTypedText] = useState('');
    const fullText = 'Full-Stack Developer';
    const [isDeleting, setIsDeleting] = useState(false);
    const [typeIndex, setTypeIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (typeIndex < fullText.length) {
                    setTypedText(fullText.substring(0, typeIndex + 1));
                    setTypeIndex(typeIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (typeIndex > 0) {
                    setTypedText(fullText.substring(0, typeIndex - 1));
                    setTypeIndex(typeIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTimeout(() => setTypeIndex(0), 500);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timer);
    }, [typeIndex, isDeleting]);

    // Smooth scroll
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="app">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo" onClick={() => scrollToSection('home')}>
                        <span className="logo-text">Portfolio</span>
                    </div>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        {sections.map((section) => (
                            <button
                                key={section}
                                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                                onClick={() => scrollToSection(section)}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </button>
                        ))}
                    </div>

                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="section hero">
                <div className="hero-content">
                    <div className="hero-badge">👋 Welcome to my portfolio</div>
                    <h1 className="hero-title">
                        Hi, I'm <span className="highlight">Smit Sasiya </span>
                    </h1>
                    <p className="hero-subtitle">
                        <span className="typed-text">{typedText}</span>
                        <span className="cursor">|</span>
                    </p>
                    <p className="hero-description">
                        I craft beautiful, responsive, and user-friendly web experiences.
                        Passionate about clean code and modern design.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                            Get In Touch
                        </button>
                        <button className="btn-secondary" onClick={() => scrollToSection('projects')}>
                            View My Work
                        </button>
                    </div>
                    <div className="hero-social">
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="profile-circle">
                        <span className="emoji-avatar">👨‍💻</span>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section about">
                <div className="container">
                    <h2 className="section-title">About Me</h2>
                    <div className="about-grid">
                        <div className="about-content">
                            <p>
                                I'm a passionate Full-Stack Developer with a love for creating
                                beautiful, functional, and user-centered digital experiences.
                                With 5+ years of experience in web development, I specialize in
                                building modern web applications using React, Node.js, and
                                cutting-edge technologies.
                            </p>
                            <p>
                                My journey in tech started with a curiosity for how things work
                                on the web, and it quickly evolved into a career focused on
                                solving real-world problems through code. I believe in writing
                                clean, maintainable code and continuously learning new skills.
                            </p>
                            <div className="about-info">
                                <div><span>📍</span> San Francisco, CA</div>
                                <div><span>🎓</span> B.S. Computer Science</div>
                                <div><span>💼</span> 5+ Years Experience</div>
                                <div><span>📧</span> john@example.com</div>
                            </div>
                        </div>
                        <div className="about-stats">
                            <div className="stat-card">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">30+</span>
                                <span className="stat-label">Happy Clients</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Commitment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section skills">
                <div className="container">
                    <h2 className="section-title">My Skills</h2>
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h3>Frontend</h3>
                            <div className="skill-items">
                                <div className="skill-item">
                                    <span>React</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '90%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>TypeScript</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '85%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>CSS / Tailwind</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '88%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>Next.js</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '75%' }} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="skill-category">
                            <h3>Backend</h3>
                            <div className="skill-items">
                                <div className="skill-item">
                                    <span>Node.js</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '85%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>Python</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '80%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>SQL / MongoDB</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '78%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>GraphQL</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '70%' }} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="skill-category">
                            <h3>Tools & Others</h3>
                            <div className="skill-items">
                                <div className="skill-item">
                                    <span>Git / GitHub</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '90%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>Docker</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '65%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>AWS</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '60%' }} /></div>
                                </div>
                                <div className="skill-item">
                                    <span>Figma</span>
                                    <div className="skill-bar"><div className="skill-progress" style={{ width: '70%' }} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section projects">
                <div className="container">
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="projects-grid">
                        {[
                            {
                                title: 'E-Commerce Platform',
                                desc: 'A full-featured online store with payment processing, inventory management, and real-time order tracking.',
                                tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                                emoji: '🛒'
                            },
                            {
                                title: 'Task Management App',
                                desc: 'A collaborative task management tool with drag-and-drop, team workspaces, and automated workflows.',
                                tags: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind'],
                                emoji: '📋'
                            },
                            {
                                title: 'Portfolio Builder',
                                desc: 'A visual portfolio builder that helps creative professionals showcase their work with customizable templates.',
                                tags: ['React', 'Framer Motion', 'Firebase'],
                                emoji: '🎨'
                            },
                            {
                                title: 'AI Chat Assistant',
                                desc: 'An intelligent chat application powered by AI that provides contextual responses and learns from user interactions.',
                                tags: ['Python', 'FastAPI', 'React', 'WebSocket'],
                                emoji: '🤖'
                            }
                        ].map((project, index) => (
                            <div key={index} className="project-card">
                                <div className="project-emoji">{project.emoji}</div>
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <a href="#" className="project-link">Live Demo →</a>
                                    <a href="#" className="project-link">Source Code</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section contact">
                <div className="container">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="contact-grid">
                        <div className="contact-info">
                            <p className="contact-text">
                                Have a question or want to work together? Feel free to reach out!
                                I'm always open to discussing new projects, creative ideas, or
                                opportunities to be part of your vision.
                            </p>
                            <div className="contact-details">
                                <div><span>📧</span> john@example.com</div>
                                <div><span>📱</span> +1 (555) 123-4567</div>
                                <div><span>📍</span> San Francisco, CA</div>
                            </div>
                            <div className="contact-social">
                                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </div>
                        </div>
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" placeholder="john@example.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows="4" placeholder="Tell me about your project..." required />
                            </div>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>© 2026 John Doe. Built with ❤️ using React</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
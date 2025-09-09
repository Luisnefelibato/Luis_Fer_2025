// ===== FONDO DE PUNTOS INTERACTIVOS - MANTENER EXACTAMENTE IGUAL =====
// Create full page canvas
let canvas = document.createElement('canvas');
canvas.id = 'fullPageDotsCanvas';
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// Style canvas to cover entire page
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const dots = [];
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
for (let index = 0; index < 100; index++) { // Increased number of dots
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random() * 5)]
    });
}

const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Initialize dots
drawDots();

// Full page mouse interaction
document.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    
    let mouse = {
        x: event.clientX,
        y: event.clientY
    }
    
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
});

window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dots.length = 0;
    for (let index = 0; index < 100; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random() * 5)]
        });
    }
    drawDots();
});

// ===== EFECTOS DE LETRAS - MANTENER EXACTAMENTE IGUAL =====
// Initialize letter effects
const letterBoxes = document.querySelectorAll("[data-letter-effect]");
if (letterBoxes.length > 0) {
    setLetterEffect();
    setInterval(rotateSkills, 2000); // ✅ Cambiado a 2 segundos
}


let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

// Lista de habilidades que rotarán
const skills = [
    "Full Stack Developer", 
    "AI Developer", 
    "Web Designer", 
    "Software Engineer", 
    "UI/UX Enthusiast",
    "React Specialist",
    "Python Developer",
    "JavaScript Expert"
];
let currentSkillIndex = 0;

// Función para aplicar el efecto de animación (SIN incrementar el índice)
const setLetterEffect = function () {
    // Usar el texto actual sin incrementar el índice
    const skillElement = document.querySelector('h1.right[data-letter-effect]');
    if (skillElement && skills[currentSkillIndex]) {
        skillElement.textContent = skills[currentSkillIndex];
    }

    // Loop through all letter boxes
    for (let i = 0; i < letterBoxes.length; i++) {
        // Set initial animation delay
        let letterAnimationDelay = 0;

        // Get all characters from the current letter box
        const letters = letterBoxes[i].textContent.trim();
        // Remove all characters from the current letter box
        letterBoxes[i].textContent = "";

        // Loop through all letters
        for (let j = 0; j < letters.length; j++) {
            // Create a span
            const span = document.createElement("span");

            // Set animation delay on span
            span.style.animationDelay = `${letterAnimationDelay}s`;

            // Set the "in" class on the span if the current letter box is active
            // Otherwise, class is "out"
            if (i === activeLetterBoxIndex) {
                span.classList.add("in");
            } else {
                span.classList.add("out");
            }

            // Pass current letter into span
            span.textContent = letters[j];

            // Add space class on span when the current letter contains a space
            if (letters[j] === " ") span.classList.add("space");

            // Pass the span to the current letter box
            letterBoxes[i].appendChild(span);

            // Skip letterAnimationDelay when the loop is in the last index
            if (j >= letters.length - 1) break;
            // Otherwise, update
            letterAnimationDelay += 0.05;
        }

        // Update totalLetterBoxDelay for the next letter box
        if (i >= letterBoxes.length - 1) break;
        totalLetterBoxDelay += 0.5;
    }

    // Update activeLetterBoxIndex and lastActiveLetterBoxIndex
    lastActiveLetterBoxIndex = activeLetterBoxIndex;
    activeLetterBoxIndex = (activeLetterBoxIndex >= letterBoxes.length - 1) ? 0 : activeLetterBoxIndex + 1;
};

// Función para cambiar el texto cada 2 segundos (SOLO aquí se incrementa)
const rotateSkills = function () {
    // Incrementar SOLO aquí, no en setLetterEffect
    currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    
    // Actualizar todos los elementos con el nuevo skill
    const skillElement = document.querySelector('h1.right[data-letter-effect]');
    if (skillElement) {
        skillElement.textContent = skills[currentSkillIndex];
    }
    
    if (letterBoxes[1]) {
        letterBoxes[1].textContent = skills[currentSkillIndex];
    }
    
    // Aplicar la animación después de cambiar el texto
    setLetterEffect();
};

// ===== NAVEGACIÓN SUAVE =====
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECTS =====
// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(39, 35, 65, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(39, 35, 65, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// ===== FORMULARIO DE CONTACTO =====
// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:luisfgomezosp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From: ${name} (${email})\n\nMessage:\n${message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Message prepared! Your email client should open shortly.', 'success');
    
    // Reset form
    this.reset();
});

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(198, 145, 230, 0.9)'};
        color: white;
        padding: 15px 25px;
        border-radius: 15px;
        backdrop-filter: blur(15px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', () => {
    // Add animation styles to elements
    const animatedElements = document.querySelectorAll(
        '.about-container, .project-card, .timeline-item, .skills-category, .study-card, .contact-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== COUNTER ANIMATION PARA ESTADÍSTICAS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16.67); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + 
                                   (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + 
                                    (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// ===== NAVEGACIÓN ACTIVA =====
// Highlight active navigation item
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX EFFECT PARA SECCIONES =====
// Add subtle parallax effect to section backgrounds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.about-section, .projects-section, .experience-section, .skills-section');
    
    sections.forEach((section, index) => {
        const speed = 0.5 + (index * 0.1);
        section.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// ===== MOBILE MENU FUNCTIONALITY =====
// Add mobile menu toggle functionality
function createMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: #c691e6;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 10px;
        border-radius: 5px;
        transition: all 0.3s ease;
    `;
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            header nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(39, 35, 65, 0.95);
                backdrop-filter: blur(15px);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                border-radius: 0 0 20px 20px;
                z-index: 1000;
            }
            header nav.active {
                transform: translateY(0);
                opacity: 1;
            }
            header nav ul {
                flex-direction: column;
                padding: 20px;
                gap: 15px;
            }
            header nav ul li a {
                display: block;
                width: 100%;
                text-align: center;
                padding: 15px;
            }
        }
        header nav ul li a.active {
            background-color: #c691e6;
            color: #040018;
            box-shadow: 0 0 20px rgba(198, 145, 230, 0.4);
        }
    `;
    document.head.appendChild(mobileStyles);
    
    // Insert mobile menu button
    header.insertBefore(mobileMenuBtn, nav);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// ===== SKILLS HOVER EFFECTS =====
// Add interactive hover effects to skills
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateY(-10px) scale(1.05)';
            skill.style.boxShadow = '0 15px 30px rgba(198, 145, 230, 0.3)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'translateY(0) scale(1)';
            skill.style.boxShadow = 'none';
        });
    });
});

// ===== PROYECTO CARDS HOVER EFFECTS =====
// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.style.boxShadow = '0 25px 60px rgba(198, 145, 230, 0.4), 0 0 60px rgba(198, 145, 230, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        // Add click effect for mobile
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
});

// ===== TYPING EFFECT PARA ABOUT SECTION =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    
    // Initialize counter animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    console.log('🚀 Luis Gómez Portfolio Loaded Successfully!');
    console.log('💻 Full Stack Developer Portfolio');
    console.log('📧 Contact: luisfgomezosp@gmail.com');
});

// ===== EASTER EGG =====
// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showNotification('🎉 Easter Egg Found! You discovered the developer secret!', 'success');
        // Add rainbow effect to the page
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== FUTURISTIC HEADER FUNCTIONALITY =====

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.futuristic-header');

    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && mobileMenuToggle) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && mobileMenuToggle && 
            !navMenu.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Header scroll effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            // Add scrolled class when scrolling down
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id], .banner');
    const navLinksArray = Array.from(navLinks);

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id') || 'home';
            }
        });

        // Special case for banner/home section
        if (window.pageYOffset < 100) {
            current = 'home';
        }

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if ((current === 'home' && href === '#about') || 
                (href === '#' + current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#about') {
                // Scroll to banner section for about
                const banner = document.querySelector('.banner');
                if (banner) {
                    banner.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 90;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Logo click functionality
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced hover effects for nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.setProperty('--hover-intensity', '1');
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.setProperty('--hover-intensity', '0');
        });
    });
});

// ===== CHATBOT FLOTANTE LUISFER CON GEMINI AI =====

class LuisferChatbot {
    constructor() {
        this.apiKey = 'AIzaSyC2sGWOkbp6Z1xfns5cZWM5Ti8nTPWUBEE';
        this.isOpen = false;
        this.isTyping = false;
        this.messageHistory = [];

        // Sistema de prompt específico sobre Luis Gómez
        this.systemPrompt = `Eres Luisfer IA, el asistente virtual personal de Luis Fernando Gómez Ospina. Tu trabajo es responder preguntas sobre su perfil profesional de manera breve y directa.

INFORMACIÓN CLAVE DE LUIS GÓMEZ:

👨‍💼 PERFIL PROFESIONAL:
- Full Stack Developer con 3+ años de experiencia
- Especializado en AI, React, Node.js y tecnologías modernas
- Ubicación: Mosquera, Cundinamarca, Colombia
- Email: luisfgomezosp@gmail.com
- Teléfono: +57 319-3431250
- LinkedIn: linkedin.com/in/luis-fernando-gomez-ospina-0a9295256

🏢 EXPERIENCIA LABORAL:
• ACTUAL (Ene 2025 - Presente): Full-Stack Developer en Antares Innovate
  - Desarrollo de agentes virtuales con IA
  - Migración de sistemas legacy a plataformas frontend modernas
  - Tecnologías: Python, FastAPI, React, AI/ML, Docker

• 2022-Dic 2024: Frontend Developer en Unius Designers
  - Aplicaciones web responsive con React y JavaScript
  - Integración de APIs RESTful, Redux, Context API
  - Optimización de rendimiento y compatibilidad cross-browser

• 2023: Frontend Developer Intern en MajoMaken TeamWork
  - App de automatización de parking con React y Android Studio
  - Gestión de base de datos MySQL

• 2021: Volunteer en INGOODE COMPANY

🚀 PROYECTOS DESTACADOS:
1. AI Virtual Agent Platform - Agentes IA con Python (FastAPI, LangChain), React, OpenAI APIs, Docker, Redis
2. BobFront - Interface web moderna con React (bobfront.vercel.app)
3. Solutions Form - Sistema de formularios avanzado (solutions-form.vercel.app)
4. Contafin - Dashboard financiero con visualización de datos (contafin-front.vercel.app)
5. Nyla Talent - Plataforma de gestión de talentos con IA (nyla-front.vercel.app)
6. Asistenter - Asistente IA conversacional (asistenter-three.vercel.app)

🛠 SKILLS TÉCNICOS:
Frontend: JavaScript, React, Angular, HTML5, CSS3, Responsive Design
Backend: Node.js, Python, FastAPI, Java, RESTful APIs
Databases: MySQL, PostgreSQL, MongoDB
AI/ML: OpenAI API, LangChain, Prompt Engineering, Process Automation
Tools: Git, Docker, Webpack, Tailwind CSS, Redux, Bootstrap

🎓 EDUCACIÓN:
- Electronic Engineering (En curso) - Universidad Nacional Abierta y a Distancia (UNAD)
- Labor Technician in Programming (2023) - Universidad Autónoma de Bucaramanga
- Data Analysis Programming (2022) - Universidad Sergio Arboleda

📊 ESTADÍSTICAS:
- 3+ años de experiencia
- 15+ proyectos completados
- 5+ tecnologías dominadas
- 100% satisfacción del cliente

🗣 IDIOMAS: Español (nativo), Inglés (nivel C1)

INSTRUCCIONES:
- Responde SIEMPRE en máximo 100 palabras
- Sé directo y profesional
- Usa emojis ocasionales para hacer más amigable
- Si preguntan por contacto, da email y teléfono
- Para proyectos, menciona las URLs cuando sea relevante
- Enfócate en los logros y skills más relevantes
- Si no tienes la información exacta, di "Te recomiendo contactar directamente a Luis"`;

        this.init();
    }

    init() {
        this.createChatElements();
        this.attachEventListeners();
        console.log('🤖 Luisfer Chatbot inicializado correctamente');
    }

    createChatElements() {
        // El HTML ya está en el documento, solo necesitamos verificar
        this.floatingBtn = document.getElementById('chat-floating-button');
        this.chatWindow = document.getElementById('chat-window');
        this.chatOverlay = document.getElementById('chat-overlay');
        this.messagesContainer = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-message');
        this.closeBtn = document.getElementById('close-chat');
        this.clearBtn = document.getElementById('clear-chat');
        this.typingIndicator = document.getElementById('typing-indicator');

        if (!this.floatingBtn) {
            console.error('❌ Elementos del chatbot no encontrados. Asegúrate de incluir el HTML del chatbot.');
            return;
        }

        console.log('✅ Elementos del chatbot encontrados y configurados');
    }

    attachEventListeners() {
        // Abrir/cerrar chat
        this.floatingBtn?.addEventListener('click', () => this.toggleChat());
        this.closeBtn?.addEventListener('click', () => this.closeChat());
        this.chatOverlay?.addEventListener('click', () => this.closeChat());

        // Enviar mensajes
        this.sendBtn?.addEventListener('click', () => this.sendMessage());
        this.chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Limpiar chat
        this.clearBtn?.addEventListener('click', () => this.clearChat());

        // Prevenir cierre accidental
        this.chatWindow?.addEventListener('click', (e) => e.stopPropagation());

        // Auto-resize del input
        this.chatInput?.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                this.sendBtn?.removeAttribute('disabled');
            } else {
                this.sendBtn?.setAttribute('disabled', 'true');
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.chatWindow?.classList.add('open');
        this.chatOverlay?.classList.add('show');
        document.body.classList.add('chatbot-active');

        // Focus en el input después de la animación
        setTimeout(() => {
            this.chatInput?.focus();
        }, 400);

        console.log('💬 Chat abierto');
    }

    closeChat() {
        this.isOpen = false;
        this.chatWindow?.classList.remove('open');
        this.chatOverlay?.classList.remove('show');
        document.body.classList.remove('chatbot-active');

        console.log('❌ Chat cerrado');
    }

    async sendMessage() {
        const message = this.chatInput?.value.trim();
        if (!message || this.isTyping) return;

        // Limpiar input
        this.chatInput.value = '';
        this.sendBtn?.setAttribute('disabled', 'true');

        // Agregar mensaje del usuario
        this.addMessage(message, 'user');

        // Mostrar indicador de escritura
        this.showTypingIndicator();

        try {
            // Enviar a Gemini AI
            const response = await this.sendToGemini(message);

            // Ocultar indicador y mostrar respuesta
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');

        } catch (error) {
            console.error('❌ Error al enviar mensaje:', error);
            this.hideTypingIndicator();
            this.addMessage('Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o contacta directamente a Luis en luisfgomezosp@gmail.com', 'bot');
        }
    }

    async sendToGemini(userMessage) {
        this.isTyping = true;

        // Construir el historial de conversación para contexto
        const conversationHistory = this.messageHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Agregar el mensaje actual
        conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        const requestBody = {
            contents: [
                {
                    role: 'user',
                    parts: [{
                        text: this.systemPrompt + "\n\nPregunta del usuario: " + userMessage
                    }]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 200,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const aiResponse = data.candidates[0].content.parts[0].text.trim();

                // Guardar en historial
                this.messageHistory.push(
                    { content: userMessage, type: 'user', timestamp: Date.now() },
                    { content: aiResponse, type: 'bot', timestamp: Date.now() }
                );

                this.isTyping = false;
                return aiResponse;
            } else {
                throw new Error('Respuesta inválida de la API');
            }

        } catch (error) {
            this.isTyping = false;
            console.error('Error en Gemini API:', error);
            throw error;
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = '<div class="avatar-circle">L</div>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = content;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        contentDiv.appendChild(bubbleDiv);
        contentDiv.appendChild(timeDiv);

        if (type === 'user') {
            // Para mensajes del usuario, no mostrar avatar
            messageDiv.appendChild(contentDiv);
        } else {
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
        }

        this.messagesContainer?.appendChild(messageDiv);
        this.scrollToBottom();

        // Animación de entrada
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px)';
            messageDiv.style.transition = 'all 0.3s ease';

            requestAnimationFrame(() => {
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            });
        }, 50);
    }

    showTypingIndicator() {
        this.typingIndicator?.classList.add('show');
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator?.classList.remove('show');
        setTimeout(() => {
            this.typingIndicator.style.display = 'none';
        }, 300);
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.messagesContainer) {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }
        }, 100);
    }

    clearChat() {
        // Confirmar acción
        if (this.messageHistory.length > 0) {
            if (!confirm('¿Estás seguro de que quieres limpiar el chat?')) {
                return;
            }
        }

        // Limpiar mensajes excepto el mensaje de bienvenida
        const welcomeMessage = this.messagesContainer?.querySelector('.bot-message');
        if (this.messagesContainer) {
            this.messagesContainer.innerHTML = '';
            if (welcomeMessage) {
                this.messagesContainer.appendChild(welcomeMessage.cloneNode(true));
            }
        }

        // Limpiar historial
        this.messageHistory = [];

        console.log('🧹 Chat limpiado');

        // Mostrar mensaje de confirmación
        setTimeout(() => {
            this.addMessage('Chat limpiado. ¿En qué más puedo ayudarte? 😊', 'bot');
        }, 500);
    }

    // Método para manejar errores de red
    handleNetworkError() {
        this.addMessage('Parece que hay un problema de conexión. Por favor, verifica tu internet e inténtalo de nuevo. 📡', 'bot');
    }

    // Método para obtener estadísticas del chat
    getChatStats() {
        return {
            messagesCount: this.messageHistory.length,
            isOpen: this.isOpen,
            lastActivity: this.messageHistory.length > 0 ? 
                new Date(this.messageHistory[this.messageHistory.length - 1].timestamp).toLocaleString() : 
                'Sin actividad'
        };
    }
}

// ===== INICIALIZACIÓN DEL CHATBOT =====

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si los elementos del chatbot existen antes de inicializar
    const chatElements = document.getElementById('chat-floating-button');

    if (chatElements) {
        // Inicializar chatbot
        window.luisferChatbot = new LuisferChatbot();
        console.log('🚀 Luisfer Chatbot cargado exitosamente');

        // Pequeña demora para asegurar que todo esté renderizado
        setTimeout(() => {
            const floatingBtn = document.getElementById('chat-floating-button');
            if (floatingBtn) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.transform = 'scale(1)';
                console.log('✨ Botón flotante visible y funcional');
            }
        }, 500);
    } else {
        console.warn('⚠️ Elementos del chatbot no encontrados. Reintentando en 1 segundo...');

        // Reintentar después de 1 segundo
        setTimeout(() => {
            const retryElements = document.getElementById('chat-floating-button');
            if (retryElements) {
                window.luisferChatbot = new LuisferChatbot();
                console.log('🚀 Luisfer Chatbot cargado exitosamente (segundo intento)');
            } else {
                console.error('❌ No se pudieron encontrar los elementos del chatbot. Verifica que el HTML esté incluido correctamente.');
            }
        }, 1000);
    }
});

// ===== UTILIDADES ADICIONALES =====

// Función global para abrir el chat desde cualquier parte
window.openLuisferChat = function() {
    if (window.luisferChatbot) {
        window.luisferChatbot.openChat();
    }
};

// Función global para enviar mensaje programático
window.sendMessageToLuisfer = function(message) {
    if (window.luisferChatbot) {
        window.luisferChatbot.chatInput.value = message;
        window.luisferChatbot.sendMessage();
    }
};

// Manejar redimensionamiento de ventana
window.addEventListener('resize', function() {
    // Ajustar posición del chat en móviles si está abierto
    if (window.luisferChatbot && window.luisferChatbot.isOpen) {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow && window.innerWidth <= 768) {
            chatWindow.style.height = '70vh';
        }
    }
});

// Debug: Función para obtener estadísticas del chat
window.getChatbotStats = function() {
    if (window.luisferChatbot) {
        console.log('📊 Estadísticas del Chatbot:', window.luisferChatbot.getChatStats());
        return window.luisferChatbot.getChatStats();
    }
    return null;
};

console.log('🤖 Luisfer Chatbot Script Cargado - Versión 1.0');
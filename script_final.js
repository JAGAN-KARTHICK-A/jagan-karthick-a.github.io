// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Interactive Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#6c5ce7", "#a29bfe", "#fd79a8"]
        },
        shape: {
            type: ["circle", "triangle", "star"],
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.7,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 4,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 200,
            color: "#6c5ce7",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2.5,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            onmousemove: {
                enable: true,
                mode: "bubble"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 1
                }
            },
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Scroll Transitions
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease';
    observer.observe(section);
});

// Initialize Floating 3D Elements
const initFloatingModels = () => {
    const container = document.getElementById('floating-models');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create multiple floating models
    const models = [];
    const modelCount = 5;
    const colors = [0x6c5ce7, 0xa29bfe, 0xfd79a8, 0x00b894, 0xfdcb6e];
    
    for (let i = 0; i < modelCount; i++) {
        const geometry = new THREE.IcosahedronGeometry(0.5, 0);
        const material = new THREE.MeshPhongMaterial({ 
            color: colors[i % colors.length],
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.7
        });
        
        const model = new THREE.Mesh(geometry, material);
        
        // Random position
        model.position.x = (Math.random() - 0.5) * 10;
        model.position.y = (Math.random() - 0.5) * 10;
        model.position.z = (Math.random() - 0.5) * 10;
        
        // Random rotation speed
        model.userData = {
            rotationSpeed: {
                x: Math.random() * 0.02 - 0.01,
                y: Math.random() * 0.02 - 0.01
            },
            floatSpeed: Math.random() * 0.02 + 0.01
        };
        
        scene.add(model);
        models.push(model);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Update models
        models.forEach(model => {
            model.rotation.x += model.userData.rotationSpeed.x;
            model.rotation.y += model.userData.rotationSpeed.y;
            
            // Floating movement
            model.position.y += Math.sin(Date.now() * model.userData.floatSpeed) * 0.01;
        });
        
        renderer.render(scene, camera);
    };
    animate();

    // Handle scroll interaction
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        camera.position.z = 5 + scrollY * 0.01;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Fetch LeetCode Stats (mock implementation)
const fetchLeetCodeStats = async () => {
    // In a real implementation, you would fetch from LeetCode API
    // This is a mock implementation for demonstration
    return {
        problemsSolved: 175,
        contestRating: "Yet to start",
        globalRank: '680,936'
    };
};

// Update LeetCode Stats
const updateLeetCodeStats = async () => {
    const stats = await fetchLeetCodeStats();
    document.getElementById('problems-solved').textContent = `${stats.problemsSolved}+`;
    document.getElementById('contest-rating').textContent = `${stats.contestRating}`;
    document.getElementById('global-rank').textContent = stats.globalRank;
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFloatingModels();
    updateLeetCodeStats();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active link highlighting
const navLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll reveal animation
const scrollReveal = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: true
});

scrollReveal.reveal('.hero-content, .section-title, .about-content, .education-container, .projects-grid, .contact-form', {
    interval: 200
});

// Particle Background System with Mouse Repulsion Physics
(function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };
    let animationId;
    
    // Configuration
    const config = {
        particleCount: 80,
        connectionDistance: 150,
        repulsionRadius: 120,
        repulsionStrength: 2,
        baseSpeed: 0.5,
        damping: 0.95,
        nodeRadius: 2,
        nodeOpacity: 0.6,
        lineOpacity: 0.2,
        colors: {
            nodes: ['#22D3EE', '#06B6D4', '#3B82F6'],
            lines: '#22D3EE'
        }
    };
    
    // Adjust for mobile devices
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    if (isMobile()) {
        config.particleCount = 40;
        config.connectionDistance = 100;
        config.repulsionRadius = 80;
    }
    
    // Resize canvas to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * config.baseSpeed;
            this.vy = (Math.random() - 0.5) * config.baseSpeed;
            this.radius = config.nodeRadius + Math.random() * 2;
            this.color = config.colors.nodes[Math.floor(Math.random() * config.colors.nodes.length)];
            this.opacity = config.nodeOpacity + Math.random() * 0.4;
        }
        
        update() {
            // Mouse repulsion physics
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    const repulsion = force * config.repulsionStrength;
                    
                    this.vx += Math.cos(angle) * repulsion;
                    this.vy += Math.sin(angle) * repulsion;
                }
            }
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Apply damping
            this.vx *= config.damping;
            this.vy *= config.damping;
            
            // Boundary handling - wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const count = isMobile() ? 40 : config.particleCount;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connection lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    const opacity = (1 - distance / config.connectionDistance) * config.lineOpacity;
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = config.colors.lines;
                    ctx.globalAlpha = opacity;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    // Draw radial gradient around cursor
    function drawCursorGlow() {
        if (mouse.x === null || mouse.y === null) return;
        
        const gradient = ctx.createRadialGradient(
            mouse.x, mouse.y, 0,
            mouse.x, mouse.y, mouse.radius
        );
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0.15)');
        gradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.05)');
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with gradient background
        ctx.fillStyle = '#FAFBFC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw cursor glow
        drawCursorGlow();
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Mouse tracking
    let lastMouseX = null;
    let lastMouseY = null;
    let mouseVelocity = 0;
    
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        
        // Calculate mouse velocity for stronger repulsion on fast movement
        if (lastMouseX !== null && lastMouseY !== null) {
            const dx = mouse.x - lastMouseX;
            const dy = mouse.y - lastMouseY;
            mouseVelocity = Math.sqrt(dx * dx + dy * dy);
            
            // Increase repulsion radius based on velocity
            mouse.radius = Math.min(config.repulsionRadius + mouseVelocity * 0.5, 200);
        }
        
        lastMouseX = mouse.x;
        lastMouseY = mouse.y;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
        mouseVelocity = 0;
    });
    
    // Touch support for mobile
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
    });
    
    canvas.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 250);
    });
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Initialize and start animation
        resizeCanvas();
        initParticles();
        animate();
    } else {
        // For users who prefer reduced motion, just show a static gradient
        ctx.fillStyle = '#FAFBFC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
})();

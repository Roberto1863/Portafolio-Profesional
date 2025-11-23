/**
 * BodrioScript.js - Refactorizado
 * Estándares: ES6+, DRY, Separation of Concerns
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAudioPlayer();
    initModals();
    initAnimations();
});

/* =========================================
   DATA MODELS (Separación de Datos)
   ========================================= */
const TEAM_DATA = {
    1: {
        name: 'Integrante 1',
        role: 'Líder Creativo & Diseñador Principal',
        bio: 'Especialista en diseño gráfico y dirección creativa. Con más de 5 años de experiencia en diseño UI/UX y branding.',
        skills: ['Diseño UI/UX', 'Dirección Creativa', 'Branding'],
        email: 'viru@bodrio.com'
    },
    2: {
        name: 'Integrante 2',
        role: 'Productor Audiovisual & Editor',
        bio: 'Especialista en producción de video y edición. Encargado de dar vida a nuestros proyectos multimedia.',
        skills: ['Edición de Video', 'Producción Audiovisual', 'Postproducción'],
        email: 'Monchito@bodrio.com'
    },
    3: {
        name: 'Integrante 3',
        role: 'Desarrollador & Especialista en Audio',
        bio: 'Encargado del desarrollo web y producción de audio. Creador de la mítica Radio Virus.',
        skills: ['Desarrollo Web', 'Producción de Audio', 'JavaScript'],
        email: 'bodrio@bodrio.com'
    },
    4: {
        name: 'Integrante 4',
        role: 'Diseñador Gráfico & Marketing',
        bio: 'Creativo apasionado por el diseño gráfico y estrategias de marketing digital.',
        skills: ['Diseño Gráfico', 'Marketing Digital', 'Branding', 'Canva'],
        email: 'design@bodioviru.com'
    },
    5: {
        name: 'Roberto García',
        role: 'Desarrollador Backend',
        bio: 'Especialista en crear códigos que funcionan. Utiliza código limpio con funciones creativas.',
        skills: ['JavaScript', 'HTML5', 'TypeScript', 'Testing'],
        email: 'gm0723042025@unab.edu.sv'
    }
};

const PROJECT_DATA = {
    'salud-emocional': {
        title: 'Campaña Salud Emocional',
        desc: 'Con el fin de ayudar a concientizar sobre la importancia del cuidado de la salud emocional...',
        images: [
            'Imagenes/Portafolio/Campaña Salud Emocional/ImagenVectorial.png',
            'Imagenes/Portafolio/Campaña Salud Emocional/Mensaje.jpg'
        ]
    },
    'mosaicos': {
        title: 'Mosaicos 15 Septiembre',
        desc: 'Conmemoración de fechas patrias con mosaicos artísticos.',
        images: [
            'Imagenes/Portafolio/Mosaicos 15 septiembre/Mosaico 1.png',
            'Imagenes/Portafolio/Mosaicos 15 septiembre/Mosaico 2.webp'
        ]
    },
    'collage': {
        title: 'Collage Fotografías',
        desc: 'Recopilación artística de nuestras mejores tomas fotográficas.',
        images: [
            'Imagenes/Portafolio/Collage Fotografias/FOTOFRAFIAS (1).jpg',
            'Imagenes/Portafolio/Collage Fotografias/Album-_1_.webp'
        ]
    },
    'figma': {
        title: 'Diseño de Páginas en Figma',
        desc: 'Prototipado y diseño de alta fidelidad para empresas locales.',
        images: [
            'Imagenes/Portafolio/Figma/FigmaUI_R-1.jpg',
            'Imagenes/Portafolio/Figma/figma.jpg'
        ]
    }
};

/* =========================================
   NAVIGATION & UI
   ========================================= */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isActive); // Usar CSS para la animación del icono
        hamburger.setAttribute('aria-expanded', isActive);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scroll mejorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* =========================================
   AUDIO PLAYER (Optimized)
   ========================================= */
function initAudioPlayer() {
    const playBtn = document.getElementById('playButtonAudacity');
    const volumeSlider = document.getElementById('volumeSliderAudacity');
    const visualizer = document.getElementById('audioVisualizer');
    const currentEl = document.getElementById('currentTime');
    const totalEl = document.getElementById('totalTime');
    
    // Nota: GitHub Pages suele servir desde root, ajusta esta ruta si es necesario.
    // Mejor práctica: Ruta relativa simple.
    const audio = new Audio('Audio/Proyecto_Radio.mp3'); 
    audio.loop = true;
    audio.volume = 0.5;

    let animationId;

    // Configurar Visualizador (Solo crear elementos DOM una vez)
    const barCount = 40;
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.left = `${(i / barCount) * 100}%`;
        visualizer.appendChild(bar);
    }
    const bars = document.querySelectorAll('.visualizer-bar');

    function animateVisualizer() {
        bars.forEach(bar => {
            // Simulación de frecuencias (En un caso real usaríamos Web Audio API AnalyserNode)
            const height = 10 + Math.random() * 80; 
            bar.style.height = `${height}px`;
        });
        animationId = requestAnimationFrame(animateVisualizer);
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    playBtn.textContent = '⏸';
                    animateVisualizer();
                })
                .catch(err => console.error("Error reproducción:", err));
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            cancelAnimationFrame(animationId);
        }
    });

    volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value / 100);

    audio.addEventListener('timeupdate', () => {
        currentEl.textContent = formatTime(audio.currentTime);
        if(audio.duration) totalEl.textContent = formatTime(audio.duration);
    });
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/* =========================================
   MODAL SYSTEM (Unified)
   ========================================= */
function initModals() {
    const modal = document.getElementById('genericModal');
    const modalBody = document.getElementById('modalBodyContent');
    const closeBtn = document.getElementById('closeModalBtn');

    function openModal(contentHTML) {
        modalBody.innerHTML = contentHTML;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        modalBody.innerHTML = ''; // Limpiar memoria
    }

    // Event Listeners para cerrar
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Delegación de eventos para abrir modales (Team & Portfolio)
    document.addEventListener('click', (e) => {
        // Caso 1: Click en Integrante
        const teamCard = e.target.closest('.team-member');
        if (teamCard) {
            const id = teamCard.dataset.id;
            const data = TEAM_DATA[id];
            if (data) renderTeamModal(data, openModal);
        }

        // Caso 2: Click en Portafolio
        const projectCard = e.target.closest('.portfolio-item');
        if (projectCard) {
            const id = projectCard.dataset.projectId;
            const data = PROJECT_DATA[id];
            if (data) renderProjectModal(data, openModal);
        }
    });
}

// Renderizado HTML para Modal de Equipo
function renderTeamModal(data, openFn) {
    const html = `
        <div class="team-modal-header">
            <div class="team-modal-info">
                <h2>${data.name}</h2>
                <p class="team-modal-role">${data.role}</p>
            </div>
        </div>
        <div class="team-modal-body">
            <h3>Biografía</h3>
            <p>${data.bio}</p>
            <h3>Habilidades</h3>
            <div class="team-skills">
                ${data.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
            <div class="team-contact">
                <p>Email: <a href="mailto:${data.email}">${data.email}</a></p>
            </div>
        </div>
    `;
    openFn(html);
}

// Renderizado HTML para Modal de Proyecto
function renderProjectModal(data, openFn) {
    const html = `
        <h2>${data.title}</h2>
        <p>${data.desc}</p>
        <div class="modal-images-grid">
            ${data.images.map(img => `
                <div class="modal-image-container">
                    <img src="${img}" alt="${data.title}" onerror="this.style.display='none'">
                </div>
            `).join('')}
        </div>
    `;
    openFn(html);
}

/* =========================================
   ANIMATIONS & UTILS
   ========================================= */
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up'); // Clase CSS recomendada en lugar de estilos inline
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(sec => {
        sec.classList.add('hidden-section'); // Clase inicial
        observer.observe(sec);
    });
}

/**
 * BodrioScript.js - Lógica Centralizada y Profesional
 */

document.addEventListener('DOMContentLoaded', () => {
    // Detectar página actual
    const isAudacityPage = document.querySelector('.page-audacity');
    const isFilmoraPage = document.querySelector('.page-filmora');
    
    if (isAudacityPage) initAudacityPlayer();
    if (isFilmoraPage) initFilmoraPlayer();
    
    // Inicializar navegación si existe (para Index y Subpáginas)
    initNavigation(); 
});

// --- Lógica Audacity (Reproductor y Visualizador) ---
function initAudacityPlayer() {
    const playBtn = document.getElementById('playButtonAudacity');
    const volumeSlider = document.getElementById('volumeSliderAudacity');
    const visualizerContainer = document.getElementById('audioVisualizer');
    const currentEl = document.getElementById('currentTime');
    const totalEl = document.getElementById('totalTime');
    
    if (!playBtn) return;

    // Audio Object
    const audio = new Audio('../Audio/Proyecto_Radio.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    // Crear barras del visualizador
    const bars = [];
    for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        visualizerContainer.appendChild(bar);
        bars.push(bar);
    }

    let animationId;
    function animate() {
        bars.forEach(bar => {
            // Simulación de onda simple
            const height = Math.max(5, Math.random() * 100);
            bar.style.height = `${height}%`;
        });
        animationId = requestAnimationFrame(animate);
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸';
            animate();
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            cancelAnimationFrame(animationId);
            // Reset visualizer
            bars.forEach(b => b.style.height = '5px'); 
        }
    });

    volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value / 100);
    audio.addEventListener('timeupdate', () => {
        currentEl.textContent = formatTime(audio.currentTime);
        if(audio.duration) totalEl.textContent = formatTime(audio.duration);
    });
}

// --- Lógica Filmora (Vimeo SDK) ---
function initFilmoraPlayer() {
    // Verificamos que el SDK de Vimeo esté cargado
    if (typeof Vimeo === 'undefined') {
        console.warn('Vimeo SDK no cargado.');
        return;
    }

    const iframe = document.getElementById('filmoraVideo');
    const player = new Vimeo.Player(iframe);

    // Botones
    const btnPlay = document.getElementById('btnVideoPlay');
    const btnMute = document.getElementById('btnVideoMute');
    const btnFull = document.getElementById('btnVideoFull');

    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            player.getPaused().then(paused => {
                paused ? player.play() : player.pause();
            });
        });
        
        // Actualizar icono al cambiar estado
        player.on('play', () => btnPlay.innerHTML = '<i class="fas fa-pause"></i> <span>Pause</span>');
        player.on('pause', () => btnPlay.innerHTML = '<i class="fas fa-play"></i> <span>Play</span>');
    }

    if (btnMute) {
        btnMute.addEventListener('click', () => {
            player.getMuted().then(muted => {
                player.setMuted(!muted);
                btnMute.innerHTML = !muted 
                    ? '<i class="fas fa-volume-mute"></i> <span>Unmute</span>' 
                    : '<i class="fas fa-volume-up"></i> <span>Mute</span>';
            });
        });
    }

    if (btnFull) {
        btnFull.addEventListener('click', () => {
            player.requestFullscreen().catch(err => console.error(err));
        });
    }
}

// --- Utilidades ---
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function initNavigation() {
    // Lógica del menú hamburguesa (reutilizada del paso anterior)
    // Asegurar que funcione tanto en root como en subcarpetas
}
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAudioPlayer();
    initModals();
    initAnimations();
    
    // Inicialización específica de páginas
    const isAudacityPage = document.querySelector('.page-audacity');
    const isFilmoraPage = document.querySelector('.page-filmora');
    
    if (isAudacityPage) initAudacityPlayer();
    if (isFilmoraPage) initFilmoraPlayer();
});

const TEAM_DATA = {
    1: {
        name: 'Carlos Guevara',
        role: 'Líder Creativo & Diseñador Principal',
        bio: 'Participó en la elaboración de la documentación del proyecto, organizando y explicando los apartados necesarios para presentar el trabajo de manera clara. También aportó al diseño general del proyecto con ideas visuales y de estilo..',
        skills: ['Documentación', 'Organización de Contenido', 'Organización de Información'],
        email: 'gf0347042025@unab.edu.sv'
    },
    2: {
        name: 'Sebastián Medrano',
        role: 'Documentación',
        bio: 'Contribuyó al desarrollo de la documentación del proyecto junto con Carlos. Su trabajo se enfocó en redactar, estructurar y revisar la información para que fuera coherente y fácil de comprender.',
        skills: ['Redacción', 'Documentación', 'Postproducción'],
        email: 'gm0623042025@unab.edu.sv'
    },
    3: {
        name: 'Ramón Garmendia',
        role: 'Desarrollador & Especialista en Audio',
        bio: 'Trabajó junto con Luis en el diseño visual del sitio, aportando ideas para la apariencia, estilo gráfico y estructura visual de la página.',
        skills: ['Diseño Gráfico', 'Composición Visual', 'UI Layout'],
        email: 'gh0476042025@unab.edu.sv'
    },
    4: {
        name: 'Herber Chicas',
        role: 'Desarrollador Frontend – Estructura',
        bio: 'Encargado de crear la estructura base del proyecto. Realizó el esqueleto HTML y organizó la arquitectura del sitio para que el resto del desarrollo pudiera avanzar correctamente.',
        skills: ['Estructura Web', 'Organización de Proyectos', 'JavaScript Básico'],
        email: 'ch0304042025@unab.edu.sv'
    },
    5: {
        name: 'Luis Serabia',
        role: 'Diseñador Gráfico & Marketing',
        bio: 'Colaboró en el diseño visual del proyecto junto a Ramon, trabajando en colores, distribución, tipografía y experiencia de usuario.',
        skills: ['Diseño Gráfico', 'Identidad Visual', 'Branding', 'Canva'],
        email: 'sz0356042025@unab.edu.sv'
    },
    6: {
        name: 'Roberto García',
        role: 'Desarrollador Backend',
        bio: 'Se encargó de completar la parte funcional del sitio. Usó la estructura creada para implementar el resto del HTML, detalles visuales y funciones en JavaScript.',
        skills: ['JavaScript', 'HTML5', 'Optimización Frontend', 'Funcionalidad Web'],
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

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isActive);
        hamburger.setAttribute('aria-expanded', isActive);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

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

/* --- REPRODUCTOR DE AUDIO (Blindado) --- */
function initAudioPlayer() {
    const playBtn = document.getElementById('playButtonAudacity');
    const visualizer = document.getElementById('audioVisualizer');
    
    // Si no existe el botón en esta página, salimos sin error
    if (!playBtn) return;

    // Detectar ruta correcta del audio (Index vs Subcarpeta)
    // Truco: probamos crear el audio, si estamos en subcarpeta añadimos '../'
    const isSubPage = window.location.pathname.includes('Herramientas');
    const audioPath = isSubPage ? '../Audio/Proyecto_Radio.mp3' : 'Audio/Proyecto_Radio.mp3';
    
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.5;

    // Slider Volumen
    const volSlider = document.getElementById('volumeSliderAudacity');
    if(volSlider) {
        volSlider.addEventListener('input', (e) => audio.volume = e.target.value / 100);
    }

    // Visualizador (Solo si existe el contenedor)
    let animationId;
    if (visualizer) {
        // Crear barras
        visualizer.innerHTML = '';
        const bars = [];
        const barCount = window.innerWidth < 600 ? 20 : 50;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.left = `${(i / barCount) * 100}%`;
            bar.style.width = `${100/barCount - 0.5}%`; // Ancho dinámico
            visualizer.appendChild(bar);
            bars.push(bar);
        }

        function animate() {
            if(audio.paused) return;
            bars.forEach(bar => {
                const h = 10 + Math.random() * 90;
                bar.style.height = `${h}%`;
            });
            animationId = requestAnimationFrame(animate);
        }

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.textContent = '⏸';
                    animate();
                }).catch(e => console.error("Error audio:", e));
            } else {
                audio.pause();
                playBtn.textContent = '▶';
                cancelAnimationFrame(animationId);
            }
        });
    }
}

function initModals() {
    const modal = document.getElementById('genericModal');
    const modalBody = document.getElementById('modalBodyContent');
    const closeBtn = document.getElementById('closeModalBtn');

    if (!modal || !modalBody || !closeBtn) return;

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
        modalBody.innerHTML = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    document.addEventListener('click', (e) => {
        const teamCard = e.target.closest('.team-member');
        if (teamCard) {
            const id = teamCard.dataset.id;
            const data = TEAM_DATA[id];
            if (data) renderTeamModal(data, openModal);
        }

        const projectCard = e.target.closest('.portfolio-item');
        if (projectCard) {
            const id = projectCard.dataset.projectId;
            const data = PROJECT_DATA[id];
            if (data) renderProjectModal(data, openModal);
        }
    });
}

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

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(sec => {
        sec.classList.add('hidden-section');
        observer.observe(sec);
    });
}

function initAudacityPlayer() {
    const playBtn = document.getElementById('playButtonAudacity');
    const volumeSlider = document.getElementById('volumeSliderAudacity');
    const visualizerContainer = document.getElementById('audioVisualizer');
    const currentEl = document.getElementById('currentTime');
    const totalEl = document.getElementById('totalTime');
    
    if (!playBtn) return;

    const audio = new Audio('../Audio/Proyecto_Radio.mp3');
    audio.loop = true;
    audio.volume = 0.5;

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
            bars.forEach(b => b.style.height = '5px'); 
        }
    });

    volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value / 100);
    audio.addEventListener('timeupdate', () => {
        if (currentEl) currentEl.textContent = formatTime(audio.currentTime);
        if (totalEl && audio.duration) totalEl.textContent = formatTime(audio.duration);
    });
}

function initFilmoraPlayer() {
    if (typeof Vimeo === 'undefined') {
        console.warn('Vimeo SDK no cargado.');
        return;
    }

    const iframe = document.getElementById('filmoraVideo');
    if (!iframe) return;
    
    const player = new Vimeo.Player(iframe);

    const btnPlay = document.getElementById('btnVideoPlay');
    const btnMute = document.getElementById('btnVideoMute');
    const btnFull = document.getElementById('btnVideoFull');

    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            player.getPaused().then(paused => {
                paused ? player.play() : player.pause();
            });
        });
        
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

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

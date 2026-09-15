/**
 * Jaitej.dev - Main Interactive & Animation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // ==========================================
    // 2. SCROLL PROGRESS BAR & HEADER SCROLL
    // ==========================================
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrollPercent}%`;
        }

        // Header Scrolled Glass Effect
        if (navbar) {
            if (scrollTop > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to Top Button
        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active Section Scroll Spy
        updateActiveNavLink();

        // Update Bike Speedometer Gauge
        updateBikeSpeedometer();

        // Update Educational Journey Progressive Scroll Meter
        updateEducationalScrollMeter();
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 3. SCROLL-TRIGGERED REVEAL ANIMATION ENGINE
    // ==========================================
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    document.querySelectorAll('.reveal, .cert-card').forEach((el) => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 4. MOBILE HAMBURGER MENU
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // 5. NAVBAR ACTIVE LINK SPY
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 220;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================
    // 6. HERO ROLE TYPEWRITER (PROMPT ENGINEER & VIBE CODER)
    // ==========================================
    const typewriterElement = document.getElementById('typewriterText');
    if (typewriterElement) {
        const roles = [
            'Java Full Stack Developer',
            'Spring Boot & REST API Specialist',
            'Prompt Engineer',
            'Vibe Coder',
            'MCA 2025 Graduate',
            'Backend & Database Architect'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 85;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2200;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 350;
            }

            setTimeout(typeRole, typingSpeed);
        }

        setTimeout(typeRole, 800);
    }

    // ==========================================
    // 7. HERO IMAGE 3D TILT
    // ==========================================
    const heroImageContainer = document.getElementById('heroImageContainer');
    if (heroImageContainer && window.matchMedia('(min-width: 1024px)').matches) {
        heroImageContainer.addEventListener('mousemove', (e) => {
            const rect = heroImageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / rect.height) * -10;
            const tiltY = (x / rect.width) * 10;

            heroImageContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });

        heroImageContainer.addEventListener('mouseleave', () => {
            heroImageContainer.style.transform = '';
        });
    }

    // ==========================================
    // 8. TECHNICAL SKILLS: BORDERLESS INTERACTIVE FLOATING & DRAGGABLE ARENA
    // ==========================================
    const arena = document.getElementById('floatingSkillsArena');
    const floatItems = document.querySelectorAll('.float-item');
    const modeFloatBtn = document.getElementById('modeFloatBtn');
    const modeGridBtn = document.getElementById('modeGridBtn');
    const skillsGridContainer = document.getElementById('skillsGridContainer');

    const itemStates = [];
    let animationFrameId = null;

    if (arena && floatItems.length > 0) {
        function initFloatingArena() {
            const arenaRect = arena.getBoundingClientRect();
            const arenaW = arenaRect.width || 800;
            const arenaH = arenaRect.height || 460;

            const cols = 5;
            const rows = 3;
            const colWidth = (arenaW - 120) / cols;
            const rowHeight = (arenaH - 80) / rows;

            floatItems.forEach((item, index) => {
                const c = index % cols;
                const r = Math.floor(index / cols);

                const itemW = 110;
                const itemH = 45;

                const posX = 40 + c * colWidth + (Math.random() * 30 - 15);
                const posY = 30 + r * rowHeight + (Math.random() * 20 - 10);

                const speed = 0.4 + Math.random() * 0.4;
                const angle = Math.random() * Math.PI * 2;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;

                itemStates[index] = {
                    element: item,
                    x: Math.max(10, Math.min(arenaW - itemW - 10, posX)),
                    y: Math.max(10, Math.min(arenaH - itemH - 10, posY)),
                    vx: vx,
                    vy: vy,
                    width: itemW,
                    height: itemH,
                    isDragging: false,
                    dragOffsetX: 0,
                    dragOffsetY: 0
                };

                item.style.left = `${itemStates[index].x}px`;
                item.style.top = `${itemStates[index].y}px`;

                setupDraggable(item, index);
            });

            startFloatingPhysics();
        }

        function setupDraggable(element, index) {
            function onPointerDown(e) {
                const state = itemStates[index];
                state.isDragging = true;
                element.style.cursor = 'grabbing';
                element.style.zIndex = '100';

                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);

                const arenaRect = arena.getBoundingClientRect();
                state.dragOffsetX = clientX - (arenaRect.left + state.x);
                state.dragOffsetY = clientY - (arenaRect.top + state.y);

                window.addEventListener('pointermove', onPointerMove);
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('touchmove', onPointerMove, { passive: false });
                window.addEventListener('touchend', onPointerUp);
            }

            function onPointerMove(e) {
                const state = itemStates[index];
                if (!state.isDragging) return;

                if (e.cancelable) e.preventDefault();

                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);

                const arenaRect = arena.getBoundingClientRect();
                let newX = clientX - arenaRect.left - state.dragOffsetX;
                let newY = clientY - arenaRect.top - state.dragOffsetY;

                newX = Math.max(5, Math.min(arenaRect.width - state.width - 5, newX));
                newY = Math.max(5, Math.min(arenaRect.height - state.height - 5, newY));

                state.x = newX;
                state.y = newY;
                element.style.left = `${newX}px`;
                element.style.top = `${newY}px`;
            }

            function onPointerUp() {
                const state = itemStates[index];
                state.isDragging = false;
                element.style.cursor = 'grab';
                element.style.zIndex = '10';

                const speed = 0.4 + Math.random() * 0.3;
                const angle = Math.random() * Math.PI * 2;
                state.vx = Math.cos(angle) * speed;
                state.vy = Math.sin(angle) * speed;

                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
                window.removeEventListener('touchmove', onPointerMove);
                window.removeEventListener('touchend', onPointerUp);
            }

            element.addEventListener('pointerdown', onPointerDown);
            element.addEventListener('touchstart', onPointerDown, { passive: true });
        }

        function startFloatingPhysics() {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            function updatePhysics() {
                const arenaRect = arena.getBoundingClientRect();
                const arenaW = arenaRect.width;
                const arenaH = arenaRect.height;

                itemStates.forEach(state => {
                    if (!state.isDragging) {
                        state.x += state.vx;
                        state.y += state.vy;

                        if (state.x <= 5) {
                            state.x = 5;
                            state.vx = Math.abs(state.vx);
                        } else if (state.x >= arenaW - state.width - 5) {
                            state.x = arenaW - state.width - 5;
                            state.vx = -Math.abs(state.vx);
                        }

                        if (state.y <= 5) {
                            state.y = 5;
                            state.vy = Math.abs(state.vy);
                        } else if (state.y >= arenaH - state.height - 5) {
                            state.y = arenaH - state.height - 5;
                            state.vy = -Math.abs(state.vy);
                        }

                        state.element.style.left = `${state.x}px`;
                        state.element.style.top = `${state.y}px`;
                    }
                });

                animationFrameId = requestAnimationFrame(updatePhysics);
            }

            animationFrameId = requestAnimationFrame(updatePhysics);
        }

        if (modeFloatBtn && modeGridBtn) {
            modeFloatBtn.addEventListener('click', () => {
                modeFloatBtn.classList.add('active');
                modeGridBtn.classList.remove('active');
                arena.classList.remove('hidden');
                skillsGridContainer.classList.add('hidden');
                startFloatingPhysics();
            });

            modeGridBtn.addEventListener('click', () => {
                modeGridBtn.classList.add('active');
                modeFloatBtn.classList.remove('active');
                arena.classList.add('hidden');
                skillsGridContainer.classList.remove('hidden');
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
            });
        }

        window.addEventListener('load', initFloatingArena);
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initFloatingArena, 200);
        });
    }

    // ==========================================
    // 9. SCROLL-DRIVEN BIKE SPEEDOMETER HUD ENGINE (LEFT SIDE, NO BOX)
    // ==========================================
    const projectsScrollWrapper = document.getElementById('projectsScrollWrapper');
    const speedoNeedle = document.getElementById('speedoNeedle');
    const speedoNumber = document.getElementById('speedoNumber');
    const gearNumber = document.getElementById('gearNumber');
    const speedoStatusText = document.getElementById('speedoStatusText');
    const gaugeActiveTrack = document.getElementById('gaugeActiveTrack');
    const rpmDots = document.querySelectorAll('.rpm-dot');
    const stackedCards = document.querySelectorAll('.stacked-project-card');

    function updateBikeSpeedometer() {
        if (!projectsScrollWrapper || !speedoNeedle) return;

        const allCards = document.querySelectorAll('.stacked-project-card');
        const allDots = document.querySelectorAll('.rpm-dot');
        const totalCards = allCards.length || 7;

        const wrapperRect = projectsScrollWrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height - window.innerHeight;

        let scrollFraction = 0;
        if (wrapperTop <= 0) {
            scrollFraction = Math.min(1, Math.max(0, -wrapperTop / (wrapperHeight > 0 ? wrapperHeight : 1)));
        }

        // Determine active project card based on its actual screen viewport position
        let currentGear = 1;
        const stickyThreshold = 160; // Pixels from top where sticky cards rest

        allCards.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            // If the card has reached near the sticky threshold
            if (cardRect.top <= stickyThreshold + 20) {
                currentGear = idx + 1;
            }
        });

        // Clamp between 1 and totalCards
        currentGear = Math.min(totalCards, Math.max(1, currentGear));

        // Display Active Gear / Project Number (01, 02, ... 09)
        if (gearNumber) {
            gearNumber.textContent = currentGear < 10 ? `0${currentGear}` : `${currentGear}`;
        }

        // Smooth combined progress for speedometer needle and speed KM/H
        const gearProgressRatio = totalCards > 1 ? (currentGear - 1) / (totalCards - 1) : 0;
        const blendedProgress = (scrollFraction * 0.45) + (gearProgressRatio * 0.55);

        // Speed Digital Readout (from 20 KM/H up to 240 KM/H at top gear)
        const targetSpeed = Math.round(20 + blendedProgress * 200);
        if (speedoNumber) {
            speedoNumber.textContent = targetSpeed;
        }

        // Needle angle -120deg to +120deg (240 deg dynamic sweep)
        const needleAngle = -120 + blendedProgress * 240;
        speedoNeedle.style.transform = `translateX(-50%) rotate(${needleAngle}deg)`;

        // SVG Track Dashoffset (Circumference ~ 553 for r=132, 240deg arc)
        if (gaugeActiveTrack) {
            const arcLength = 553;
            const offset = arcLength - (blendedProgress * arcLength);
            gaugeActiveTrack.style.strokeDasharray = `${arcLength}`;
            gaugeActiveTrack.style.strokeDashoffset = offset;
        }

        // Dynamic Status Text precisely matching current gear / total projects
        if (speedoStatusText) {
            if (currentGear >= totalCards) {
                speedoStatusText.textContent = '🚀 Redline Nitro';
                speedoStatusText.style.color = 'var(--secondary)';
            } else if (currentGear >= Math.ceil(totalCards * 0.75)) {
                speedoStatusText.textContent = '⚡ Hyper Velocity';
                speedoStatusText.style.color = 'var(--accent)';
            } else if (currentGear >= Math.ceil(totalCards * 0.5)) {
                speedoStatusText.textContent = '🔥 High Speed';
                speedoStatusText.style.color = 'var(--primary)';
            } else if (currentGear >= Math.ceil(totalCards * 0.25)) {
                speedoStatusText.textContent = '⚡ Accelerating';
                speedoStatusText.style.color = 'var(--primary)';
            } else {
                speedoStatusText.textContent = '⚡ Cruise Control';
                speedoStatusText.style.color = '#6ee7b7';
            }
        }

        // Update all RPM dots up to active gear
        allDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx < currentGear);
        });

        // Stacking card visual depth scaling for realistic card deck stacking
        allCards.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.top <= stickyThreshold && idx < currentGear - 1) {
                const depth = (currentGear - 1) - idx;
                card.style.transform = `scale(${Math.max(0.88, 1 - depth * 0.02)}) translateY(-${depth * 6}px)`;
                card.style.opacity = `${Math.max(0.35, 1 - depth * 0.1)}`;
            } else {
                card.style.transform = '';
                card.style.opacity = '';
            }
        });
    }

    // ==========================================
    // 10. EDUCATIONAL JOURNEY: ALTERNATING TIMELINE (MCA -> BCA -> INTERMEDIATE -> SSC) & CENTER BEAM FILL
    // ==========================================
    const eduSection = document.getElementById('education');
    const eduStickyStage = document.getElementById('eduStickyStage');
    const eduBeamFill = document.getElementById('eduBeamGlowFill');
    const eduRows = document.querySelectorAll('.edu-timeline-row');
    let hasVibratedAtFull = false;

    function updateEducationalScrollMeter() {
        if (!eduSection || !eduStickyStage || eduRows.length === 0) return;

        const eduRect = eduSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress within the pinned education track
        const totalScrollable = eduRect.height - windowHeight;
        if (totalScrollable <= 0) {
            // Mobile fallback
            eduRows.forEach(row => {
                const card = row.querySelector('.edu-timeline-card');
                if (card) {
                    card.style.opacity = '1';
                    card.style.filter = 'none';
                    card.style.transform = 'none';
                    card.classList.add('stage-complete');
                }
                row.classList.add('node-active');
            });
            if (eduBeamFill) eduBeamFill.style.height = '100%';
            return;
        }

        const scrolled = -eduRect.top;
        let progress = 0;
        if (scrolled > 0) {
            progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
        }

        // 1. Center Beam Line Glow Fill
        if (eduBeamFill) {
            eduBeamFill.style.height = `${progress * 100}%`;
        }

        // 2. Sequential reveal from top to bottom: MCA (1) -> BCA (2) -> Intermediate (3) -> SSC (4)
        const stepRanges = {
            1: { start: 0.05, end: 0.38 }, // MCA (Left)
            2: { start: 0.25, end: 0.58 }, // BCA (Right)
            3: { start: 0.45, end: 0.78 }, // Intermediate (Left)
            4: { start: 0.65, end: 0.98 }  // SSC (Right)
        };

        eduRows.forEach(row => {
            const step = parseInt(row.getAttribute('data-edu-step'), 10);
            const range = stepRanges[step] || { start: 0.1, end: 0.9 };
            const card = row.querySelector('.edu-timeline-card');
            const isLeft = row.classList.contains('edu-row-left');

            let rowProgress = 0;
            if (progress >= range.end) {
                rowProgress = 1;
            } else if (progress > range.start) {
                rowProgress = (progress - range.start) / (range.end - range.start);
            }

            if (card) {
                // Card Visibility & Transform
                const transX = isLeft ? (1 - rowProgress) * -25 : (1 - rowProgress) * 25;
                const transY = (1 - rowProgress) * 15;
                card.style.opacity = `${rowProgress}`;
                card.style.filter = `blur(${(1 - rowProgress) * 8}px)`;
                card.style.transform = `translate(${transX}px, ${transY}px) scale(${0.94 + rowProgress * 0.06})`;

                // Card Bottom Light Bar Width
                const glowBar = card.querySelector('.edu-card-glow-bar');
                if (glowBar) {
                    glowBar.style.width = `${rowProgress * 100}%`;
                }

                // Direct Color Morphing on Card
                if (rowProgress > 0.8) {
                    card.classList.add('stage-complete');
                    card.classList.remove('stage-warm');
                    row.classList.add('node-active');
                } else if (rowProgress > 0.3) {
                    card.classList.add('stage-warm');
                    card.classList.remove('stage-complete');
                    row.classList.add('node-active');
                } else {
                    card.classList.remove('stage-warm', 'stage-complete');
                    row.classList.remove('node-active');
                }
            }
        });

        // 3. Haptic Vibration Effect when reaching 100% full reveal
        if (progress >= 0.98) {
            if (!hasVibratedAtFull) {
                hasVibratedAtFull = true;

                // Hardware device vibration
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    try {
                        navigator.vibrate([50, 40, 70]);
                    } catch (e) {}
                }

                // Visual CSS haptic shake / vibration
                eduStickyStage.classList.add('edu-vibrate-hit');
                setTimeout(() => {
                    eduStickyStage.classList.remove('edu-vibrate-hit');
                }, 520);
            }
        } else if (progress < 0.85) {
            hasVibratedAtFull = false;
        }
    }

    // ==========================================
    // 11. LICENSES & CERTIFICATES: BLAST EXPLOSION & REVERSE IMPLOSION
    // ==========================================
    const certModal = document.getElementById('certificateModal');
    const certModalContent = document.getElementById('certModalContent');
    const certModalImg = document.getElementById('certificateImage');
    const certCloseBtn = document.getElementById('certificateClose');
    const blastContainer = document.getElementById('blastContainer');
    const blastButtons = document.querySelectorAll('.blast-btn, .experience-cert-btn');

    let lastOriginRect = null;

    function triggerBlastParticles(originX, originY) {
        if (!blastContainer) return;
        blastContainer.innerHTML = '';

        const colors = ['#00f5a0', '#c084fc', '#fb7185', '#facc15', '#38bdf8'];
        const particleCount = 28;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'blast-particle';

            const size = Math.random() * 8 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (Math.PI * 2 / particleCount) * i + (Math.random() * 0.4 - 0.2);
            const distance = Math.random() * 180 + 80;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            particle.style.left = `${originX}px`;
            particle.style.top = `${originY}px`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            blastContainer.appendChild(particle);
        }

        setTimeout(() => {
            blastContainer.innerHTML = '';
        }, 800);
    }

    function openCertModalWithBlast(imageSrc, triggerCard) {
        if (!certModal || !certModalImg) return;

        // Card Flash Animation
        if (triggerCard) {
            triggerCard.classList.add('card-blasting');
            const rect = triggerCard.getBoundingClientRect();
            lastOriginRect = rect;
            const originX = rect.left + rect.width / 2;
            const originY = rect.top + rect.height / 2;
            triggerBlastParticles(originX, originY);
        }

        setTimeout(() => {
            if (triggerCard) triggerCard.classList.remove('card-blasting');
            certModalImg.src = imageSrc;
            certModalContent.classList.remove('implode-close');
            certModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }, 220);
    }

    function closeCertModalWithImplosion() {
        if (!certModal) return;

        certModalContent.classList.add('implode-close');

        if (lastOriginRect) {
            const originX = lastOriginRect.left + lastOriginRect.width / 2;
            const originY = lastOriginRect.top + lastOriginRect.height / 2;
            triggerBlastParticles(originX, originY);
        }

        setTimeout(() => {
            certModal.classList.add('hidden');
            certModalContent.classList.remove('implode-close');
            document.body.style.overflow = '';
        }, 320);
    }

    blastButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const certSrc = btn.getAttribute('data-certificate');
            const card = btn.closest('.cert-card, .experience-card');
            if (certSrc) {
                openCertModalWithBlast(certSrc, card);
            }
        });
    });

    if (certCloseBtn) {
        certCloseBtn.addEventListener('click', closeCertModalWithImplosion);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal || e.target.classList.contains('modal-backdrop')) {
                closeCertModalWithImplosion();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal && !certModal.classList.contains('hidden')) {
            closeCertModalWithImplosion();
        }
    });

    // ==========================================
    // ==========================================
    // 12. CONTACT FORM HANDLER (DIRECT WHATSAPP INSTANT CHAT)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-contact-submit');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Message via WhatsApp';

            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';

            if (!name || !email || !message) {
                if (formFeedback) {
                    formFeedback.innerHTML = '<span>⚠️ Please fill in all required fields.</span>';
                    formFeedback.className = 'form-feedback-message error';
                    formFeedback.classList.remove('hidden');
                }
                return;
            }

            if (submitBtn) {
                submitBtn.innerHTML = '<span>Opening WhatsApp...</span>';
                submitBtn.disabled = true;
            }

            const formData = {
                name,
                email,
                subject: subject || 'Portfolio Opportunity / Inquiry',
                message,
                timestamp: new Date().toISOString(),
                source: 'Jaitej.dev Portfolio'
            };

            // 1. Save locally in WhatsApp message backup log
            try {
                const storedMessages = JSON.parse(localStorage.getItem('whatsappMessages') || '[]');
                storedMessages.push(formData);
                localStorage.setItem('whatsappMessages', JSON.stringify(storedMessages));
            } catch (err) {
                console.warn('LocalStorage error:', err);
            }

            // 2. Format clean markdown message for WhatsApp (+91 8179974915)
            const formattedMessage = 
`👋 *New Message from Jaitej.dev Portfolio*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📌 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

🕒 _Sent on: ${new Date().toLocaleString()}_`;

            // 2. WhatsApp URLs targeting Jaitej's number (+91 8179974915)
            const encodedText = encodeURIComponent(formattedMessage);
            const waMeUrl = `https://wa.me/918179974915?text=${encodedText}`;
            const waWebUrl = `https://web.whatsapp.com/send?phone=918179974915&text=${encodedText}`;

            // 3. Immediately trigger universal WhatsApp link in user click event
            try {
                window.open(waMeUrl, '_blank');
            } catch (err) {
                console.warn('Popup blocked, direct options provided:', err);
            }

            // 4. Provide visual feedback and direct fallback button
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.innerHTML = `
                        <div style="font-weight: 600; font-size: 0.95rem; color: #a7f3d0; margin-bottom: 4px;">
                            ✓ Message ready for +91 8179974915!
                        </div>
                        <div style="font-size: 0.83rem; color: #cbd5e1; max-width: 440px; line-height: 1.45; margin-bottom: 10px;">
                            Opening WhatsApp from your account... Tap <strong>Send</strong> in WhatsApp to deliver:
                        </div>
                        <div class="whatsapp-actions-row">
                            <a href="${waMeUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-direct">
                                <span>Open WhatsApp App</span>
                            </a>
                            <a href="${waWebUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-web-direct">
                                <span>Open WhatsApp Web</span>
                            </a>
                        </div>
                    `;
                    formFeedback.className = 'form-feedback-message success';
                    formFeedback.classList.remove('hidden');

                    setTimeout(() => {
                        formFeedback.classList.add('hidden');
                    }, 15000);
                }

                contactForm.reset();

                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.disabled = false;
                }
            }, 400);
        });
    }
});

// javascript.js - Fix untuk navbar beranda

document.addEventListener('DOMContentLoaded', function() {
    // Animasi untuk navbar saat scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });

    // Animasi untuk elemen yang muncul saat scroll
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // Animasi counter untuk statistik
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const speed = 200;
                const increment = target / speed;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        entry.target.innerText = Math.ceil(current);
                        setTimeout(updateCounter, 1);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Partners Carousel Auto Rotation
    const partnersWrapper = document.querySelector('.partners-wrapper');
    const partnersCarousel = document.querySelector('.partners-carousel');
    
    if (partnersWrapper && partnersCarousel) {
        const partnerItems = Array.from(document.querySelectorAll('.partner-item'));
        
        // Clone items for seamless infinite marquee loop
        partnerItems.forEach(item => {
            const clone = item.cloneNode(true);
            partnersWrapper.appendChild(clone);
        });

        // Pause animation on hover (handled by CSS :hover + animation-play-state)
        partnersCarousel.addEventListener('mouseenter', function() {
            partnersWrapper.style.animationPlayState = 'paused';
        });

        partnersCarousel.addEventListener('mouseleave', function() {
            partnersWrapper.style.animationPlayState = 'running';
        });

        // Respect prefers-reduced-motion setting
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            partnersWrapper.style.animationPlayState = 'paused';
        }
    }

    // FIX UTAMA: Fungsi untuk navbar beranda
    const berandaDropdown = document.getElementById('berandaDropdown');
    
    if (berandaDropdown) {
        // Untuk DESKTOP - klik langsung ke beranda, hover untuk dropdown
        if (window.innerWidth >= 992) {
            berandaDropdown.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
            
            // Hover functionality untuk desktop
            const navItem = berandaDropdown.closest('.nav-item');
            navItem.addEventListener('mouseenter', function() {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.add('show');
                }
            });
            
            navItem.addEventListener('mouseleave', function() {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
        
        // Untuk MOBILE - biarkan Bootstrap menangani dropdown secara normal
     
    }


    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (currentPage === 'index.html' || currentPage === '') {
            if (link.getAttribute('href') === 'index.html' || link.id === 'berandaDropdown') {
                link.classList.add('active');
            }
        } else if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Handle resize event untuk responsive behavior
window.addEventListener('resize', function() {
    const berandaDropdown = document.getElementById('berandaDropdown');
    
    if (berandaDropdown && window.innerWidth >= 992) {
        // Hapus event listener lama dan tambahkan yang baru untuk desktop
        berandaDropdown.replaceWith(berandaDropdown.cloneNode(true));
    }
});

// profiljurusan.js - JavaScript untuk halaman profil jurusan

document.addEventListener('DOMContentLoaded', function() {
    // Animasi untuk elemen yang muncul saat scroll
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll untuk anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active state untuk navigation
    function setActiveNav() {
        const sections = document.querySelectorAll('.jurusan-card');
        const navLinks = document.querySelectorAll('.dropdown-item[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // Hover effects untuk jurusan cards
    const jurusanCards = document.querySelectorAll('.jurusan-card');
    jurusanCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Chat button animations
    const chatButtons = document.querySelectorAll('.chat-buttons .btn');
    chatButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation
    function initPage() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    initPage();

    // Parallax effect untuk header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.jurusan-header');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    console.log('Halaman Profil Jurusan SMKN 4 Sarolangun loaded successfully!');
});

// Export functions untuk penggunaan modular (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPage };
}

// ===================== GALLERY SCRIPT =====================

// Gallery Images with Metadata
const galleryImages = [
    { id: 1, src: '/img/athanasiaaw.jpeg', title: 'Halaman Depan Sekolah', category: 'Bangunan' },
    { id: 2, src: '/img/athanasiaaw.jpeg', title: 'Ruang Kelas Modern', category: 'Fasilitas' },
    { id: 3, src: '/img/athanasiaaw.jpeg', title: 'Laboratorium Komputer', category: 'Fasilitas' },
    { id: 4, src: '/img/athanasiaaw.jpeg', title: 'Perpustakaan Sekolah', category: 'Fasilitas' },
    { id: 6, src: '/img/athanasiaaw.jpeg', title: 'Aula Sekolah', category: 'Bangunan' },
    { id: 7, src: '/img/athanasiaaw.jpeg', title: 'Kantin Sekolah', category: 'Fasilitas' },
    { id: 8, src: '/img/athanasiaaw.jpeg', title: 'Ruang Guru', category: 'Bangunan' },
    { id: 9, src: '/img/athanasiaaw.jpeg', title: 'Kegiatan Siswa', category: 'Aktivitas' },
    { id: 10, src: '/img/athanasiaaw.jpeg', title: 'Upacara Bendera', category: 'Aktivitas' },
    { id: 11, src: '/img/athanasiaaw.jpeg', title: 'Lomba Akademik', category: 'Aktivitas' },
    { id: 12, src: '/img/athanasiaaw.jpeg', title: 'Ekstrakurikuler', category: 'Aktivitas' }
];

let currentImageIndex = 0;
let filteredImages = [...galleryImages];

// Initialize Gallery
function initGallery() {
    renderGalleryGrid();
    setupFilterButtons();
    setupLightboxEvents();
}

// Render Gallery Grid
function renderGalleryGrid() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';

    if (filteredImages.length === 0) {
        galleryGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-images"></i>
                <p>Tidak ada gambar dengan kategori yang dipilih</p>
            </div>
        `;
        return;
    }

    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <span class="gallery-category">${image.category}</span>
            <div class="gallery-overlay">
                <div class="gallery-icon">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `;
        galleryItem.addEventListener('click', () => openLightbox(galleryImages.indexOf(image)));
        galleryGrid.appendChild(galleryItem);
    });
}

// Setup Filter Buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-filter');
            if (category === 'all') {
                filteredImages = [...galleryImages];
            } else {
                filteredImages = galleryImages.filter(img => img.category === category);
            }
            renderGalleryGrid();
        });
    });
    // Set default active filter
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');
}

// Lightbox Functions
function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    
    modal.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = galleryImages[currentImageIndex];
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');

    if (!lightboxImg || !lightboxTitle || !lightboxCounter) return;

    lightboxImg.src = image.src;
    lightboxImg.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;

    // Add animation
    lightboxImg.style.animation = 'none';
    setTimeout(() => {
        lightboxImg.style.animation = 'zoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 10);
}

// Setup Lightbox Events
function setupLightboxEvents() {
    // Close button
    const closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Previous button
    const prevBtn = document.querySelector('.lightbox-btn:first-of-type');
    if (prevBtn) {
        prevBtn.addEventListener('click', previousImage);
    }

    // Next button
    const nextBtn = document.querySelector('.lightbox-btn:last-of-type');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('lightboxModal');
        if (!modal || !modal.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeLightbox();
    });

    // Click outside to close
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLightbox();
            }
        });
    }

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        const modal = document.getElementById('lightboxModal');
        if (modal && modal.classList.contains('active')) {
            touchStartX = e.changedTouches[0].screenX;
        }
    });

    document.addEventListener('touchend', function(e) {
        const modal = document.getElementById('lightboxModal');
        if (!modal || !modal.classList.contains('active')) return;

        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextImage(); // Swipe left
        }
        if (touchEndX - touchStartX > 50) {
            previousImage(); // Swipe right
        }
    }
}

// Initialize gallery on DOMContentLoaded (if on gallery page)
document.addEventListener('DOMContentLoaded', function() {
    // Check if gallery elements exist on the page
    if (document.getElementById('galleryGrid')) {
        initGallery();
    }
});


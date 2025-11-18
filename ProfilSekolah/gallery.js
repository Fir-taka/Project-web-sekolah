// Gallery Images with Metadata
const galleryImages = [
    { id: 1, src: '/img/athanasiaaw.jpeg', title: 'Halaman Depan Sekolah', category: 'Bangunan' },
    { id: 2, src: '/img/athanasiaaw.jpeg', title: 'Ruang Kelas Modern', category: 'Fasilitas' },
    { id: 3, src: '/img/athanasiaaw.jpeg', title: 'Laboratorium Komputer', category: 'Fasilitas' },
    { id: 4, src: '/img/athanasiaaw.jpeg', title: 'Perpustakaan Sekolah', category: 'Fasilitas' },
    { id: 5, src: '/img/athanasiaaw.jpeg', title: 'Lapangan Olahraga', category: 'Olahraga' },
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
    document.querySelector('[data-filter="all"]').classList.add('active');
}

// Lightbox Functions
function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    modal.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
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
        if (!modal.classList.contains('active')) return;

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
        if (modal.classList.contains('active')) {
            touchStartX = e.changedTouches[0].screenX;
        }
    });

    document.addEventListener('touchend', function(e) {
        const modal = document.getElementById('lightboxModal');
        if (!modal.classList.contains('active')) return;

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

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initGallery);

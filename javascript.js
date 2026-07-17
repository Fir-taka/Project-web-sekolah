// javascript.js - Fix untuk navbar beranda

document.addEventListener("DOMContentLoaded", function () {
  // Animasi untuk navbar saat scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      document.querySelector(".navbar").classList.add("scrolled");
    } else {
      document.querySelector(".navbar").classList.remove("scrolled");
    }
  });

  // Animasi untuk elemen yang muncul saat scroll
  const animateOnScrollElements =
    document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(() => {
            entry.target.classList.add("animated");
          }, delay);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animateOnScrollElements.forEach((element) => {
    observer.observe(element);
  });

  // Animasi counter untuk statistik
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute("data-target");
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
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Partners Carousel Auto Rotation
  const partnersWrapper = document.querySelector(".partners-wrapper");
  const partnersCarousel = document.querySelector(".partners-carousel");

  if (partnersWrapper && partnersCarousel) {
    const partnerItems = Array.from(document.querySelectorAll(".partner-item"));

    // Clone items for seamless infinite marquee loop
    partnerItems.forEach((item) => {
      const clone = item.cloneNode(true);
      partnersWrapper.appendChild(clone);
    });

    // Pause animation on hover (handled by CSS :hover + animation-play-state)
    partnersCarousel.addEventListener("mouseenter", function () {
      partnersWrapper.style.animationPlayState = "paused";
    });

    partnersCarousel.addEventListener("mouseleave", function () {
      partnersWrapper.style.animationPlayState = "running";
    });

    // Respect prefers-reduced-motion setting
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      partnersWrapper.style.animationPlayState = "paused";
    }
  }

  // FIX UTAMA: Fungsi untuk navbar beranda
  const berandaDropdown = document.getElementById("berandaDropdown");

  if (berandaDropdown) {
    // Untuk DESKTOP - klik langsung ke beranda, hover untuk dropdown
    if (window.innerWidth >= 992) {
      berandaDropdown.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
      });

      // Hover functionality untuk desktop
      const navItem = berandaDropdown.closest(".nav-item");
      navItem.addEventListener("mouseenter", function () {
        const dropdownMenu = this.querySelector(".dropdown-menu");
        if (dropdownMenu) {
          dropdownMenu.classList.add("show");
        }
      });

      navItem.addEventListener("mouseleave", function () {
        const dropdownMenu = this.querySelector(".dropdown-menu");
        if (dropdownMenu) {
          dropdownMenu.classList.remove("show");
        }
      });
    }

    // Untuk MOBILE - biarkan Bootstrap menangani dropdown secara normal
  }

  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (currentPage === "index.html" || currentPage === "") {
      if (
        link.getAttribute("href") === "index.html" ||
        link.id === "berandaDropdown"
      ) {
        link.classList.add("active");
      }
    } else if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// Handle resize event untuk responsive behavior
window.addEventListener("resize", function () {
  const berandaDropdown = document.getElementById("berandaDropdown");

  if (berandaDropdown && window.innerWidth >= 992) {
    // Hapus event listener lama dan tambahkan yang baru untuk desktop
    berandaDropdown.replaceWith(berandaDropdown.cloneNode(true));
  }
});

// profiljurusan.js - JavaScript untuk halaman profil jurusan

document.addEventListener("DOMContentLoaded", function () {
  // Animasi untuk elemen yang muncul saat scroll
  const animateOnScrollElements =
    document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(() => {
            entry.target.classList.add("animated");
          }, delay);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animateOnScrollElements.forEach((element) => {
    observer.observe(element);
  });

  // Smooth scroll untuk anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active state untuk navigation
  function setActiveNav() {
    const sections = document.querySelectorAll(".jurusan-card");
    const navLinks = document.querySelectorAll('.dropdown-item[href^="#"]');

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);

  // Hover effects untuk jurusan cards
  const jurusanCards = document.querySelectorAll(".jurusan-card");
  jurusanCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.transition = "all 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Chat button animations
  const chatButtons = document.querySelectorAll(".chat-buttons .btn");
  chatButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Loading animation
  function initPage() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  }

  initPage();

  // Parallax effect untuk header
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".jurusan-header");
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  console.log("Halaman Profil Jurusan SMKN 4 Sarolangun loaded successfully!");
});

// Export functions untuk penggunaan modular (jika diperlukan)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initPage };
}

// ===================== GALLERY SCRIPT =====================

// Gallery Images with Metadata
const galleryImages = [
  {
    id: 1,
    src: "/img/athanasiaaw.jpeg",
    title: "Halaman Depan Sekolah",
    category: "Bangunan",
  },
  {
    id: 2,
    src: "/img/athanasiaaw.jpeg",
    title: "Ruang Kelas Modern",
    category: "Fasilitas",
  },
  {
    id: 3,
    src: "/img/athanasiaaw.jpeg",
    title: "Laboratorium Komputer",
    category: "Fasilitas",
  },
  {
    id: 4,
    src: "/img/athanasiaaw.jpeg",
    title: "Perpustakaan Sekolah",
    category: "Fasilitas",
  },
  {
    id: 6,
    src: "/img/athanasiaaw.jpeg",
    title: "Aula Sekolah",
    category: "Bangunan",
  },
  {
    id: 7,
    src: "/img/athanasiaaw.jpeg",
    title: "Kantin Sekolah",
    category: "Fasilitas",
  },
  {
    id: 8,
    src: "/img/athanasiaaw.jpeg",
    title: "Ruang Guru",
    category: "Bangunan",
  },
  {
    id: 9,
    src: "/img/athanasiaaw.jpeg",
    title: "Kegiatan Siswa",
    category: "Aktivitas",
  },
  {
    id: 10,
    src: "/img/athanasiaaw.jpeg",
    title: "Upacara Bendera",
    category: "Aktivitas",
  },
  {
    id: 11,
    src: "/img/athanasiaaw.jpeg",
    title: "Lomba Akademik",
    category: "Aktivitas",
  },
  {
    id: 12,
    src: "/img/athanasiaaw.jpeg",
    title: "Ekstrakurikuler",
    category: "Aktivitas",
  },
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
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";

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
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <span class="gallery-category">${image.category}</span>
            <div class="gallery-overlay">
                <div class="gallery-icon">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `;
    galleryItem.addEventListener("click", () =>
      openLightbox(galleryImages.indexOf(image))
    );
    galleryGrid.appendChild(galleryItem);
  });
}v 

// Setup Filter Buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-filter");
      if (category === "all") {
        filteredImages = [...galleryImages];
      } else {
        filteredImages = galleryImages.filter(
          (img) => img.category === category
        );
      }
      renderGalleryGrid();
    });
  });
  // Set default active filter
  const allBtn = document.querySelector('[data-filter="all"]');
  if (allBtn) allBtn.classList.add("active");
}

// Lightbox Functions
function openLightbox(index) {
  currentImageIndex = index;
  const modal = document.getElementById("lightboxModal");
  if (!modal) return;

  modal.classList.add("active");
  updateLightboxImage();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function previousImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const image = galleryImages[currentImageIndex];
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");

  if (!lightboxImg || !lightboxTitle || !lightboxCounter) return;

  lightboxImg.src = image.src;
  lightboxImg.alt = image.title;
  lightboxTitle.textContent = image.title;
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${
    galleryImages.length
  }`;

  // Add animation
  lightboxImg.style.animation = "none";
  setTimeout(() => {
    lightboxImg.style.animation =
      "zoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
  }, 10);
}

// Setup Lightbox Events
function setupLightboxEvents() {
  // Close button
  const closeBtn = document.querySelector(".lightbox-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  // Previous button
  const prevBtn = document.querySelector(".lightbox-btn:first-of-type");
  if (prevBtn) {
    prevBtn.addEventListener("click", previousImage);
  }

  // Next button
  const nextBtn = document.querySelector(".lightbox-btn:last-of-type");
  if (nextBtn) {
    nextBtn.addEventListener("click", nextImage);
  }

  // Keyboard Navigation
  document.addEventListener("keydown", function (e) {
    const modal = document.getElementById("lightboxModal");
    if (!modal || !modal.classList.contains("active")) return;

    if (e.key === "ArrowLeft") previousImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeLightbox();
  });

  // Click outside to close
  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeLightbox();
      }
    });
  }

  // Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", function (e) {
    const modal = document.getElementById("lightboxModal");
    if (modal && modal.classList.contains("active")) {
      touchStartX = e.changedTouches[0].screenX;
    }
  });

  document.addEventListener("touchend", function (e) {
    const modal = document.getElementById("lightboxModal");
    if (!modal || !modal.classList.contains("active")) return;

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
document.addEventListener("DOMContentLoaded", function () {
  // Check if gallery elements exist on the page
  if (document.getElementById("galleryGrid")) {
    initGallery();
  }
});

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Carousel functionality
function initCarousel() {
  const wrapper = document.querySelector(".partners-wrapper");
  const indicators = document.querySelectorAll(".indicator");
  const items = document.querySelectorAll(".partner-item");
  const itemsPerSlide = 4;
  let currentSlide = 0;
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  // Create indicators based on total slides
  const indicatorsContainer = document.querySelector(".carousel-indicators");
  indicatorsContainer.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("button");
    indicator.className = `indicator ${i === 0 ? "active" : ""}`;
    indicator.setAttribute("data-slide", i);
    indicator.addEventListener("click", () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const translateX = -currentSlide * 100;
    wrapper.style.transform = `translateX(${translateX}%)`;

    // Update active indicator
    document.querySelectorAll(".indicator").forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  // Auto slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  initCarousel();
});
// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Carousel functionality
function initCarousel() {
  const wrapper = document.querySelector(".partners-wrapper");
  const items = document.querySelectorAll(".partner-item");
  let currentSlide = 0;

  // Function to calculate items per slide based on screen width
  function getItemsPerSlide() {
    if (window.innerWidth >= 1200) return 5;
    if (window.innerWidth >= 992) return 4;
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 576) return 2;
    return 1; // Mobile
  }

  // Function to update carousel based on current items per slide
  function updateCarousel() {
    const itemsPerSlide = getItemsPerSlide();
    const totalSlides = Math.ceil(items.length / itemsPerSlide);

    // Update wrapper width and transform
    const translateX = -currentSlide * 100;
    wrapper.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    updateIndicators(totalSlides);
  }

  // Function to update indicators
  function updateIndicators(totalSlides) {
    const indicatorsContainer = document.querySelector(".carousel-indicators");
    indicatorsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.className = `indicator ${i === currentSlide ? "active" : ""}`;
      indicator.setAttribute("data-slide", i);
      indicator.addEventListener("click", () => {
        currentSlide = i;
        updateCarousel();
      });
      indicatorsContainer.appendChild(indicator);
    }
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
  }

  // Initialize carousel
  updateCarousel();

  // Auto slide every 5 seconds
  setInterval(() => {
    const itemsPerSlide = getItemsPerSlide();
    const totalSlides = Math.ceil(items.length / itemsPerSlide);
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, 5000);

  // Update on window resize
  window.addEventListener("resize", updateCarousel);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  initCarousel();
});

// Data Berita
const beritaData = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor Sit Amet",
    category: "Pendidikan",
    date: "10 November 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    link: "#",
  },
  {
    id: 2,
    title: "Consectetur Adipiscing Elit Sed",
    category: "Industri",
    date: "8 November 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "#",
  },
  {
    id: 3,
    title: "Duis Aute Irure Dolor In",
    category: "Pengembangan Diri",
    date: "5 November 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    link: "#",
  },
  {
    id: 4,
    title: "Excepteur Sint Occaecat Cupidatat",
    category: "Prestasi",
    date: "1 November 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "#",
  },
  {
    id: 5,
    title: "Sed Ut Perspiciatis Unde Omnis",
    category: "Ekstrakurikuler",
    date: "28 Oktober 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    link: "#",
  },
  {
    id: 6,
    title: "Totam Rem Aperiam Eaque Ipsa",
    category: "Sosial",
    date: "25 Oktober 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "#",
  },
  {
    id: 7,
    title: "Nemo Enim Ipsam Voluptatem",
    category: "Akademik",
    date: "20 Oktober 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    link: "#",
  },
  {
    id: 8,
    title: "Neque Porro Quisquam Est Qui",
    category: "Entrepreneur",
    date: "18 Oktober 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    link: "#",
  },
  {
    id: 9,
    title: "Sed Quia Non Numquam Eius",
    category: "Fasilitas",
    date: "15 Oktober 2025",
    image: "/img/athanasiaaw.jpeg",
    excerpt:
      "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    link: "#",
  },
];

// Render Berita
function renderBerita() {
  const container = document.getElementById("beritaContainer");
  if (!container) return;

  container.innerHTML = beritaData
    .map(
      (berita) => `
        <div class="col-lg-4 col-md-6">
            <div class="berita-card animate-on-scroll">
                <div class="berita-image">
                    <img src="${berita.image}" alt="${berita.title}">
                    <span class="berita-category">${berita.category}</span>
                </div>
                <div class="berita-content">
                    <p class="berita-date"><i class="far fa-calendar me-2"></i>${berita.date}</p>
                    <h3>${berita.title}</h3>
                    <p>${berita.excerpt}</p>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Trigger scroll animation
  const elements = container.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

// Initialize Berita Page
function initBeritaPage() {
  renderBerita();
  console.log("Halaman Berita SMK NEGERI 4 SAROLANGUN loaded successfully!");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initBeritaPage);

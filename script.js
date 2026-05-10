// Image Data
const images = [
    { src: "https://picsum.photos/id/104/500/400", category: "nature", title: "Mountain Lake" },
    { src: "https://picsum.photos/id/15/500/400", category: "nature", title: "Forest Path" },
    { src: "https://picsum.photos/id/106/500/400", category: "nature", title: "Flower Bloom" },
    { src: "https://picsum.photos/id/0/500/400", category: "tech", title: "Laptop Workspace" },
    { src: "https://picsum.photos/id/1/500/400", category: "tech", title: "Coding Session" },
    { src: "https://picsum.photos/id/20/500/400", category: "tech", title: "Coffee & Code" },
    { src: "https://picsum.photos/id/30/500/400", category: "art", title: "Red Abstract" },
    { src: "https://picsum.photos/id/42/500/400", category: "art", title: "Music Notes" },
    { src: "https://picsum.photos/id/76/500/400", category: "art", title: "Urban Sketch" },
    { src: "https://picsum.photos/id/28/500/400", category: "nature", title: "Sunset Peaks" },
    { src: "https://picsum.photos/id/119/500/400", category: "tech", title: "Tech Hardware" },
    { src: "https://picsum.photos/id/164/500/400", category: "art", title: "Abstract Canvas" }
];

let currentCategory = "all";
let currentImageFilter = "none";
let currentImagesList = [...images];
let currentIndex = 0;

const galleryGrid = document.getElementById("galleryGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const imageTitleSpan = document.getElementById("imageTitle");
const imageCategorySpan = document.getElementById("imageCategory");

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(`${savedTheme}-theme`);
    const themeIcon = document.querySelector('#themeToggle i');
    if (savedTheme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    const themeIcon = document.querySelector('#themeToggle i');
    if (isDark) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Mobile Menu
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});

// Render Gallery
function renderGallery() {
    currentImagesList = currentCategory === "all" ? [...images] : images.filter(img => img.category === currentCategory);
    
    if (currentImagesList.length === 0) {
        galleryGrid.innerHTML = `<div style="text-align:center; padding:3rem;">✨ No images in this category</div>`;
        return;
    }
    
    galleryGrid.innerHTML = currentImagesList.map((img, idx) => `
        <div class="gallery-item" data-index="${idx}" style="position:relative;">
            <img src="${img.src}" alt="${img.title}" class="${currentImageFilter !== 'none' ? currentImageFilter : ''}">
            <span class="category-tag">${img.category}</span>
            <div class="img-caption">${img.title}</div>
        </div>
    `).join('');
    
    document.querySelectorAll(".gallery-item").forEach(item => {
        item.addEventListener("click", () => {
            currentIndex = parseInt(item.dataset.index);
            openLightbox();
        });
    });
}

// Apply Image Filter
function applyImageFilter(filterType) {
    currentImageFilter = filterType;
    const allImages = document.querySelectorAll(".gallery-item img");
    allImages.forEach(img => {
        img.classList.remove("grayscale", "sepia", "blur", "bright");
        if (filterType !== "none") img.classList.add(filterType);
    });
}

// Download Image
function downloadImage(imageUrl, filename) {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename || 'image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        })
        .catch(() => alert('Download failed, but you can right-click save as'));
}

// Lightbox Functions
function openLightbox() {
    const img = currentImagesList[currentIndex];
    lightboxImg.src = img.src;
    imageTitleSpan.innerHTML = `<i class="fas fa-image"></i> ${img.title}`;
    imageCategorySpan.innerHTML = `<i class="fas fa-tag"></i> ${img.category}`;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentImagesList.length;
    const img = currentImagesList[currentIndex];
    lightboxImg.src = img.src;
    imageTitleSpan.innerHTML = `<i class="fas fa-image"></i> ${img.title}`;
    imageCategorySpan.innerHTML = `<i class="fas fa-tag"></i> ${img.category}`;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentImagesList.length) % currentImagesList.length;
    const img = currentImagesList[currentIndex];
    lightboxImg.src = img.src;
    imageTitleSpan.innerHTML = `<i class="fas fa-image"></i> ${img.title}`;
    imageCategorySpan.innerHTML = `<i class="fas fa-tag"></i> ${img.category}`;
}

// Newsletter Subscription
document.getElementById('subscribeBtn').addEventListener('click', () => {
    const email = document.getElementById('newsletterEmail').value;
    const messageDiv = document.getElementById('newsletterMessage');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        messageDiv.innerHTML = '<span class="error">❌ Please enter email</span>';
        setTimeout(() => messageDiv.innerHTML = '', 3000);
        return;
    }
    
    if (!emailRegex.test(email)) {
        messageDiv.innerHTML = '<span class="error">❌ Valid email required</span>';
        setTimeout(() => messageDiv.innerHTML = '', 3000);
        return;
    }
    
    // Simulate sending
    messageDiv.innerHTML = '<span class="success">✅ Subscribed! Thank you 🎉</span>';
    document.getElementById('newsletterEmail').value = '';
    setTimeout(() => messageDiv.innerHTML = '', 3000);
});

// Event Listeners
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        renderGallery();
        setTimeout(() => applyImageFilter(currentImageFilter), 50);
    });
});

document.querySelectorAll(".img-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".img-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyImageFilter(btn.dataset.imgFilter);
    });
});

document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
document.getElementById("prevBtn").addEventListener("click", prevImage);
document.getElementById("nextBtn").addEventListener("click", nextImage);

document.getElementById("downloadBtn").addEventListener("click", () => {
    const img = currentImagesList[currentIndex];
    const filename = `${img.title.replace(/\s/g, '_')}.jpg`;
    downloadImage(img.src, filename);
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
});

// Initialize
initTheme();
renderGallery();
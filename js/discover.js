// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize Map
let map = L.map('map').setView([30.3753, 69.3451], 5); // Default to Pakistan

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Club data
const clubs = [
    {
        id: 'karakuram',
        name: 'Karakuram Mountaineering Club',
        location: 'Skardu, Pakistan',
        specialty: 'expedition',
        members: '150+',
        image: './images/m1.jpg',
        lat: 35.2971,
        lng: 75.6333,
        description: '<p>The Karakuram Mountaineering Club is one of Pakistan\'s premier climbing organizations, specializing in high-altitude expeditions to the world\'s most challenging peaks including K2, Broad Peak, and the Gasherbrums.</p><p>Founded in 1985 by a group of local mountaineers, the club has trained hundreds of climbers and organized numerous successful expeditions to 8000m peaks.</p><p>We offer comprehensive training programs for all skill levels, from beginner trekking courses to advanced technical climbing workshops.</p>',
        contact: '<p><strong>Email:</strong> info@karakuramclub.pk</p><p><strong>Phone:</strong> +92 5829 55010</p><p><strong>Address:</strong> Mountaineering Center, Skardu, Gilgit-Baltistan, Pakistan</p>',
        gallery: [
            './images/m1.jpg',
            './images/m1.jpg',
            './images/m1.jpg'
        ]
    },
    {
        id: 'himalayan',
        name: 'Himalayan Alpine Club',
        location: 'Kathmandu, Nepal',
        specialty: 'expedition',
        members: '200+',
        image: './images/m2.jpg',
        lat: 27.7172,
        lng: 85.3240,
        description: '<p>The Himalayan Alpine Club is Nepal\'s leading mountaineering organization with IFMGA certified guides and extensive experience in Himalayan expeditions.</p><p>Since 1978, we have been at the forefront of Himalayan climbing, organizing expeditions to Everest, Annapurna, and other major peaks in the region.</p><p>Our training programs are recognized internationally, and we pride ourselves on maintaining the highest safety standards.</p>',
        contact: '<p><strong>Email:</strong> contact@himalayanalpine.org</p><p><strong>Phone:</strong> +977 1 4265100</p><p><strong>Address:</strong> Thamel, Kathmandu, Nepal</p>',
        gallery: [
            './images/m2.jpg',
            './images/m2.jpg',
            './images/m2.jpg'
        ]
    },
    {
        id: 'alpine-pakistan',
        name: 'Alpine Club of Pakistan',
        location: 'Islamabad, Pakistan',
        specialty: 'professional',
        members: '300+',
        image: './images/m3.jpg',
        lat: 33.6844,
        lng: 73.0479,
        description: '<p>The Alpine Club of Pakistan is the national mountaineering federation, promoting and regulating mountaineering activities across the country.</p><p>Established in 1974, we organize training courses, expeditions, and maintain mountain huts throughout the Karakoram and Himalayan ranges.</p><p>We work closely with international climbing organizations and provide certification for mountain guides and instructors.</p>',
        contact: '<p><strong>Email:</strong> info@alpineclub.org.pk</p><p><strong>Phone:</strong> +92 51 9262535</p><p><strong>Address:</strong> Alpine Club House, F-7/4, Islamabad, Pakistan</p>',
        gallery: [
            './images/m3.jpg',
            './images/m3.jpg',
            './images/m3.jpg'
        ]
    },
    {
        id: 'northern-areas',
        name: 'Northern Areas Climbing Club',
        location: 'Gilgit, Pakistan',
        specialty: 'beginner',
        members: '80+',
        image: './images/m4.jpg',
        lat: 35.9208,
        lng: 74.3144,
        description: '<p>The Northern Areas Climbing Club focuses on introducing beginners to the world of mountaineering through safe, guided experiences in the beautiful mountains of Gilgit-Baltistan.</p><p>Our certified instructors provide comprehensive training in basic climbing techniques, equipment use, and mountain safety.</p><p>We organize regular weekend trips to nearby peaks and climbing areas suitable for all fitness levels.</p>',
        contact: '<p><strong>Email:</strong> info@northernclimbing.pk</p><p><strong>Phone:</strong> +92 5824 55020</p><p><strong>Address:</strong> Jutial Road, Gilgit, Pakistan</p>',
        gallery: [
            './images/m4.jpg',
            './images/m4.jpg',
            './images/m4.jpg'
        ]
    },
    {
        id: 'ice-warriors',
        name: 'Ice Warriors Club',
        location: 'Hunza, Pakistan',
        specialty: 'ice',
        members: '60+',
        image: './images/m5.jpg',
        lat: 36.3160,
        lng: 74.6510,
        description: '<p>The Ice Warriors Club specializes in ice and mixed climbing in the stunning frozen waterfalls and glaciers of the Hunza Valley.</p><p>Our members are passionate about winter climbing and regularly explore new ice routes in the region.</p><p>We offer ice climbing courses from beginner to advanced levels, focusing on safety and technical proficiency.</p>',
        contact: '<p><strong>Email:</strong> ice@warriorsclub.pk</p><p><strong>Phone:</strong> +92 5829 55100</p><p><strong>Address:</strong> Karimabad, Hunza, Pakistan</p>',
        gallery: [
            './images/m5.jpg',
            './images/m5.jpg',
            './images/m5.jpg'
        ]
    },
    {
        id: 'trekking-adventures',
        name: 'Trekking Adventures Club',
        location: 'Swat, Pakistan',
        specialty: 'trekking',
        members: '120+',
        image: './images/m6.jpg',
        lat: 35.2255,
        lng: 72.4256,
        description: '<p>The Trekking Adventures Club focuses on exploring the beautiful trekking routes of Swat Valley and surrounding areas.</p><p>We organize guided treks for all experience levels, from gentle day hikes to multi-day expeditions.</p><p>Our club emphasizes sustainable tourism and works with local communities to promote eco-friendly trekking practices.</p>',
        contact: '<p><strong>Email:</strong> info@trekkingadventures.pk</p><p><strong>Phone:</strong> +92 946 710200</p><p><strong>Address:</strong> Mingora, Swat, Pakistan</p>',
        gallery: [
            './images/m6.jpg',
            './images/m6.jpg',
            './images/m6.jpg'
        ]
    },
    {
        id: 'alpine-club-pakistan',
        name: 'Alpine Club of Pakistan (ACP)',
        location: 'Jinnah Sports Stadium, Islamabad, Pakistan',
        specialty: 'professional',
        members: '300+',
        image: './images/m7.jpg',
        lat: 33.6844,
        lng: 73.0479,
        description: `<p><strong>Founded:</strong> 1974.</p>
                     <p>The Alpine Club of Pakistan is the national mountaineering and climbing federation — the core organization for mountain sports in Pakistan.</p>
                     <p><strong>Mission &amp; Objectives:</strong> Promote mountaineering, rock climbing, ice climbing, trekking; provide training (liaison officers, high-altitude porters, guides); organize expeditions; support environmental conservation of mountain areas; and represent Pakistan in international bodies (UIAA, UAAA).</p>
                     <p><strong>Training Institute:</strong> Operates a training institute in Nilt, Gilgit-Baltistan for rock and ice climbing.</p>
                     <p><strong>Notable Work:</strong> ACP has trained local climbers, organized high-altitude expeditions, and advised on mountain tourism development.</p>`,
        contact: '<p><strong>Address:</strong> Jinnah Sports Stadium, Islamabad, Pakistan</p><p><strong>Affiliations:</strong> UIAA, UAAA, Pakistan Sports Board</p>',
        gallery: [
            './images/m7.jpg'
        ]
    },
    {
        id: 'pakistan-mountaineering-club',
        name: 'Pakistan Mountaineering Club (PMC)',
        location: 'Gilgit / Northern Areas, Pakistan',
        specialty: 'expedition',
        members: '80+',
        image: './images/m8.jpg',
        lat: 35.9208,
        lng: 74.3144,
        description: `<p>PMC promotes adventure tourism and mountaineering in Pakistan's northern areas (Gilgit, Hunza, Shigar, etc.). Activities include trekking, hiking, and climbing tours with a focus on cultural engagement and eco-tourism.</p>
                      <p>Key regions: Fairy Meadows, Nanga Parbat Base Camp, Hunza Valley, Shigar Valley. Guides are primarily local experts emphasizing traditional guesthouse stays and community interaction.</p>`,
        contact: '<p><strong>Email:</strong> attashah675@gmail.com</p><p><strong>Phone:</strong> +92 334 2896968</p><p><strong>Website:</strong> pakistanmountaineeringclub.com</p>',
        gallery: [
            './images/m8.jpg'
        ]
    },
    {
        id: 'adventure-club-pakistan',
        name: 'The Adventure Club – Pakistan',
        location: '5 Lake View Park (Ibex Sports & Leisure Club), Islamabad',
        specialty: 'beginner',
        members: '100+',
        image: './images/m9.jpg',
        lat: 33.7046,
        lng: 73.0536,
        description: `<p>Non-commercial sports &amp; adventure organization active since the 1990s. Mission: promote camping, trekking, climbing, and other outdoor adventure sports with emphasis on environmental awareness and youth engagement.</p>
                      <p>Activities include regular trekking, camping, climbing, training, basecamp cleanups, and rock-climbing programs in Margalla Hills (including women-focused training).</p>`,
        contact: '<p><strong>Address:</strong> 5 Lake View Park, Islamabad</p><p><strong>Phone:</strong> +92 51-2364298 / 2364299 / 0333-5128519</p><p><strong>Email:</strong> adventureclubpak1@gmail.com</p>',
        gallery: [
            './images/m9.jpg'
        ]
    },
    {
        id: 'iiu-alpine-club',
        name: 'Islamians Alpine Club (IIU)',
        location: 'International Islamic University, Islamabad',
        specialty: 'student',
        members: '50+',
        image: './images/m10.jpg',
        lat: 33.6400,
        lng: 73.1000,
        description: `<p>University adventure/alpine club based at IIU (active since c.1992). Objectives: promote mountain exploration, climbing, skiing, and organize student expeditions, training courses, and inter-university exchanges. Affiliated with the Alpine Club of Pakistan.</p>`,
        contact: '<p><strong>Location:</strong> International Islamic University, Islamabad</p>',
        gallery: []
    },
    {
        id: 'chiltan-adventurers',
        name: 'Chiltan Adventurers Association Balochistan (CAAB)',
        location: 'Quetta, Balochistan, Pakistan',
        specialty: 'regional',
        members: '60+',
        image: './images/m11.jpg',
        lat: 30.1798,
        lng: 66.9750,
        description: `<p>Provincial adventure sports and mountaineering association promoting mountain adventure, sports climbing, caving, and youth engagement. CAAB focuses on providing healthy sporting opportunities to youth and uses adventure sports to prevent drug abuse by offering constructive outlets.</p>`,
        contact: '<p><strong>Location:</strong> Quetta, Balochistan</p><p><strong>Affiliation:</strong> Alpine Club of Pakistan</p>',
        gallery: []
    }
];

// Add markers to map
clubs.forEach(club => {
    const marker = L.marker([club.lat, club.lng]).addTo(map);
    marker.bindPopup(`
                <div class="map-popup">
                    <h3>${club.name}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${club.location}</p>
                    <p><i class="fas fa-users"></i> ${club.members} Members</p>
                    <button class="contact-btn" data-club="${club.id}">View Details</button>
                </div>
            `);
});

// Populate clubs grid
const clubsContainer = document.getElementById('clubs-container');

function renderClubs(filter = 'all') {
    clubsContainer.innerHTML = '';

    const filteredClubs = filter === 'all' ? clubs : clubs.filter(club => club.specialty === filter);

    filteredClubs.forEach(club => {
        const clubCard = document.createElement('div');
        clubCard.className = 'club-card';
        clubCard.innerHTML = `
                    <div class="club-image">
                        <img src="${club.image}" alt="${club.name}">
                    </div>
                    <div class="club-info">
                        <h3>${club.name}</h3>
                        <div class="club-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${club.location}</span>
                            <span><i class="fas fa-users"></i> ${club.members}</span>
                        </div>
                        <div class="club-specialty">${getSpecialtyText(club.specialty)}</div>
                        <p>${getClubDescription(club.specialty)}</p>
                        <a href="#" class="contact-btn" data-club="${club.id}">Contact Club</a>
                    </div>
                `;
        clubsContainer.appendChild(clubCard);
    });

    // Add event listeners to contact buttons
    document.querySelectorAll('.club-card .contact-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const clubId = btn.getAttribute('data-club');
            openClubModal(clubId);
        });
    });
}

function getSpecialtyText(specialty) {
    const specialties = {
        'beginner': 'Beginner Friendly',
        'professional': 'Professional Teams',
        'expedition': 'Expedition Clubs',
        'ice': 'Ice Climbing',
        'trekking': 'Trekking Groups'
    };
    return specialties[specialty] || 'Mountaineering';
}

function getClubDescription(specialty) {
    const descriptions = {
        'beginner': 'Perfect for those new to mountaineering with guided training and supportive community.',
        'professional': 'Advanced training and expeditions for experienced climbers seeking new challenges.',
        'expedition': 'Specializing in high-altitude expeditions to major peaks around the world.',
        'ice': 'Focus on ice climbing techniques and winter mountaineering in frozen environments.',
        'trekking': 'Explore beautiful trails and remote regions with experienced trekking guides.'
    };
    return descriptions[specialty] || 'Comprehensive mountaineering programs for all skill levels.';
}

// Initial render
renderClubs();

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        renderClubs(filter);
    });
});

// Search functionality
const searchInput = document.getElementById('club-search');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const clubCards = document.querySelectorAll('.club-card');

    clubCards.forEach(card => {
        const clubName = card.querySelector('h3').textContent.toLowerCase();
        const clubLocation = card.querySelector('.club-meta span:first-child').textContent.toLowerCase();

        if (clubName.includes(searchTerm) || clubLocation.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Geolocation functionality
const detectLocationBtn = document.getElementById('detect-location');
const locationStatus = document.getElementById('location-status');
const findClubsBtn = document.getElementById('find-clubs-btn');

findClubsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
    detectLocation();
});

detectLocationBtn.addEventListener('click', detectLocation);

function detectLocation() {
    locationStatus.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Detecting your location...</p>';

    if (!navigator.geolocation) {
        locationStatus.innerHTML = '<p>Geolocation is not supported by your browser. Please enter your location manually.</p>';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Update map view
            map.setView([lat, lng], 10);

            // Add user location marker
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup('Your Location')
                .openPopup();

            locationStatus.innerHTML = `<p><i class="fas fa-check-circle"></i> Location detected! Showing clubs near you.</p>`;

            // Find nearest clubs (simplified)
            const nearestClubs = findNearestClubs(lat, lng, 3);
            highlightNearestClubs(nearestClubs);
        },
        (error) => {
            let errorMessage = 'Unable to detect your location. ';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Please allow location access or enter your location manually.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'An unknown error occurred.';
            }
            locationStatus.innerHTML = `<p>${errorMessage}</p>`;
        }
    );
}

function findNearestClubs(userLat, userLng, count) {
    // Calculate distances and return nearest clubs
    const clubsWithDistance = clubs.map(club => {
        const distance = calculateDistance(userLat, userLng, club.lat, club.lng);
        return { ...club, distance };
    });

    return clubsWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, count);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function highlightNearestClubs(nearestClubs) {
    // Clear existing highlights
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.options.alt === 'nearest') {
            map.removeLayer(layer);
        }
    });

    // Add highlighted markers for nearest clubs
    nearestClubs.forEach(club => {
        L.marker([club.lat, club.lng], { alt: 'nearest' })
            .addTo(map)
            .bindPopup(`<strong>Nearest Club:</strong> ${club.name}<br>Distance: ${club.distance.toFixed(1)} km`)
            .openPopup();
    });
}

// Manual location search
const locationSearchBtn = document.getElementById('location-search');
locationSearchBtn.addEventListener('click', searchLocation);

function searchLocation() {
    const locationInput = document.getElementById('location-input');
    const location = locationInput.value.trim();

    if (!location) return;

    // Simple geocoding (in a real app, you'd use a geocoding service)
    const locationMap = {
        'islamabad': [33.6844, 73.0479],
        'karachi': [24.8607, 67.0011],
        'lahore': [31.5204, 74.3587],
        'skardu': [35.2971, 75.6333],
        'gilgit': [35.9208, 74.3144],
        'hunza': [36.3160, 74.6510],
        'kathmandu': [27.7172, 85.3240],
        'nepal': [28.3949, 84.1240],
        'pakistan': [30.3753, 69.3451]
    };

    const coords = locationMap[location.toLowerCase()];

    if (coords) {
        map.setView(coords, 10);
        locationStatus.innerHTML = `<p><i class="fas fa-check-circle"></i> Showing clubs near ${location}.</p>`;
    } else {
        locationStatus.innerHTML = `<p><i class="fas fa-exclamation-circle"></i> Location not found. Try major cities like Islamabad, Karachi, or Skardu.</p>`;
    }
}

// Club Modal
const clubModal = document.getElementById('club-modal');
const modalClose = document.getElementById('modal-close');

function openClubModal(clubId) {
    const club = clubs.find(c => c.id === clubId);
    if (!club) return;

    document.getElementById('modal-title').textContent = club.name;
    document.getElementById('modal-image').src = club.image;
    document.getElementById('modal-image').alt = club.name;
    document.getElementById('modal-location').textContent = club.location;
    document.getElementById('modal-members').textContent = club.members + ' Members';
    document.getElementById('modal-specialty').textContent = getSpecialtyText(club.specialty);
    document.getElementById('modal-description').innerHTML = club.description;
    document.getElementById('modal-contact').innerHTML = club.contact;

    // Populate gallery
    const galleryContainer = document.getElementById('modal-gallery');
    galleryContainer.innerHTML = '';
    club.gallery.forEach((imgSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'club-gallery-item';
        galleryItem.innerHTML = `<img src="${imgSrc}" alt="Gallery image ${index + 1}">`;
        galleryItem.addEventListener('click', () => openLightbox(imgSrc));
        galleryContainer.appendChild(galleryItem);
    });

    clubModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', () => {
    clubModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === clubModal) {
        clubModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxImage = document.getElementById('lightbox-image');

function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.style.display = 'flex';
}

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Featured club modal handlers
document.querySelectorAll('.featured-card .contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const clubId = btn.getAttribute('data-club');
        openClubModal(clubId);
    });
});

// Join form submission
const joinForm = document.getElementById('join-club-form');
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const experience = document.getElementById('experience').value;
    const interest = document.getElementById('interest').value;

    if (!name || !email || !location || !experience || !interest) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate form submission
    alert(`Thank you, ${name}! Your request to join a mountaineering club has been received. We'll contact you at ${email} with club recommendations in ${location}.`);
    joinForm.reset();
});

// Modal join form
const modalJoinForm = document.getElementById('modal-join-form');
modalJoinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = modalJoinForm.querySelector('input[type="email"]').value;

    if (!email) {
        alert('Please enter your email address.');
        return;
    }

    const clubName = document.getElementById('modal-title').textContent;
    alert(`Thank you! Your request to join ${clubName} has been sent. They will contact you at ${email}.`);
    modalJoinForm.reset();
});

// Footer newsletter
const footerNewsletter = document.getElementById('footer-newsletter');
footerNewsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = footerNewsletter.querySelector('input[type="email"]').value;
    alert('Subscribed! You will receive club updates and mountaineering events.');
    footerNewsletter.reset();
});

// Testimonial animations
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.testimonial-card').forEach(card => {
    testimonialObserver.observe(card);
});

// Gallery lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        openLightbox(imgSrc);
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NEWSLETTER FORM =====
document.querySelector('.newsletter-btn').addEventListener('click', function () {
    const email = document.querySelector('.newsletter-input').value.trim();

    if (!email) {
        alert('Please enter your email address.');
        return;
    }

    // In a real implementation, you would send this to your server
    alert(`Thank you for subscribing with: ${email}`);
    document.querySelector('.newsletter-input').value = '';
});

// Allow submitting with Enter key
document.querySelector('.newsletter-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.querySelector('.newsletter-btn').click();
    }
});
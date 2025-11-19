// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===== HERO CAROUSEL =====
const carousel = document.getElementById('carousel');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const hero = document.getElementById('hero');
const items = document.querySelectorAll('.carousel-item');
let position = 0;
const itemWidth = 230;

// Get hero text elements
const heroWord1 = document.getElementById('hero-word1');
const heroWord2 = document.getElementById('hero-word2');
const heroDescription = document.getElementById('hero-description');

next.addEventListener('click', () => {
    if (position > -(itemWidth * (items.length - 4))) {
        position -= itemWidth;
        carousel.style.transform = `translateX(${position}px)`;
    }
});
prev.addEventListener('click', () => {
    if (position < 0) {
        position += itemWidth;
        carousel.style.transform = `translateX(${position}px)`;
    }
});

items.forEach(item => {
    item.addEventListener('click', function () {
        const src = item.querySelector('img').src.replace('w=600', 'w=1920');
        hero.style.backgroundImage = `url('${src}')`;

        // Update hero text content
        const heading1 = this.getAttribute('data-heading1');
        const heading2 = this.getAttribute('data-heading2');
        const description = this.getAttribute('data-description');

        heroWord1.textContent = heading1;
        heroWord2.textContent = heading2;
        heroDescription.textContent = description;
    });
});

// ===== WEATHER + TIME API =====
const WEATHER_API_KEY = '91b98d72e13b3dd2cca81576160d0af1';

// Get weather data using coordinates
async function getWeather(lat, lon) {
    try {
        console.log('Fetching weather for coordinates:', lat, lon);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
        console.log('API URL:', url);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Weather data received:', data);

        // Update weather information
        if (data.main && data.weather && data.weather[0]) {
            document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('condition').innerText = data.weather[0].main;

            // Update weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('icon').src = iconUrl;
            document.getElementById('icon').alt = data.weather[0].description;
        } else {
            throw new Error('Invalid weather data format');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('temp').innerText = '--°C';
        document.getElementById('condition').innerText = 'Weather Unavailable';
    }
}

// 📍 Get Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerText = "Geolocation not supported.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Get City Name using Reverse Geocoding API (OpenStreetMap)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || "Unknown";
            const country = data.address.country || "";
            document.getElementById("location").innerText = `📍 ${city}, ${country}`;

            // Get weather data once we have the location
            getWeather(lat, lon);
        })
        .catch(() => {
            document.getElementById("location").innerText = "📍 Location not found";
        });
}

function showError(error) {
    let errorMessage = "Location access denied";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "Location access denied";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable";
            break;
        case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "Location error occurred";
            break;
    }
    document.getElementById("location").innerText = errorMessage;
}

// 🕒 Update Time & Date
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const date = now.toLocaleDateString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const day = now.toLocaleDateString("en-US", { weekday: "long" });

    document.getElementById("time").innerText = time;
    document.getElementById("date").innerText = date;
    document.getElementById("day").innerText = day.toUpperCase();
}

// Start
getLocation();
updateTime();
setInterval(updateTime, 1000); // Update time every second
setInterval(() => getLocation(), 300000); // Update weather every 5 minutes

// ===== ABOUT MOUNTAINEERING IMAGE TOGGLE =====
const aboutImages = document.querySelector(".about-images");
const frontBox = document.querySelector(".image-box.front");
const backBox = document.querySelector(".image-box.back");

aboutImages.addEventListener("click", () => {
    if (frontBox.classList.contains("front")) {
        frontBox.classList.remove("front");
        frontBox.classList.add("back");
        backBox.classList.remove("back");
        backBox.classList.add("front");
    } else {
        backBox.classList.remove("front");
        backBox.classList.add("back");
        frontBox.classList.remove("back");
        frontBox.classList.add("front");
    }
});

// ===== RECORDS & SUCCESS STORIES CAROUSEL =====
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');

    if (track && prevBtn && nextBtn) {
        // Function to update button states
        const updateButtons = () => {
            const scrollLeft = track.scrollLeft;
            const scrollWidth = track.scrollWidth;
            const clientWidth = track.clientWidth;

            // Disable prev button if at the start
            prevBtn.disabled = scrollLeft <= 0;

            // Disable next button if at the end
            // Added a small buffer (1) for precision issues
            nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
        };

        // Event listener for the "next" button
        nextBtn.addEventListener('click', () => {
            // Scroll by the width of one card (which is the full clientWidth)
            track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
        });

        // Event listener for the "previous" button
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
        });

        // Update buttons on scroll
        track.addEventListener('scroll', updateButtons);

        // Initial check
        updateButtons();

        // Update buttons on window resize
        new ResizeObserver(updateButtons).observe(track);
    }
});

// ===== MOUNTAINEERING LOCATIONS DATA =====
const mountaineeringLocations = {
    "k2": {
        name: "K2 Base Camp",
        description: "Starting point for K2 expeditions, the world's second highest peak at 8,611 meters. This challenging climb attracts expert mountaineers from around the world.",
        elevation: "5,150m",
        difficulty: "Extreme",
        bestSeason: "June-August"
    },
    "skardu": {
        name: "Skardu",
        description: "Gateway to the Karakoram range and popular mountaineering hub. Provides access to multiple 8,000m peaks including K2 and Gasherbrum.",
        elevation: "2,228m",
        difficulty: "Beginner to Advanced",
        bestSeason: "May-September"
    },
    "hunza": {
        name: "Hunza Valley",
        description: "Base for Rakaposhi (7,788m) and other Karakoram peaks. Known for its stunning scenery and rich cultural heritage.",
        elevation: "2,438m",
        difficulty: "Intermediate to Advanced",
        bestSeason: "April-October"
    },
    "nanga": {
        name: "Nanga Parbat Base Camp",
        description: "Base camp for the 'Killer Mountain', one of the world's most dangerous peaks at 8,126 meters. Known for extreme weather and technical challenges.",
        elevation: "4,200m",
        difficulty: "Extreme",
        bestSeason: "June-August"
    },
    "fairy": {
        name: "Fairy Meadows",
        description: "Beautiful meadow with breathtaking views of Nanga Parbat. Popular with trekkers and a starting point for Nanga Parbat expeditions.",
        elevation: "3,300m",
        difficulty: "Beginner to Intermediate",
        bestSeason: "May-September"
    },
    "abbottabad": {
        name: "Abbottabad",
        description: "Home to several mountaineering clubs and training centers. Ideal starting point for expeditions to the Himalayan and Karakoram ranges.",
        elevation: "1,256m",
        difficulty: "Beginner",
        bestSeason: "Year-round"
    },
    "gilgit": {
        name: "Gilgit",
        description: "Major city for mountaineering expeditions in the Karakoram. Provides supplies, guides, and logistical support for climbs in the region.",
        elevation: "1,500m",
        difficulty: "Beginner to Advanced",
        bestSeason: "April-October"
    }
};

// Initialize the interactive features
function initMapInteractivity() {
    const locationList = document.getElementById('location-list');
    const locationInfo = document.getElementById('location-info');
    const mapIframe = document.getElementById('mountaineering-map');

    // Add click events to location list items
    document.querySelectorAll('#location-list li').forEach(item => {
        item.addEventListener('click', function () {
            const locationId = this.getAttribute('data-location');
            const coords = this.getAttribute('data-coords');
            const location = mountaineeringLocations[locationId];

            // Update active state in list
            document.querySelectorAll('#location-list li').forEach(li => {
                li.classList.remove('active');
            });
            this.classList.add('active');

            // Update location info display
            locationInfo.innerHTML = `
                        <h4>${location.name}</h4>
                        <p>${location.description}</p>
                        <p class="elevation">Elevation: ${location.elevation}</p>
                        <p>Difficulty: ${location.difficulty}</p>
                        <p>Best Season: ${location.bestSeason}</p>
                    `;
            locationInfo.classList.add('active');

            // Update map to focus on selected location
            updateMapView(coords, 10);
        });
    });

    // Map control buttons
    document.getElementById('view-all').addEventListener('click', function () {
        updateMapView('35.5,75.5', 7);
        resetSelection();
    });

    document.getElementById('view-k2').addEventListener('click', function () {
        updateMapView('35.8806,76.5150', 12);
        selectLocation('k2');
    });

    document.getElementById('view-hunza').addEventListener('click', function () {
        updateMapView('36.3167,74.6500', 11);
        selectLocation('hunza');
    });

    // Function to update map view
    function updateMapView(coords, zoom) {
        // Create new iframe src with updated coordinates
        const newSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2716847.567489832!2d${coords.split(',')[1]}!3d${coords.split(',')[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s&z=${zoom}`;
        mapIframe.src = newSrc;
    }

    // Function to select a location programmatically
    function selectLocation(locationId) {
        const location = mountaineeringLocations[locationId];
        const listItem = document.querySelector(`#location-list li[data-location="${locationId}"]`);

        // Update active state in list
        document.querySelectorAll('#location-list li').forEach(li => {
            li.classList.remove('active');
        });
        listItem.classList.add('active');

        // Update location info display
        locationInfo.innerHTML = `
                    <h4>${location.name}</h4>
                    <p>${location.description}</p>
                    <p class="elevation">Elevation: ${location.elevation}</p>
                    <p>Difficulty: ${location.difficulty}</p>
                    <p>Best Season: ${location.bestSeason}</p>
                `;
        locationInfo.classList.add('active');
    }

    // Function to reset selection
    function resetSelection() {
        document.querySelectorAll('#location-list li').forEach(li => {
            li.classList.remove('active');
        });
        locationInfo.classList.remove('active');
    }

    // Initialize with K2 selected
    selectLocation('k2');
}

// Initialize the interactive features when the page loads
document.addEventListener('DOMContentLoaded', initMapInteractivity);

// ===== GALLERY CAROUSEL =====
const galleryCarousel = document.querySelector('.gallery-carousel');
const galleryPrevBtn = document.querySelector('.gallery-carousel-nav.prev');
const galleryNextBtn = document.querySelector('.gallery-carousel-nav.next');
const indicators = document.querySelectorAll('.gallery-carousel-indicators .indicator');
const totalCards = document.querySelectorAll('.gallery-card').length;

let currentIndex = 0;
const cardWidth = 325; // card width + gap

function updateCarousel() {
    galleryCarousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

galleryPrevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
});

galleryNextBtn.addEventListener('click', () => {
    currentIndex = Math.min(totalCards - 3, currentIndex + 1); // show 3 visible at once
    updateCarousel();
});

indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        currentIndex = parseInt(indicator.dataset.index);
        updateCarousel();
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
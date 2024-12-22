  // Play the background music once the page is fully loaded
  window.addEventListener('load', function () {
    var bgMusic = document.getElementById('bg-music');
    bgMusic.play();
});


const textElement = document.getElementById("text");
const message = "Merry Christmas!";
let index = 0;

function displayText() {
    textElement.textContent = message.substring(0, index + 1);
    index = (index + 1) % (message.length + 1);
}

// Update text every 500ms (half a second)
setInterval(displayText, 4500);





// Create modal dynamically
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

modal.addEventListener('click', () => {
    modal.classList.remove('show'); // Close modal on click
});

document.querySelectorAll('.present').forEach((present, index) => {
    present.addEventListener('click', () => {
        // Create an image element for the modal
        const img = document.createElement('img');
        img.src = `gift${index + 1}.jpg`; 
        img.alt = 'Gift Image'; 

     
        modal.innerHTML = ''; 
        modal.appendChild(img);

 
        modal.classList.add('show');
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const santa = document.getElementById('santa');
    const reindeer = document.getElementById('reindeer');
    
    function moveSantaAndReindeer() {
        const maxX = window.innerWidth - 100;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * window.innerHeight;
        
        santa.style.left = `${randomX}px`;
        santa.style.top = `${randomY}px`;
        
        reindeer.style.left = `${randomX + 100}px`; // Adjust position for the reindeer relative to Santa
        reindeer.style.top = `${randomY}px`;
    }

    setInterval(moveSantaAndReindeer, 3000); // Move Santa and Reindeer every 3 seconds
});








// Reference to the Santa container
const santaContainer = document.querySelector('.santa-container');

// Create and preload the Santa laugh audio
const santaLaugh = new Audio('santa.mp3'); // Replace 'laugh.mp3' with your actual file path
santaLaugh.preload = 'auto';

// Add animation frame monitoring
function checkSantaPosition() {
    const santaRect = santaContainer.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // Check if Santa is approximately in the middle
    if (santaRect.right > windowWidth / 2 - 50 && santaRect.right < windowWidth / 2 + 50) {
        // Play laugh sound if not already playing
        if (santaLaugh.paused) {
            santaLaugh.play();
        }
    }

    // Keep checking
    requestAnimationFrame(checkSantaPosition);
}

// Start monitoring Santa's position
checkSantaPosition();


const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let flashAlpha = 0; // Controls the intensity of the flash effect
let flashColor = "#FFFFFF"; // Default flash color

function getRandomColor() {
    const colors = ['#FFFFFF', '#FFFF00', '#0000FF', '#FF0000']; // Hex codes only
    return colors[Math.floor(Math.random() * colors.length)];
}

// Firework class to handle properties
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = getRandomColor();
        this.size = 5;
        this.speedY = Math.random() * -6 - 4; // Increased initial upward speed for higher launch
        this.exploded = false;
        this.particles = [];
        this.lifetime = 0;
        this.speedX = Math.random() * 2 - 1; // slight horizontal drift for realism
    }

    // Method to update the firework movement (going up)
    update() {
        if (!this.exploded) {
            this.y += this.speedY;
            this.x += this.speedX;
            this.speedY += 0.05; // gravity effect

            // If the firework reaches a certain height, explode it
            if (this.y <= window.innerHeight / 3) {
                this.explode();
            }
        } else {
            // Update particles after explosion
            this.particles.forEach(particle => particle.update());
        }

        this.lifetime++;
    }

    // Method to create particles for the explosion
    explode() {
        for (let i = 0; i < 50; i++) { // Reduced from 100 to 50 for smaller explosion
            let angle = (i / 50) * Math.PI * 2;
            let speed = Math.random() * 2 + 2; // Reduced speed for more contained explosion
            this.particles.push(new Particle(this.x, this.y, angle, speed, this.color));
        }
        this.exploded = true;
        flashColor = this.color; // Set the flash color to the firework's color
        flashAlpha = 0.5; // Set initial brightness of the flash
    }

    // Method to draw the firework or particles
    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            this.particles.forEach(particle => particle.draw());
        }
    }
}

// Particle class to handle explosion particles
class Particle {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.color = color;
        this.size = Math.random() * 2 + 1;
        this.life = 100; // Lifetime of the particle
        this.alpha = 1; // Transparency for fading effect
    }

    // Update particle position and lifetime
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.1; // gravity
        this.life--;
        this.alpha = this.life / 100; // Fade out effect
    }

    // Draw particle with glow effect
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha; // Add fading effect
        ctx.shadowColor = this.color; // Shadow effect to simulate glowing
        ctx.shadowBlur = 15; // Shadow blur for the glowing effect
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset alpha after drawing
        ctx.shadowBlur = 0; // Reset shadow blur
    }
}

// Function to launch a firework at a random x position
function launchFirework() {
    let x = Math.random() * canvas.width;
    let y = canvas.height - 50; // Starting at the bottom
    fireworks.push(new Firework(x, y));
}

// Launch fireworks every 1.5 seconds
setInterval(launchFirework, 1500);

// Function to animate a glowing background effect
function updateBackground() {
    let gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to handle the flash-bang effect
function flashBangEffect() {
    if (flashAlpha > 0) {
        ctx.fillStyle = `${flashColor}${Math.floor(flashAlpha * 255).toString(16).padStart(2, '0')}`; // Set color and alpha
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flashAlpha -= 0.02; // Gradually decrease the alpha to fade the flash
    }
}

// Animation loop to update the fireworks and particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update background with glowing effect
    updateBackground();

    // Add flash-bang effect
    flashBangEffect();

    // Update and draw all fireworks
    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });

    requestAnimationFrame(animate);
}

animate();










const starCount = 100; // Number of stars
const starsContainer = document.querySelector('.stars');

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.position = 'absolute';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 2 + 1}px`; // Random size between 1px and 3px
    star.style.height = star.style.width;
    star.style.backgroundColor = 'white';
    star.style.borderRadius = '50%';
    star.style.animation = `twinkle ${Math.random() * 2 + 1}s infinite alternate`;
    starsContainer.appendChild(star);
}

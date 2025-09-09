// Create full page canvas
let canvas = document.createElement('canvas');
canvas.id = 'fullPageDotsCanvas';
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// Style canvas to cover entire page
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const dots = [];
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
for (let index = 0; index < 100; index++) { // Increased number of dots
    dots.push({
        x:  Math.floor(Math.random() * canvas.width),
        y:  Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random()* 5)]
    });
}
const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.fill();
    })
}

// Initialize dots
drawDots();

// Full page mouse interaction
document.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    
    let mouse = {
        x: event.clientX,
        y: event.clientY
    }
    
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 300){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})
window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dots.length = 0;
    for (let index = 0; index < 100; index++) {
        dots.push({
            x:  Math.floor(Math.random() * canvas.width),
            y:  Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random()* 5)]
        });
    }
    drawDots();
})

// Initialize letter effects
const letterBoxes = document.querySelectorAll("[data-letter-effect]");
if (letterBoxes.length > 0) {
    setLetterEffect();
    setInterval(rotateSkills, 3000);
}

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

// Lista de habilidades que rotarán
const skills = ["Full Stack Developer", "Web Designer", "Software Engineer", "UI/UX Enthusiast", "Full Stack Developer", "UI/UX Enthusiast" ];
let currentSkillIndex = 0;

// Función para aplicar el efecto de animación
const setLetterEffect = function () {
  // Cambiar el texto del h1 con clase "right" a la siguiente habilidad
  const skillElement = document.querySelector('h1.right[data-letter-effect]');
  if (skillElement) {
    currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    skillElement.textContent = skills[currentSkillIndex];
  }

  // Loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // Set initial animation delay
    let letterAnimationDelay = 0;

    // Get all characters from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // Remove all characters from the current letter box
    letterBoxes[i].textContent = "";

    // Loop through all letters
    for (let j = 0; j < letters.length; j++) {
      // Create a span
      const span = document.createElement("span");

      // Set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // Set the "in" class on the span if the current letter box is active
      // Otherwise, class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // Pass current letter into span
      span.textContent = letters[j];

      // Add space class on span when the current letter contains a space
      if (letters[j] === " ") span.classList.add("space");

      // Pass the span to the current letter box
      letterBoxes[i].appendChild(span);

      // Skip letterAnimationDelay when the loop is in the last index
      if (j >= letters.length - 1) break;
      // Otherwise, update
      letterAnimationDelay += 0.05;
    }

    // Update totalLetterBoxDelay for the next letter box
    if (i >= letterBoxes.length - 1) break;
    totalLetterBoxDelay += 0.5;
  }

  // Update activeLetterBoxIndex and lastActiveLetterBoxIndex
  lastActiveLetterBoxIndex = activeLetterBoxIndex;
  activeLetterBoxIndex = (activeLetterBoxIndex >= letterBoxes.length - 1) ? 0 : activeLetterBoxIndex + 1;
};

// Función para cambiar el texto cada 3 segundos
const rotateSkills = function () {
  if (letterBoxes[1]) {
    currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    letterBoxes[1].textContent = skills[currentSkillIndex];
    setLetterEffect(); // Aplicar la animación después de cambiar el texto
  }
};

// Aplicar el efecto de animación al cargar la página
window.addEventListener("load", setLetterEffect);

// Cambiar el texto y aplicar la animación cada 3 segundos
setInterval(rotateSkills, 3000);
const starsContainer = document.createElement("div");

starsContainer.classList.add("stars");

document.body.appendChild(starsContainer);

for (let i = 0; i < 120; i++) {
  const star = document.createElement("span");

  const size = Math.random() * 2 + 1;

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;

  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  starsContainer.appendChild(star);
}

// Elementos que aparecem conforme a página é rolada

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// Movimento do planeta baseado no scroll

const heroPlanet = document.querySelector(".planet");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  if (heroPlanet) {
    heroPlanet.style.transform = `translateY(${scrollPosition * 0.25}px)
             rotate(${scrollPosition * 0.03}deg)`;
  }
});

// Nave acompanha o progresso da página

const spaceship = document.querySelector(".spaceship");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollProgress = scrollTop / documentHeight;

  if (scrollTop > 150) {
    spaceship.style.opacity = "1";

    const horizontalPosition = 4 + scrollProgress * 88;

    const verticalPosition = 85 - scrollProgress * 70;

    spaceship.style.left = `${horizontalPosition}%`;

    spaceship.style.top = `${verticalPosition}%`;

    spaceship.style.transform = `rotate(${45 + scrollProgress * 35}deg)`;
  } else {
    spaceship.style.opacity = "0";
  }
});

// Contadores animados

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

const startCounters = () => {
  const statsSection = document.querySelector(".stats");

  if (!statsSection || countersStarted) {
    return;
  }

  const statsTop = statsSection.getBoundingClientRect().top;

  if (statsTop < window.innerHeight - 80) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);

      let current = 0;

      const duration = 1500;
      const interval = 25;

      const increment = target / (duration / interval);

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.textContent = Math.floor(current);

          setTimeout(updateCounter, interval);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }
};

window.addEventListener("scroll", startCounters);

startCounters();

// Modal de reserva

const modal = document.querySelector("#reservationModal");

const openModal = document.querySelector("#openModal");

const closeModal = document.querySelector("#closeModal");

const reservationForm = document.querySelector("#reservationForm");

const formMessage = document.querySelector("#formMessage");

openModal.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent =
    "Reserva registrada! Nos vemos entre as estrelas. ✦";

  reservationForm.reset();
});


 // Detalhes dos destinos

const destinationData = {
  lua: {
    title: "Lua",
    distance: "384.400 km da Terra",
    description:
      "Contemple a Terra no horizonte, explore paisagens lunares e descubra a experiência de caminhar em outro mundo.",
    duration: "Duração da viagem: 3 dias",
  },
  marte: {
    title: "Marte",
    distance: "Distância variável da Terra",
    description:
      "Explore o planeta vermelho, suas paisagens desérticas e os mistérios de um dos destinos mais fascinantes do Sistema Solar.",
    duration: "Duração da viagem: 7 meses",
  },
  europa: {
    title: "Europa",
    distance: "Lua de Júpiter",
    description:
      "Descubra um mundo de gelo, paisagens extraordinárias e a possibilidade de um oceano escondido sob sua superfície.",
    duration: "Duração da viagem: 2 anos",
  },
};

const destinationModal = document.querySelector("#destinationModal");
const closeDestinationModal = document.querySelector("#closeDestinationModal");

document.querySelectorAll(".destination-card").forEach((card) => {
  card.addEventListener("click", () => {
    const destination = destinationData[card.dataset.destination];

    if (!destination) return;

    document.querySelector("#destinationModalDistance").textContent =
      destination.distance;

    document.querySelector("#destinationModalTitle").textContent =
      destination.title;

    document.querySelector("#destinationModalDescription").textContent =
      destination.description;

    document.querySelector("#destinationModalDuration").textContent =
      destination.duration;

    destinationModal.classList.add("active");
  });
});

closeDestinationModal.addEventListener("click", () => {
  destinationModal.classList.remove("active");
});

destinationModal.addEventListener("click", (event) => {
  if (event.target === destinationModal) {
    destinationModal.classList.remove("active");
  }
});

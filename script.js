// FAQ toggle (použito pokud nejsou v carouselu)
document.querySelectorAll('.question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });


function startCountdown(durationInSeconds) {
  let remaining = durationInSeconds;
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;

  function updateTimer() {
    const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
    if (remaining > 0) {
      remaining--;
      setTimeout(updateTimer, 1000);
    } else {
      countdownElement.textContent = 'AKCE UKONČENA';
    }
  }

  updateTimer();
}

// Spusť po načtení stránky
window.addEventListener('DOMContentLoaded', () => {
  startCountdown(51400); // např. 14 hodin 16 minut
});

    // ukazky pokoju u rezervace
  const roomPreview = document.getElementById('room-preview');
const roomInfo = document.getElementById('room-info');
const radios = document.querySelectorAll('input[name="value-radio"]');
const priceOutput = document.querySelector('.price-output');
const datumOd = document.querySelector('input[name="datum_od"]');
const datumDo = document.querySelector('input[name="datum_do"]');

const pokoje = {
  koralove: {
    name: "Korálové apartmá",
    image: "media/pokoj1.webp",
    vybava: ["Kingsize postel", "Podvodní okno", "Vířivka", "Wi-Fi"],
    cena: 14990
  },
  modra: {
    name: "Modrá hlubina",
    image: "media/pokoj2.webp",
    vybava: ["Postel pro 2", "LED sprcha", "TV", "Wi-Fi"],
    cena: 18890
  },
  atlantske: {
    name: "Atlantské apartmá",
    image: "media/pokoj3.webp",
    vybava: ["Lounge zóna", "Bar", "Smart TV", "Wi-Fi"],
    cena: 29990
  },
  standard: {
    name: "Standardní pokoj",
    image: "media/pokoj4.webp",
    vybava: ["Postel", "Sprcha", "Wi-Fi"],
    cena: 1490
  },
  rodinny: {
    name: "Rodinný pokoj",
    image: "media/pokoj5.webp",
    vybava: ["4 lůžka", "TV", "Vana"],
    cena: 2290
  },
  business: {
    name: "Business pokoj",
    image: "media/pokoj6.webp",
    vybava: ["Pracovní stůl", "Wi-Fi", "TV"],
    cena: 1890
  },
  junior: {
    name: "Junior Suite",
    image: "media/pokoj7.webp",
    vybava: ["Ložnice + obývák", "Vana", "Wi-Fi"],
    cena: 2590
  }
};

// Kalkulace ceny
function calculatePrice(type, from, to) {
  if (!pokoje[type] || isNaN(from) || isNaN(to) || from >= to) {
    return "Vyberte typ pokoje a termín.";
  }

  const days = Math.round((to - from) / (1000 * 60 * 60 * 24));
  let price = pokoje[type].cena * days;

  // Letní sleva červenec + srpen
  const isSummer = [6, 7].includes(from.getMonth()) || [6, 7].includes(to.getMonth());
  if (isSummer) price *= 0.7;

  return `Cena za ${days} nocí: ${Math.round(price)} Kč ${isSummer ? "(30% sleva)" : ""}`;
}

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const type = radio.value;
    const room = pokoje[type];

    roomPreview.src = room.image;
   roomInfo.innerHTML = `
      <h3>${room.name}</h3>
      <ul class="room-details">
        ${room.vybava.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <div class="room-price-box">Cena za noc: <strong>${room.cena.toLocaleString('cs-CZ')} Kč</strong></div>
    `;


    const from = new Date(datumOd.value);
    const to = new Date(datumDo.value);
    priceOutput.textContent = calculatePrice(type, from, to);
  });
});

datumOd.addEventListener('change', () => {
  const selected = document.querySelector('input[name="value-radio"]:checked');
  if (selected) selected.dispatchEvent(new Event('change'));
});
datumDo.addEventListener('change', () => {
  const selected = document.querySelector('input[name="value-radio"]:checked');
  if (selected) selected.dispatchEvent(new Event('change'));
});

// --- ganti-foto avatar ---
const inp = document.getElementById('avatar-input');
const img = document.getElementById('avatar-img');

inp.addEventListener('change', e => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => (img.src = ev.target.result);   // tampilkan pratinjau
  r.readAsDataURL(f);
});
document.addEventListener("DOMContentLoaded", function () {
  // Efek ketik Hi There
  new Typed("#hi-text", {
    strings: ["Hi There,", "Halo!", "Selamat datang!"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1200,
    startDelay: 300,
    loop: true,
    showCursor: false
  });

  // Efek ketik nama setelah sedikit delay
  setTimeout(() => {
    new Typed("#name-text", {
      strings: ["I'm <span class='primary'>Sri Meiriani Br Sinulingga</span>."],
      typeSpeed: 50,
      startDelay: 400,
      showCursor: false
    });
  }, 2000);

  // Efek ketik untuk bidang minat ("I Am Into ...")
  new Typed("#typed", {
    strings: ["Web Design", "UI/UX", "Frontend Development", "Illustration", "Creativity!"],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: "|"
  });
});

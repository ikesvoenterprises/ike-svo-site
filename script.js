const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const completeSystemCheckoutUrl = 'https://payhip.com/b/asC7j';

document.querySelectorAll('[data-complete-system-link]').forEach(link => {
  link.href = completeSystemCheckoutUrl;
});

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    if (menuButton) menuButton.textContent = '☰';
  });
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !navLinks?.classList.contains('open')) return;
  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
  if (menuButton) menuButton.textContent = '☰';
  menuButton?.focus();
});

document.querySelectorAll('[data-copy-code]').forEach(button => {
  button.addEventListener('click', async () => {
    const code = button.dataset.copyCode;
    try {
      await navigator.clipboard.writeText(code);
      const toast = document.querySelector('.toast');
      if (toast) {
        toast.textContent = `Code ${code} copied`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
      }
    } catch {
      button.textContent = code;
    }
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const macroCalculator = document.getElementById('macro-calculator');

function roundTo(value, interval) {
  return Math.round(value / interval) * interval;
}

function updateMacroTargets() {
  if (!macroCalculator) return;

  const sex = document.getElementById('calc-sex').value;
  const age = Number(document.getElementById('calc-age').value);
  const weightLb = Number(document.getElementById('calc-weight').value);
  const heightIn = Number(document.getElementById('calc-height').value);
  const activity = Number(document.getElementById('calc-activity').value);
  const goal = document.getElementById('calc-goal').value;

  if (!age || !weightLb || !heightIn || age < 18 || weightLb < 90 || heightIn < 48) return;

  const weightKg = weightLb * 0.453592;
  const heightCm = heightIn * 2.54;
  const sexOffset = sex === 'male' ? 5 : -161;
  const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + sexOffset;
  const maintenance = bmr * activity;
  const calorieFactor = goal === 'build' ? 1.08 : goal === 'reveal' ? 0.82 : 1;
  const calories = roundTo(maintenance * calorieFactor, 25);
  const proteinMultiplier = goal === 'reveal' ? 1 : 0.9;
  const protein = Math.round(weightLb * proteinMultiplier);
  const fatMultiplier = goal === 'build' ? 0.4 : goal === 'reveal' ? 0.32 : 0.36;
  const fat = Math.round(weightLb * fatMultiplier);
  const carbs = Math.max(0, Math.round((calories - (protein * 4) - (fat * 9)) / 4));
  const steps = goal === 'reveal' ? 10000 : goal === 'recomp' ? 8000 : 7000;
  const cardio = goal === 'reveal' ? '3 × 25 min' : goal === 'recomp' ? '2 × 20 min' : '2 × 15 min';
  const guidance = goal === 'build'
    ? 'Aim for a slow upward trend while keeping waist gain controlled. Review two full weeks before adding calories.'
    : goal === 'reveal'
      ? 'Aim for controlled weekly loss while maintaining training performance. Do not react to a single weigh-in.'
      : 'Hold targets consistently and evaluate waist, photos, and performance together over at least two weeks.';

  document.getElementById('result-calories').textContent = calories.toLocaleString();
  document.getElementById('result-protein').textContent = `${protein} g`;
  document.getElementById('result-fat').textContent = `${fat} g`;
  document.getElementById('result-carbs').textContent = `${carbs} g`;
  document.getElementById('result-steps').textContent = steps.toLocaleString();
  document.getElementById('result-cardio').textContent = cardio;
  document.getElementById('result-guidance').textContent = `${guidance} These are educational starting estimates, not medical or dietetic advice.`;
}

macroCalculator?.addEventListener('submit', event => {
  event.preventDefault();
  updateMacroTargets();
});

if (macroCalculator) updateMacroTargets();

/* Trail Food Planer – Daten: GearSkeptic Hiker Food 2.5 */
'use strict';

// ---------- Konstanten ----------
const OZ = 28.3495;
const TIERS = {
  gas:     { rank: 0, icon: '⛽', label: 'Tankstelle / General Store' },
  market:  { rank: 1, icon: '🏪', label: 'Kleiner Markt / Dollar General' },
  super:   { rank: 2, icon: '🛒', label: 'Supermarkt (Safeway, Walmart …)' },
  outdoor: { rank: 3, icon: '🏕', label: 'Outdoor-/Hikerladen, Resort-Store' },
  online:  { rank: 4, icon: '📦', label: 'Nur online / Paket (Maildrop)' },
};
const PREP = { none: 'ohne', cold: 'kalt anrühren', hot: 'heißes Wasser', cook: 'kochen' };
const MEALS = [
  ['breakfast', 'Frühstück'], ['drink', 'Drink'], ['lunch', 'Mittag'], ['snack', 'Snacks über den Tag'],
  ['dinner', 'Abendessen'], ['bump', 'Bump'], ['dessert', 'Dessert'],
];
const TAG_LABELS = {
  schoko: 'Schoko', erdnuss: 'Erdnuss', nuss: 'Nüsse', 'käse': 'Käse', fleisch: 'Fleisch', scharf: 'Scharf',
  frucht: 'Fruchtig', kaffee: 'Kaffee', asiatisch: 'Asiatisch', mexikanisch: 'Mexikanisch', pasta: 'Pasta',
  reis: 'Reis', kartoffel: 'Kartoffel', kokos: 'Kokos',
};
const NA_BY_TEMP = { 15: 3300, 20: 4100, 25: 5000, 30: 6100, 35: 7500, 40: 9500 };
const W = ['var(--w0)', 'var(--w1)', 'var(--w2)', 'var(--w3)', 'var(--w4)', 'var(--w5)'];

// GearSkeptic Color Keys
const RATE = {
  weight(koz) {
    if (koz < 110) return ['Schwer', 0];
    if (koz < 125) return ['Mäßig', 1];
    if (koz < 140) return ['Leicht', 2];
    if (koz < 155) return ['Sehr leicht', 3];
    if (koz < 170) return ['Ultraleicht', 4];
    return ['Hyperleicht', 5];
  },
  fat(p) {
    if (p < .40) return ['Fett niedrig', 0];
    if (p < .50) return ['Fett mäßig', 2];
    if (p < .60) return ['Fett gut', 3];
    if (p < .70) return ['Fett sehr gut', 5];
    return ['Fett hoch', 4];
  },
  cp(r) {
    if (r < 2.5) return ['KH/Prot unausgewogen', 1];
    if (r < 3.0) return ['KH/Prot gut', 3];
    if (r <= 4.0) return ['KH/Prot optimal', 5];
    if (r <= 4.5) return ['KH/Prot gut', 3];
    return ['KH/Prot unausgewogen', 1];
  },
  sugar(p) {
    if (p < .05) return ['Zucker niedrig', 3];
    if (p < .15) return ['Zucker optimal', 5];
    if (p < .25) return ['Zucker: kleine Portionen', 2];
    return ['Zucker hoch', 0];
  },
  na(x) {
    if (x < .64) return ['Na unter Bedarf', 1];
    if (x < 1.0) return ['Na leicht', 3];
    if (x <= 1.25) return ['Na mittel', 5];
    return ['Na hoch', 2];
  },
};

// ---------- Zustand ----------
const LS = 'trailfood-v1';
let D = null;          // Daten
let BY = new Map();    // id -> food
const S = load() || {
  settings: { stop: 'all', days: 4, kcal: 3500, protein: 100, temp: 25, prep: 'stove', profile: 'gs',
              lust: 40, variety: 65, lunch: true, bump: true, drink: false, dessert: false, veg: false, fresh: false },
  fav: [], dis: [], pin: [], tags: {}, plan: null,
};
const fav = new Set(S.fav), dis = new Set(S.dis), pin = new Set(S.pin);

function load() { try { return JSON.parse(localStorage.getItem(LS)); } catch (e) { return null; } }
function save() {
  S.fav = [...fav]; S.dis = [...dis]; S.pin = [...pin];
  try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { /* egal */ }
}

// ---------- Helfer ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (x, d = 0) => (x == null || !isFinite(x)) ? '–' : x.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const pill = ([txt, lvl]) => `<span class="pill" style="background:${W[lvl]}">${esc(txt)}</span>`;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1800); }
const fname = f => `${f.b} ${f.n}`.trim();

// ---------- Daten laden ----------
fetch('data/foods.json').then(r => r.json()).then(d => {
  D = d;
  for (const f of D.foods) {
    f.kg = f.kcal / f.g;
    f.koz = f.kg * OZ;
    f.fatp = f.fat != null ? f.fat * 9 / f.kcal : null;
    f.sugp = f.sug != null ? f.sug * 4 / f.kcal : null;
    f.cp = (f.carb != null && f.pro) ? f.carb / f.pro : null;
    f.nak = f.na != null ? f.na / f.kcal : null;
    f.tierRank = TIERS[f.tier].rank;
    f.fresh = f.c === 'Fruit' && /\braw\b|fresh/i.test(f.n);
    BY.set(f.id, f);
  }
  initUI();
  if (S.plan && S.plan.days.every(d => d.items.every(it => BY.has(it.id)))) renderPlan();
  else generate();
}).catch(err => {
  $('#summary').innerHTML = `<p class="empty">Daten konnten nicht geladen werden (${esc(err.message)}). Seite über einen Webserver öffnen, nicht als Datei.</p>`;
});

// ---------- Verfügbarkeit ----------
function currentStop() {
  const v = S.settings.stop;
  if (v === 'all') return null;
  if (v.startsWith('t:')) return { name: TIERS[v.slice(2)].label, tier: v.slice(2), outdoor: false, generic: true };
  return D.stops[+v.slice(2)];
}
function availableAt(f, stop) {
  if (!stop) return true;
  if (f.tier === 'online') return false;
  if (f.tier === 'outdoor') return !!stop.outdoor;
  return TIERS[f.tier].rank <= TIERS[stop.tier].rank;
}

// ---------- Pools ----------
function prepOk(f) {
  const p = S.settings.prep;
  if (p === 'stove') return true;
  if (p === 'coldsoak') return f.prep !== 'cook';
  return f.prep === 'none' || f.prep === 'cold';
}
function tagBlocked(f) { return f.tags.some(t => S.tags[t] === -1); }
function baseOk(f, stop) {
  if (dis.has(f.id)) return false;
  if (!availableAt(f, stop)) return false;
  if (!prepOk(f)) return false;
  if (S.settings.veg && f.tags.includes('fleisch')) return false;
  if (f.fresh && !S.settings.fresh) return false;
  if (tagBlocked(f)) return false;
  return true;
}
function poolFor(meal, stop) {
  const ok = f => baseOk(f, stop);
  switch (meal) {
    case 'breakfast': return D.foods.filter(f => f.slot === 'breakfast' && ok(f));
    case 'drink': return D.foods.filter(f => f.slot === 'drink' && f.kcal >= 40 && ok(f));
    case 'bread': return D.foods.filter(f => f.c === 'Bread' && ok(f));
    case 'filling': return D.foods.filter(f => ['Nut Butter', 'Cheese', 'Meat'].includes(f.c) && ok(f));
    case 'snack': return D.foods.filter(f => (f.slot === 'snack' || (f.slot === 'lunch' && f.c !== 'Bread')) && ok(f));
    case 'dinner': return D.foods.filter(f => f.slot === 'dinner' && f.kcal >= 150 && ok(f));
    case 'bump': return D.foods.filter(f => f.slot === 'bump' && f.kg >= 6.5 && ok(f));
    case 'dessert': return D.foods.filter(f => f.slot === 'dessert' && ok(f));
  }
  return [];
}

// ---------- Portionen ----------
function defaultN(f, meal) {
  const k = f.kcal;
  switch (meal) {
    case 'breakfast': return f.src === 'dm' ? 1 : clamp(Math.round(450 / k), 1, 4);
    case 'dinner': return f.src === 'dm' ? 1 : clamp(Math.ceil(550 / k), 1, 4);
    case 'drink': return clamp(Math.round(150 / k), 1, 3);
    case 'bump': return clamp(Math.round(250 / k), 1, 4);
    case 'bread': case 'filling': case 'lunch': return clamp(Math.round(300 / k), 1, 4);
    case 'dessert': return 1;
    default: return k > 600 ? 1 : clamp(Math.round(280 / k), 1, 4);
  }
}

// ---------- Bewertung ----------
let DAY_BRANDS = new Map(); // Marken im aktuell geplanten Tag (Abwechslung)
function emptyT() { return { kcal: 0, g: 0, fat: 0, carb: 0, pro: 0, sug: 0, fib: 0, na: 0, k: 0 }; }
function addT(T, f, n, sign = 1) {
  for (const key of ['kcal', 'g', 'fat', 'carb', 'pro', 'sug', 'fib', 'na', 'k']) T[key] += sign * n * (f[key] || 0);
  return T;
}
const rangePen = (x, a, b) => x < a ? a - x : (x > b ? x - b : 0);
function penalty(T) {
  const st = S.settings;
  if (T.kcal <= 0) return 0;
  const fatp = T.fat * 9 / T.kcal, sugp = T.sug * 4 / T.kcal, prop = T.pro * 4 / T.kcal, carbp = T.carb * 4 / T.kcal;
  const cp = T.carb / Math.max(T.pro, 1);
  const proProj = T.pro / T.kcal * st.kcal;
  const proPen = Math.max(0, (st.protein - proProj) / st.protein);
  if (st.profile === 'gs') return Math.abs(fatp - .62) * 1.6 + rangePen(cp, 3, 4) / 3 + rangePen(sugp, .05, .15) * 3 + proPen * 1.2;
  if (st.profile === 'bal') return Math.abs(fatp - .35) * 1.5 + Math.abs(carbp - .47) + Math.abs(prop - .18) * 2 + proPen;
  return proPen * .5;
}
function prefOf(f) {
  let p = fav.has(f.id) ? 1.2 : 0;
  let t = 0;
  for (const tg of f.tags) if (S.tags[tg] === 1) t += .7;
  return p + Math.min(t, 1.4);
}
function weights() {
  const l = S.settings.lust / 100, v = S.settings.variety / 100;
  return {
    wW: .6 + 1.8 * (1 - l),
    wB: S.settings.profile === 'weight' ? .6 : 1.4,
    wP: .25 + 1.9 * l,
    wV: .1 + 1.6 * v,
    noise: .12 + .55 * l,
  };
}
function value(f, n, T, used, meal, w) {
  const T2 = addT({ ...T }, f, n);
  const dens = T2.kcal / T2.g;
  const cap = { breakfast: .28, dinner: .38, dessert: .15, drink: .1, bump: .1 }[meal];
  const over = cap ? Math.max(0, f.kcal * n - cap * S.settings.kcal) / (cap * S.settings.kcal) : 0;
  return w.wW * (dens - 4) / 2
    - w.wB * (penalty(T2) + over)
    + w.wP * prefOf(f)
    - w.wV * (used.get(f.id) || 0)
    - w.wV * .9 * (DAY_BRANDS.get(f.b) || 0)
    + w.noise * Math.random();
}
function pick(pool, meal, T, used, exclude, w, maxKcal) {
  let best = null, bestV = -Infinity;
  for (const f of pool) {
    if (exclude.has(f.id)) continue;
    let n = defaultN(f, meal === 'bread' || meal === 'filling' ? 'lunch' : meal);
    if (maxKcal && meal === 'snack') n = clamp(Math.min(n, Math.ceil(maxKcal / f.kcal)), 1, 4);
    const v = value(f, n, T, used, meal, w);
    if (v > bestV) { bestV = v; best = { f, n }; }
  }
  return best;
}

function setDayBrands(day, skip = -1) {
  DAY_BRANDS = new Map();
  day.items.forEach((x, k) => { if (k !== skip) { const b = BY.get(x.id).b; DAY_BRANDS.set(b, (DAY_BRANDS.get(b) || 0) + 1); } });
}

// ---------- Planer ----------
function generate() {
  const st = S.settings, stop = currentStop(), w = weights();
  const old = S.plan && S.plan.days || [];
  const used = new Map();
  const days = [];
  const pools = {};
  for (const m of ['breakfast', 'drink', 'bread', 'filling', 'snack', 'dinner', 'bump', 'dessert']) pools[m] = poolFor(m, stop);
  const pinned = [...pin].map(id => BY.get(id)).filter(f => f && availableAt(f, stop));

  // gesperrte Positionen zuerst zählen
  old.slice(0, st.days).forEach(d => d.items.filter(i => i.locked).forEach(i => used.set(i.id, (used.get(i.id) || 0) + 1)));

  for (let di = 0; di < st.days; di++) {
    const items = (old[di] ? old[di].items.filter(i => i.locked && BY.has(i.id)) : []).map(i => ({ ...i }));
    const T = emptyT();
    items.forEach(i => addT(T, BY.get(i.id), i.n));
    const inDay = new Set(items.map(i => i.id));
    DAY_BRANDS = new Map();
    items.forEach(i => { const b = BY.get(i.id).b; DAY_BRANDS.set(b, (DAY_BRANDS.get(b) || 0) + 1); });
    const hasMeal = m => items.some(i => i.meal === m);
    const put = (meal, r) => {
      if (!r) return;
      items.push({ id: r.f.id, n: r.n, meal, locked: false });
      addT(T, r.f, r.n); inDay.add(r.f.id); used.set(r.f.id, (used.get(r.f.id) || 0) + 1);
      DAY_BRANDS.set(r.f.b, (DAY_BRANDS.get(r.f.b) || 0) + 1);
    };

    // Pins verteilen
    pinned.forEach((f, i) => {
      if (i % st.days !== di || inDay.has(f.id)) return;
      const meal = ['breakfast', 'dinner', 'drink', 'bump', 'dessert'].includes(f.slot) ? f.slot : 'snack';
      put(meal, { f, n: defaultN(f, meal) });
    });

    if (!hasMeal('breakfast')) put('breakfast', pick(pools.breakfast, 'breakfast', T, used, inDay, w));
    if (st.drink && !hasMeal('drink')) put('drink', pick(pools.drink, 'drink', T, used, inDay, w));
    if (st.lunch && !hasMeal('lunch')) {
      put('lunch', pick(pools.bread, 'bread', T, used, inDay, w));
      put('lunch', pick(pools.filling, 'filling', T, used, inDay, w));
    }
    if (!hasMeal('dinner')) put('dinner', pick(pools.dinner, 'dinner', T, used, inDay, w));
    if (st.bump && !hasMeal('bump')) put('bump', pick(pools.bump, 'bump', T, used, inDay, w));
    if (st.dessert && !hasMeal('dessert')) put('dessert', pick(pools.dessert, 'dessert', T, used, inDay, w));

    let guard = 0;
    while (T.kcal < st.kcal * .97 && guard++ < 16) {
      const rest = st.kcal - T.kcal;
      if (rest < 90) break;
      const r = pick(pools.snack, 'snack', T, used, inDay, w, rest);
      if (!r) break;
      put('snack', r);
    }
    days.push({ items });
  }
  S.plan = { days, stop: st.stop };
  save();
  renderPlan();
}

function swapItem(di, ii) {
  const day = S.plan.days[di], it = day.items[ii], f0 = BY.get(it.id);
  const stop = currentStop(), w = weights();
  const meal = it.meal === 'lunch' ? (f0.c === 'Bread' ? 'bread' : 'filling') : it.meal;
  const pool = poolFor(meal, stop);
  const T = emptyT();
  day.items.forEach((x, k) => { if (k !== ii) addT(T, BY.get(x.id), x.n); });
  const used = new Map();
  S.plan.days.forEach(d => d.items.forEach(x => used.set(x.id, (used.get(x.id) || 0) + 1)));
  const ex = new Set(day.items.map(x => x.id));
  setDayBrands(day, ii);
  const scored = [];
  for (const f of pool) {
    if (ex.has(f.id)) continue;
    let n = defaultN(f, meal === 'bread' || meal === 'filling' ? 'lunch' : meal);
    if (meal === 'snack') n = clamp(Math.round(f0.kcal * it.n / f.kcal), 1, 4);
    scored.push({ f, n, v: value(f, n, T, used, meal, w) });
  }
  if (!scored.length) { toast('Keine Alternative an diesem Ort'); return; }
  scored.sort((a, b) => b.v - a.v);
  const r = scored[Math.floor(Math.random() * Math.min(5, scored.length))];
  day.items[ii] = { id: r.f.id, n: r.n, meal: it.meal, locked: false };
  save(); renderPlan();
}

// ---------- Rendern: Plan ----------
function planTotals() {
  const T = emptyT();
  S.plan.days.forEach(d => d.items.forEach(i => addT(T, BY.get(i.id), i.n)));
  return T;
}
function bestElectrolyte(stop) {
  const list = (D.electrolytes || []).filter(e => e.na > 100 && (!stop || e.tier !== 'online'));
  list.sort((a, b) => (b.na || 0) - (a.na || 0));
  return list.find(e => /lmnt|liquid i\.?v|nuun|skratch|gatorlyte|salt/i.test(e.b + ' ' + e.n)) || list[0];
}
function renderSummary() {
  const st = S.settings, stop = currentStop();
  const T = planTotals(), nd = S.plan.days.length;
  const kgd = T.kcal / T.g, koz = kgd * OZ;
  const fatp = T.fat * 9 / T.kcal, carbp = T.carb * 4 / T.kcal, prop = T.pro * 4 / T.kcal, sugp = T.sug * 4 / T.kcal;
  const naNeed = NA_BY_TEMP[st.temp], naDay = T.na / nd, proDay = T.pro / nd;
  const naGap = Math.max(0, naNeed - naDay);
  const el = bestElectrolyte(stop);

  const rows = [2, 3, 4, 5, 6, 7].map(d => `<td class="${d === nd ? 'cur' : ''}">${fmt(d * st.kcal / kgd / 1000, 1)} kg</td>`).join('');
  let warn = '';
  if (stop) {
    const bf = poolFor('breakfast', stop).length, dn = poolFor('dinner', stop).length, sn = poolFor('snack', stop).length;
    if (bf < 5 || dn < 5 || sn < 40) warn = `<div class="warnbox">⚠️ ${esc(stop.name)}: wenig Auswahl (${bf} Frühstück, ${dn} Abendessen, ${sn} Snacks im Datensatz). Ein Paket mit Lieblingssachen lohnt sich hier.</div>`;
  }
  $('#summary').innerHTML = `
    <div class="kpis">
      <div class="kpi"><span>Essen gesamt</span><b>${fmt(T.g / 1000, 2)} kg</b><small>${fmt(T.g / nd)} g pro Tag · ${fmt(T.g / nd / 453.6, 2)} lb</small></div>
      <div class="kpi"><span>Kalorien</span><b>${fmt(T.kcal)}</b><small>${fmt(T.kcal / nd)} kcal pro Tag</small></div>
      <div class="kpi"><span>Dichte</span><b>${fmt(kgd, 2)} kcal/g</b><small>${fmt(koz)} kcal/oz · ${pill(RATE.weight(koz))}</small></div>
      <div class="kpi"><span>Protein</span><b>${fmt(proDay)} g/Tag</b><small>Ziel ${st.protein} g ${proDay >= st.protein * .95 ? '✅' : '⚠️'}</small></div>
      <div class="kpi"><span>Natrium</span><b>${fmt(naDay)} mg/Tag</b><small>Bedarf bei ${st.temp} °C ≈ ${fmt(naNeed)} mg</small></div>
    </div>
    <div class="macro-bar"><i style="width:${fatp * 100}%;background:#c8752f"></i><i style="width:${carbp * 100}%;background:#d9b23a"></i><i style="width:${prop * 100}%;background:#2f6b4f"></i></div>
    <div class="legend"><span><i style="background:#c8752f"></i>Fett ${fmt(fatp * 100)} %</span><span><i style="background:#d9b23a"></i>Kohlenhydrate ${fmt(carbp * 100)} % (davon Zucker ${fmt(sugp * 100)} %)</span><span><i style="background:#2f6b4f"></i>Protein ${fmt(prop * 100)} %</span></div>
    <div class="ratings">${pill(RATE.fat(fatp))}${pill(RATE.cp(T.carb / T.pro))}${pill(RATE.sugar(sugp))}${pill(RATE.na(T.na / T.kcal))}</div>
    ${naGap > 300 ? `<div class="hint">🧂 Es fehlen ca. ${fmt(naGap)} mg Natrium pro Tag${el ? `, z. B. ${fmt(naGap / el.na, 1)}× ${esc(el.b)} ${esc(el.n)} (${fmt(el.na)} mg Na)` : ''}. Siehe Tab Elektrolyte.</div>` : ''}
    <table class="resupply-table"><tr><th colspan="6">Gewicht für ${fmt(st.kcal)} kcal/Tag bei dieser Dichte</th></tr>
      <tr>${[2, 3, 4, 5, 6, 7].map(d => `<th>${d} Tage</th>`).join('')}</tr><tr>${rows}</tr></table>
    ${warn}`;
}

function itemHTML(it, di, ii) {
  const f = BY.get(it.id);
  const g = f.g * it.n, k = f.kcal * it.n;
  const t = TIERS[f.tier];
  return `<div class="item ${it.locked ? 'locked' : ''}" data-d="${di}" data-i="${ii}">
    <div class="nm">${esc(f.b)} <small>${esc(f.n)}</small></div>
    <div class="nums">${fmt(g)} g · ${fmt(k)} kcal</div>
    <div class="acts">
      <span class="qty"><button data-a="minus" title="weniger">−</button>${it.n}× ${f.unit === 'Packung' ? 'Pkg.' : 'Port.'}<button data-a="plus" title="mehr">+</button></span>
      <span class="pill" style="background:${W[RATE.weight(f.koz)[1]]}">${fmt(f.kg, 1)} kcal/g</span>
      <span class="tier" title="${esc(t.label)}">${t.icon}</span>
      ${f.prep !== 'none' ? `<span class="tier" title="Zubereitung">${f.prep === 'cold' ? '🥣' : '🔥'}</span>` : ''}
      <span style="flex:1"></span>
      <button data-a="lock" title="Sperren">${it.locked ? '🔒' : '🔓'}</button>
      <button data-a="swap" title="Andere Idee">🔄</button>
      <button data-a="fav" title="Favorit">${fav.has(f.id) ? '❤️' : '🤍'}</button>
      <button data-a="dis" title="Mag ich nicht, nie wieder vorschlagen">👎</button>
      <button data-a="del" title="Entfernen">✕</button>
    </div>
  </div>`;
}
function renderDays() {
  const st = S.settings;
  $('#days').innerHTML = S.plan.days.map((d, di) => {
    const T = emptyT(); d.items.forEach(i => addT(T, BY.get(i.id), i.n));
    const pct = clamp(T.kcal / st.kcal * 100, 0, 100);
    const groups = MEALS.map(([m, label]) => {
      const its = d.items.map((it, ii) => [it, ii]).filter(([it]) => it.meal === m);
      if (!its.length) return '';
      return `<div class="meal">${label}</div>` + its.map(([it, ii]) => itemHTML(it, di, ii)).join('');
    }).join('');
    return `<div class="card day">
      <div class="day-head"><h3>Tag ${di + 1}</h3><span class="meta">${fmt(T.kcal)} kcal · ${fmt(T.g)} g · ${fmt(T.kcal / T.g, 2)} kcal/g · ${fmt(T.pro)} g Prot.</span></div>
      ${groups}
      <div style="display:flex;gap:6px;margin-top:6px"><button class="ghost" data-add="${di}">+ Snack</button></div>
      <div class="daybar"><i style="width:${pct}%"></i></div>
    </div>`;
  }).join('');
}
function shoppingList() {
  const agg = new Map();
  S.plan.days.forEach(d => d.items.forEach(i => {
    const a = agg.get(i.id) || { n: 0 }; a.n += i.n; agg.set(i.id, a);
  }));
  return [...agg.entries()].map(([id, a]) => ({ f: BY.get(id), n: a.n }))
    .sort((x, y) => x.f.tierRank - y.f.tierRank || fname(x.f).localeCompare(fname(y.f)));
}
function renderShopping() {
  const list = shoppingList();
  const byTier = {};
  list.forEach(r => (byTier[r.f.tier] = byTier[r.f.tier] || []).push(r));
  const html = Object.keys(TIERS).filter(t => byTier[t]).map(t => `
    <div class="shop-group"><h3>${TIERS[t].icon} ${TIERS[t].label}</h3>
    <table class="shop">${byTier[t].map(r => `<tr>
      <td>${esc(r.f.b)} <small>${esc(r.f.n)}</small></td>
      <td class="num">${r.n}× ${r.f.unit === 'Packung' ? 'Packung' : `Portion à ${fmt(r.f.g)} g`}</td>
      <td class="num">${fmt(r.f.g * r.n)} g</td><td class="num">${fmt(r.f.kcal * r.n)} kcal</td></tr>`).join('')}
    </table></div>`).join('');
  $('#shopping').innerHTML = `<h2>Einkaufsliste</h2>
    <p class="hint">Portionsangaben laut Nährwerttabelle. Wie viele Packungen das sind, steht auf der Packung (Portionen pro Packung).</p>
    ${html}
    <div class="shop-actions"><button class="ghost" id="b-copy">📋 Als Text kopieren</button><button class="ghost" id="b-csv">⬇️ CSV</button><button class="ghost" id="b-print">🖨 Drucken</button></div>`;
  $('#b-copy').onclick = () => {
    const st = S.settings, T = planTotals();
    const lines = [`Resupply ${S.plan.days.length} Tage · ${fmt(T.kcal)} kcal · ${fmt(T.g / 1000, 2)} kg`, ''];
    list.forEach(r => lines.push(`[ ] ${r.n}× ${fname(r.f)} (${fmt(r.f.g * r.n)} g, ${fmt(r.f.kcal * r.n)} kcal) ${TIERS[r.f.tier].icon}`));
    navigator.clipboard.writeText(lines.join('\n')).then(() => toast('Einkaufsliste kopiert'));
  };
  $('#b-csv').onclick = () => {
    const rows = [['Tag', 'Mahlzeit', 'Marke', 'Sorte', 'Anzahl', 'Einheit', 'g', 'kcal', 'Fett g', 'KH g', 'Protein g', 'Na mg', 'Erhältlich']];
    S.plan.days.forEach((d, di) => d.items.forEach(i => {
      const f = BY.get(i.id);
      rows.push([di + 1, (MEALS.find(m => m[0] === i.meal) || [, i.meal])[1], f.b, f.n, i.n, f.unit, Math.round(f.g * i.n), Math.round(f.kcal * i.n),
        Math.round((f.fat || 0) * i.n), Math.round((f.carb || 0) * i.n), Math.round((f.pro || 0) * i.n), Math.round((f.na || 0) * i.n), TIERS[f.tier].label]);
    }));
    const csv = rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(';')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' }));
    a.download = `resupply-${S.plan.days.length}tage.csv`; a.click();
  };
  $('#b-print').onclick = () => window.print();
}
function renderPlan() {
  if (!S.plan || !S.plan.days.length) return;
  renderSummary(); renderDays(); renderShopping();
}

// Aktionen im Plan
function onPlanClick(e) {
  const add = e.target.closest('[data-add]');
  if (add) {
    const di = +add.dataset.add, day = S.plan.days[di];
    const T = emptyT(); day.items.forEach(i => addT(T, BY.get(i.id), i.n));
    const used = new Map(); S.plan.days.forEach(d => d.items.forEach(x => used.set(x.id, (used.get(x.id) || 0) + 1)));
    setDayBrands(day);
    const r = pick(poolFor('snack', currentStop()), 'snack', T, used, new Set(day.items.map(i => i.id)), weights());
    if (r) day.items.push({ id: r.f.id, n: r.n, meal: 'snack', locked: false });
    save(); renderPlan(); return;
  }
  const b = e.target.closest('button[data-a]'); if (!b) return;
  const el = b.closest('.item'), di = +el.dataset.d, ii = +el.dataset.i;
  const day = S.plan.days[di], it = day.items[ii];
  switch (b.dataset.a) {
    case 'lock': it.locked = !it.locked; break;
    case 'swap': return swapItem(di, ii);
    case 'fav': fav.has(it.id) ? fav.delete(it.id) : fav.add(it.id); toast(fav.has(it.id) ? 'Als Favorit gemerkt' : 'Favorit entfernt'); break;
    case 'dis': dis.add(it.id); toast('Wird nicht mehr vorgeschlagen'); return swapItem(di, ii);
    case 'del': day.items.splice(ii, 1); break;
    case 'plus': it.n++; break;
    case 'minus': if (it.n > 1) it.n--; else day.items.splice(ii, 1); break;
  }
  save(); renderPlan();
}

// ---------- Lebensmittel-Browser ----------
const FB = { sort: 'kg', asc: false, limit: 100 };
function foodRows() {
  const q = $('#f-q').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const slot = $('#f-slot').value, cls = $('#f-class').value, tier = $('#f-tier').value, prep = $('#f-prep').value;
  const min = parseFloat($('#f-min').value) || 0, onlyFav = $('#f-fav').checked;
  let rows = D.foods.filter(f => {
    if (slot && f.slot !== slot && !(slot === 'lunch' && f.slot === 'lunch')) return false;
    if (cls && f.c !== cls) return false;
    if (tier) {
      if (tier === 'outdoor' || tier === 'online') { if (f.tier !== tier) return false; }
      else if (!(f.tierRank <= TIERS[tier].rank)) return false;
    }
    if (prep && f.prep !== prep) return false;
    if (f.kg < min) return false;
    if (onlyFav && !fav.has(f.id)) return false;
    if (q.length) { const s = `${f.b} ${f.n} ${f.cde}`.toLowerCase(); if (!q.every(w => s.includes(w))) return false; }
    return true;
  });
  const k = FB.sort, dir = FB.asc ? 1 : -1;
  rows.sort((a, b) => {
    const x = a[k], y = b[k];
    if (x == null) return 1; if (y == null) return -1;
    return (typeof x === 'string' ? x.localeCompare(y) : x - y) * dir;
  });
  return rows;
}
function renderFoods() {
  const rows = foodRows();
  $('#f-count').textContent = `${fmt(rows.length)} Treffer`;
  const show = rows.slice(0, FB.limit);
  $('#t-foods tbody').innerHTML = show.map(f => `<tr data-id="${f.id}">
    <td class="rowacts"><button data-a="fav" class="${fav.has(f.id) ? 'on' : ''}" title="Favorit">❤️</button><button data-a="pin" class="${pin.has(f.id) ? 'on' : ''}" title="Muss in den Plan">📌</button><button data-a="dis" class="${dis.has(f.id) ? 'on' : ''}" title="Mag ich nicht">👎</button></td>
    <td>${esc(f.b)}</td><td>${esc(f.n)}</td><td>${esc(f.cde)}${f.prep !== 'none' ? ` <small>(${PREP[f.prep]})</small>` : ''}</td>
    <td class="num">${fmt(f.g)}</td><td class="num">${fmt(f.kcal)}</td>
    <td class="num"><span class="cell-dens" style="background:${W[RATE.weight(f.koz)[1]]}">${fmt(f.kg, 2)}</span></td>
    <td class="num">${fmt(f.koz)}</td>
    <td class="num">${f.fatp == null ? '–' : fmt(f.fatp * 100)}</td>
    <td class="num">${f.sugp == null ? '–' : fmt(f.sugp * 100)}</td>
    <td class="num">${fmt(f.pro, 0)}</td>
    <td class="num">${f.cp == null ? '–' : fmt(f.cp, 1)}</td>
    <td class="num">${f.nak == null ? '–' : fmt(f.nak, 2)}</td>
    <td title="${esc(TIERS[f.tier].label)}">${TIERS[f.tier].icon} <small>${esc(TIERS[f.tier].label.split(' (')[0])}</small></td>
  </tr>`).join('') || `<tr><td colspan="14" class="empty">Nichts gefunden</td></tr>`;
  $('#f-more').style.display = rows.length > FB.limit ? '' : 'none';
  $$('#t-foods th').forEach(th => { th.classList.toggle('sorted', th.dataset.k === FB.sort); th.classList.toggle('asc', th.dataset.k === FB.sort && FB.asc); });
}

// ---------- Elektrolyte ----------
function renderElec() {
  const q = $('#e-q').value.trim().toLowerCase();
  const list = D.electrolytes.filter(e => !q || `${e.b} ${e.n}`.toLowerCase().includes(q)).sort((a, b) => (b.na || 0) - (a.na || 0));
  $('#t-elec tbody').innerHTML = list.map(e => `<tr><td>${esc(e.b)} <small>${esc(e.n)}</small></td><td class="num">${fmt(e.g, 1)}</td><td class="num">${fmt(e.kcal)}</td><td class="num">${fmt(e.na)}</td><td class="num">${fmt(e.k)}</td><td class="num">${fmt(e.mg)}</td><td class="num">${e.caf ? fmt(e.caf) + ' mg' : ''}</td><td title="${esc(TIERS[e.tier].label)}">${TIERS[e.tier].icon}</td></tr>`).join('');
}

// ---------- Init ----------
function initUI() {
  const st = S.settings;
  // Tabs
  $$('.tab').forEach(b => b.onclick = () => {
    $$('.tab').forEach(x => x.classList.toggle('active', x === b));
    $$('.panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + b.dataset.tab));
    if (b.dataset.tab === 'foods') renderFoods();
  });

  // Stops
  const sel = $('#s-stop');
  sel.innerHTML = `<option value="all">📦 Alles (online bestellt / Paket)</option>
    <optgroup label="Generisch">${['super', 'market', 'gas'].map(t => `<option value="t:${t}">${TIERS[t].icon} ${TIERS[t].label}</option>`).join('')}</optgroup>
    <optgroup label="PCT Resupply (NOBO)">${D.stops.map((s, i) => `<option value="s:${i}">Meile ${s.mile} · ${esc(s.name)}</option>`).join('')}</optgroup>`;
  sel.value = st.stop;
  const stopInfo = () => {
    const s = currentStop();
    $('#stop-info').innerHTML = !s ? 'Volle Auswahl inkl. Online-Marken, ideal für Pakete von zu Hause.'
      : s.generic ? `Alles, was es typischerweise bis zu dieser Ladengröße gibt.`
      : `${TIERS[s.tier].icon} ${esc(s.note)}${s.outdoor ? ' · 🏕 Trockenmahlzeiten erhältlich' : ''}`;
  };
  stopInfo();
  sel.onchange = () => { st.stop = sel.value; stopInfo(); save(); generate(); };

  const bindNum = (id, key, regen = true) => {
    const el = $(id); el.value = st[key];
    el.onchange = () => { st[key] = +el.value; save(); regen ? generate() : renderPlan(); };
  };
  const days = $('#s-days'); days.value = st.days; $('#v-days').textContent = st.days;
  days.oninput = () => { $('#v-days').textContent = days.value; };
  days.onchange = () => { st.days = +days.value; save(); generate(); };
  bindNum('#s-kcal', 'kcal'); bindNum('#s-protein', 'protein'); bindNum('#s-temp', 'temp', false);
  bindNum('#s-lust', 'lust'); bindNum('#s-var', 'variety');

  const seg = (id, key) => {
    $$(id + ' button').forEach(b => {
      b.classList.toggle('on', b.dataset.v === st[key]);
      b.onclick = () => { st[key] = b.dataset.v; $$(id + ' button').forEach(x => x.classList.toggle('on', x === b)); save(); generate(); };
    });
  };
  seg('#s-prep', 'prep'); seg('#s-profile', 'profile');

  for (const [id, key] of [['#c-lunch', 'lunch'], ['#c-bump', 'bump'], ['#c-drink', 'drink'], ['#c-dessert', 'dessert'], ['#c-veg', 'veg'], ['#c-fresh', 'fresh']]) {
    const el = $(id); el.checked = !!st[key];
    el.onchange = () => { st[key] = el.checked; save(); generate(); };
  }

  // Tags
  const tagBox = $('#s-tags');
  const drawTags = () => {
    tagBox.innerHTML = Object.entries(TAG_LABELS).map(([k, l]) =>
      `<button class="chip ${S.tags[k] === 1 ? 'yes' : S.tags[k] === -1 ? 'no' : ''}" data-t="${k}">${l}</button>`).join('');
  };
  drawTags();
  tagBox.onclick = e => {
    const b = e.target.closest('[data-t]'); if (!b) return;
    const k = b.dataset.t, v = S.tags[k];
    if (!v) S.tags[k] = 1; else if (v === 1) S.tags[k] = -1; else delete S.tags[k];
    drawTags(); save();
  };

  $('#btn-gen').onclick = () => { generate(); if (innerWidth < 900) $('#summary').scrollIntoView({ behavior: 'smooth' }); };
  $('#tab-plan').addEventListener('click', e => { if (e.target.closest('#days')) onPlanClick(e); });

  // Browser
  const classes = [...new Set(D.foods.map(f => f.c))].sort();
  $('#f-class').innerHTML += classes.map(c => `<option value="${esc(c)}">${esc(D.foods.find(f => f.c === c).cde)}</option>`).join('');
  ['#f-q', '#f-slot', '#f-class', '#f-tier', '#f-prep', '#f-min', '#f-fav'].forEach(id => $(id).addEventListener('input', () => { FB.limit = 100; renderFoods(); }));
  $('#f-more').onclick = () => { FB.limit += 200; renderFoods(); };
  $$('#t-foods th[data-k]').forEach(th => th.onclick = () => {
    if (FB.sort === th.dataset.k) FB.asc = !FB.asc; else { FB.sort = th.dataset.k; FB.asc = ['b', 'n', 'cde', 'tierRank'].includes(th.dataset.k); }
    renderFoods();
  });
  $('#t-foods tbody').onclick = e => {
    const b = e.target.closest('button[data-a]'); if (!b) return;
    const id = b.closest('tr').dataset.id;
    const set = { fav, pin, dis }[b.dataset.a];
    set.has(id) ? set.delete(id) : set.add(id);
    if (b.dataset.a === 'dis' && dis.has(id)) { fav.delete(id); pin.delete(id); }
    if (b.dataset.a === 'pin') toast(pin.has(id) ? 'Kommt beim nächsten Vorschlag in den Plan' : 'Pin entfernt');
    save(); renderFoods();
  };

  // Elektrolyte
  $('#nak-table').innerHTML = Object.entries(NA_BY_TEMP).map(([t, n]) => `<tr><td>${t} °C</td><td>${fmt(n)} mg</td></tr>`).join('');
  $('#e-q').oninput = renderElec; renderElec();

  // Methode
  $('#keys').innerHTML = `
    <table class="keytable"><tr><th>Gewichtsklasse</th><th>kcal/oz</th><th>kcal/g</th></tr>
      ${[['Schwer', '< 110', '< 3,88', 0], ['Mäßig', '110–125', '3,88–4,41', 1], ['Leicht', '125–140', '4,41–4,94', 2], ['Sehr leicht', '140–155', '4,94–5,47', 3], ['Ultraleicht', '155–170', '5,47–6,00', 4], ['Hyperleicht', '> 170', '> 6,00', 5]]
        .map(r => `<tr><td>${pill([r[0], r[3]])}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table>
    <table class="keytable"><tr><th>Kalorien aus Fett</th><th></th></tr>
      ${[['< 40 %', 'niedrig', 0], ['40–50 %', 'mäßig', 2], ['50–60 %', 'gut', 3], ['60–70 %', 'sehr gut', 5], ['≥ 70 %', 'hoch', 4]].map(r => `<tr><td>${r[0]}</td><td>${pill([r[1], r[2]])}</td></tr>`).join('')}</table>
    <table class="keytable"><tr><th>Kohlenhydrate : Protein</th><th></th></tr>
      ${[['< 2,5', 'unausgewogen', 1], ['2,5–2,9', 'gut', 3], ['3,0–4,0', 'optimal', 5], ['4,1–4,5', 'gut', 3], ['> 4,5', 'unausgewogen', 1]].map(r => `<tr><td>${r[0]}</td><td>${pill([r[1], r[2]])}</td></tr>`).join('')}</table>
    <table class="keytable"><tr><th>Kalorien aus Zucker</th><th></th></tr>
      ${[['< 5 %', 'niedrig', 3], ['5–15 %', 'optimal für den Trail', 5], ['15–25 %', 'kleinere Portionen öfter', 2], ['≥ 25 %', 'hoch', 0]].map(r => `<tr><td>${r[0]}</td><td>${pill([r[1], r[2]])}</td></tr>`).join('')}</table>
    <table class="keytable"><tr><th>mg Natrium pro kcal</th><th></th></tr>
      ${[['< 0,64', 'unter Tagesbedarf', 1], ['0,64–1,00', 'leicht', 3], ['1,00–1,25', 'mittel', 5], ['> 1,25', 'hoch', 2]].map(r => `<tr><td>${r[0]}</td><td>${pill([r[1], r[2]])}</td></tr>`).join('')}</table>`;
  $('#tierlist').innerHTML = Object.values(TIERS).map(t => `<li>${t.icon} ${t.label}</li>`).join('');
}

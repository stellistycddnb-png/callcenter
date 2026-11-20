'use strict';
/* КОЛ-ЦЕНТР: СМЕНА — графика: сцена офиса, логотип, иконка, заставка. MADE BY PESSIMIST */
const Gfx = (() => {
  const mk = (w, h) => {const c = document.createElement('canvas'); c.width = w; c.height = h; return c;};
  const rr = (g, x, y, w, h, r) => {g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();};
  const circ = (g, x, y, r, f) => {g.beginPath(); g.arc(x, y, r, 0, 6.2832); g.fillStyle = f; g.fill();};
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const rgb = c => 'rgb(' + c.join(',') + ')';

  function sky(g, x, y, w, h, p) {
    // p: 0 утро … 1 вечер
    const stops = [[[150, 190, 235], [250, 225, 180]], [[100, 170, 240], [190, 225, 250]], [[240, 150, 90], [250, 200, 120]], [[20, 24, 60], [70, 40, 90]]];
    const f = p * 3, i = Math.min(2, Math.floor(f)), k = f - i, A = mix(stops[i][0], stops[i + 1][0], k), B = mix(stops[i][1], stops[i + 1][1], k);
    const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, rgb(A)); gr.addColorStop(1, rgb(B)); g.fillStyle = gr; g.fillRect(x, y, w, h);
    const night = Math.max(0, p - .72) / .28; const sx = x + w * (.15 + p * .7), sy = y + h * (.65 - Math.sin(p * 3.14) * .5);
    circ(g, sx, sy, 9, night > .5 ? '#f2f2d8' : '#fff1a8');
    g.fillStyle = 'rgba(30,34,52,' + (.75 + night * .2) + ')'; const R = [[.02, .5], [.12, .34], [.24, .6], [.34, .28], [.46, .52], [.58, .38], [.7, .62], [.82, .3], [.92, .5]];
    R.forEach(r => g.fillRect(x + w * r[0], y + h * r[1], w * .1, h * (1 - r[1]))); if (night > 0) {g.fillStyle = 'rgba(255,224,120,' + night + ')'; R.forEach((r, i) => {for (let k2 = 0; k2 < 3; k2++) g.fillRect(x + w * r[0] + 3 + (k2 % 2) * 7, y + h * r[1] + 6 + k2 * 9, 3, 4);});}
  }
  function person(g, x, y, s, skin, shirt, t, ph, headset) {
    g.save(); g.translate(x, y); g.scale(s, s);
    rr(g, -9, 0, 18, 22, 6); g.fillStyle = shirt; g.fill(); circ(g, 0, -8, 8, skin);
    g.fillStyle = 'rgba(0,0,0,.45)'; g.beginPath(); g.arc(0, -10, 8.4, 3.2, 6.2); g.fill();
    if (headset) {g.strokeStyle = '#222'; g.lineWidth = 2; g.beginPath(); g.arc(0, -9, 9, 3.3, 6.1); g.stroke(); circ(g, -9, -7, 3, '#222'); circ(g, 9, -7, 3, '#222'); g.beginPath(); g.moveTo(9, -5); g.quadraticCurveTo(10, 3, 4, 3); g.stroke();}
    const b = Math.sin(t * 9 + ph) * 2; g.strokeStyle = skin; g.lineWidth = 3.2; g.lineCap = 'round'; g.beginPath(); g.moveTo(-8, 8); g.lineTo(-11, 20 + b); g.moveTo(8, 8); g.lineTo(11, 20 - b); g.stroke();
    g.restore();
  }
  function scene(g, w, h, t, S) {
    const p = S.p, night = Math.max(0, p - .72) / .28, dark = .15 + night * .4;
    const wall = g.createLinearGradient(0, 0, 0, h); wall.addColorStop(0, '#5d7a7a'); wall.addColorStop(1, '#46605f'); g.fillStyle = wall; g.fillRect(0, 0, w, h);
    g.fillStyle = '#2e3b3c'; g.fillRect(0, h * .74, w, h * .26); g.fillStyle = 'rgba(255,255,255,.04)'; for (let i = 0; i < 10; i++) g.fillRect(i * w / 10, h * .74, 2, h * .26);
    // окно
    const wx = w * .05, wy = h * .1, ww = w * .3, wh = h * .45; g.save(); rr(g, wx, wy, ww, wh, 4); g.clip(); sky(g, wx, wy, ww, wh, p); g.restore(); g.strokeStyle = '#d6dcd8'; g.lineWidth = 4; rr(g, wx, wy, ww, wh, 4); g.stroke(); g.lineWidth = 2; g.beginPath(); g.moveTo(wx + ww / 2, wy); g.lineTo(wx + ww / 2, wy + wh); g.moveTo(wx, wy + wh / 2); g.lineTo(wx + ww, wy + wh / 2); g.stroke();
    // часы
    const cx = w * .5, cy = h * .2; circ(g, cx, cy, 16, '#f4efe0'); g.strokeStyle = '#222'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 16, 0, 6.28); g.stroke();
    const tm = S.min, hr = (tm / 60) % 12, mn = tm % 60; g.lineWidth = 2.4; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.sin(hr / 12 * 6.283) * 8, cy - Math.cos(hr / 12 * 6.283) * 8); g.stroke(); g.lineWidth = 1.5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.sin(mn / 60 * 6.283) * 12, cy - Math.cos(mn / 60 * 6.283) * 12); g.stroke();
    // плакат
    rr(g, w * .4, h * .38, w * .2, h * .22, 3); g.fillStyle = '#f2e6b0'; g.fill(); g.fillStyle = '#b22'; g.font = '800 ' + Math.round(h * .045) + 'px sans-serif'; g.textAlign = 'center'; g.fillText('ПЛАН!', w * .5, h * .46); g.fillStyle = '#333'; g.font = '700 ' + Math.round(h * .03) + 'px sans-serif'; g.fillText('ДЕНЬГИ НЕ', w * .5, h * .52); g.fillText('ПАХНУТ', w * .5, h * .56);
    g.strokeStyle = '#1a7a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(w * .42, h * .58); g.lineTo(w * .47, h * .54); g.lineTo(w * .5, h * .56); g.lineTo(w * .57, h * .5); g.stroke();
    // кабинет босса
    const bx = w * .66, by = h * .12, bw = w * .3, bh = h * .6; g.fillStyle = 'rgba(160,210,230,.18)'; rr(g, bx, by, bw, bh, 4); g.fill(); person(g, bx + bw / 2, by + bh * .5, 1.4, '#e0b090', '#1b1f2a', t, 0, false); g.fillStyle = '#c33'; g.fillRect(bx + bw / 2 - 1.5, by + bh * .5 + 4, 3, 12);
    g.strokeStyle = '#9bb'; g.lineWidth = 3; rr(g, bx, by, bw, bh, 4); g.stroke(); g.fillStyle = '#222'; g.font = '700 ' + Math.round(h * .03) + 'px sans-serif'; g.fillText('ДИРЕКТОР', bx + bw / 2, by + bh + 12);
    // коллеги
    const cols = [['#e0b090', '#a33'], ['#b98c6c', '#357'], ['#f0c8a8', '#373']]; cols.forEach((c, i) => {const x = w * (.12 + i * .2), y = h * .56; person(g, x, y, 1.15, c[0], c[1], t, i * 2, true); g.fillStyle = '#6a4a2c'; g.fillRect(x - 22, y + 24, 44, 8); g.fillStyle = '#222'; g.fillRect(x - 11, y + 8, 22, 15); g.fillStyle = 'rgba(120,220,255,' + (.5 + Math.sin(t * 5 + i) * .15) + ')'; g.fillRect(x - 9, y + 10, 18, 11);});
    // ваш стол
    const dy = h * .8; const dg = g.createLinearGradient(0, dy, 0, h); dg.addColorStop(0, '#7a5230'); dg.addColorStop(1, '#4e321c'); g.fillStyle = dg; g.fillRect(0, dy, w, h - dy);
    g.fillStyle = '#222'; rr(g, w * .33, dy - h * .12, w * .34, h * .14, 4); g.fill(); g.fillStyle = 'rgba(110,255,170,' + (.55 + Math.sin(t * 3) * .1) + ')'; g.fillRect(w * .345, dy - h * .105, w * .31, h * .1);
    g.fillStyle = 'rgba(0,60,20,.55)'; for (let i = 0; i < 4; i++) g.fillRect(w * .36, dy - h * .095 + i * h * .022, w * (.1 + ((i * 37 + Math.floor(t * 2)) % 7) * .03), 3);
    // телефон
    const ph = S.ring ? Math.sin(t * 40) * 1.5 : 0; g.save(); g.translate(w * .15 + ph, dy + 6); rr(g, 0, 0, 36, 18, 4); g.fillStyle = S.ring ? '#ffd23a' : '#2a2a30'; g.fill(); if (S.ring) {g.shadowColor = '#ffd23a'; g.shadowBlur = 16; rr(g, 0, 0, 36, 18, 4); g.fill(); g.shadowBlur = 0;} g.restore();
    // кружка и пар
    g.fillStyle = '#eee'; rr(g, w * .78, dy + 4, 18, 16, 3); g.fill(); g.fillStyle = '#6b3e1c'; g.fillRect(w * .78 + 2, dy + 6, 14, 4); for (let i = 0; i < 3; i++) {g.strokeStyle = 'rgba(255,255,255,' + (.35 - i * .08) + ')'; g.lineWidth = 2; g.beginPath(); g.moveTo(w * .78 + 5 + i * 4, dy + 2); g.quadraticCurveTo(w * .78 + 2 + i * 4 + Math.sin(t * 3 + i) * 3, dy - 8, w * .78 + 6 + i * 4, dy - 16 - i * 3); g.stroke();}
    // освещение
    const lf = 1 - Math.max(0, Math.sin(t * 17) * Math.sin(t * 3.1)) * .06; g.fillStyle = 'rgba(8,10,30,' + dark * lf + ')'; g.fillRect(0, 0, w, h);
    const vg = g.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, h * .9); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.45)'); g.fillStyle = vg; g.fillRect(0, 0, w, h);
  }
  function logoText(g, cx, cy, s) {
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
    const draw = (t, y, size, c1, c2) => {g.font = '900 ' + size + 'px Impact,"Arial Black",sans-serif'; const gr = g.createLinearGradient(0, y - size / 2, 0, y + size / 2); gr.addColorStop(0, c1); gr.addColorStop(1, c2); g.strokeStyle = '#08060a'; g.lineWidth = size * .2; g.strokeText(t, cx, y + size * .06); g.shadowColor = 'rgba(255,60,200,.8)'; g.shadowBlur = size * .3; g.strokeStyle = '#ff3ac8'; g.lineWidth = size * .06; g.strokeText(t, cx, y); g.shadowBlur = 0; g.fillStyle = gr; g.fillText(t, cx, y);};
    draw('КОЛ-ЦЕНТР', cy - 24 * s, 66 * s, '#fff7a8', '#ffb400'); draw('СМЕНА', cy + 38 * s, 58 * s, '#a8fff0', '#00c8a8');
  }
  function headset(g, cx, cy, r, col) {
    g.strokeStyle = col; g.lineWidth = r * .16; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, r, Math.PI * 1.05, Math.PI * 1.95); g.stroke();
    rr(g, cx - r * 1.12, cy - r * .1, r * .42, r * .7, r * .15); g.fillStyle = col; g.fill(); rr(g, cx + r * .7, cy - r * .1, r * .42, r * .7, r * .15); g.fill();
    g.beginPath(); g.moveTo(cx + r * .92, cy + r * .6); g.quadraticCurveTo(cx + r * .9, cy + r * 1.25, cx + r * .2, cy + r * 1.25); g.stroke(); circ(g, cx + r * .15, cy + r * 1.25, r * .1, col);
  }
  function icon(S) {
    const c = mk(S, S), g = c.getContext('2d'), bg = g.createLinearGradient(0, 0, S, S); bg.addColorStop(0, '#3a1d6e'); bg.addColorStop(1, '#0c1030'); g.fillStyle = bg; g.fillRect(0, 0, S, S);
    for (let i = 0; i < 4; i++) {g.strokeStyle = 'rgba(255,58,200,' + (.5 - i * .1) + ')'; g.lineWidth = S * .012; g.beginPath(); g.arc(S * .5, S * .45, S * (.26 + i * .06), -.8, .8 + 3.14, false); g.stroke();}
    headset(g, S * .5, S * .42, S * .24, '#ffd23a');
    g.fillStyle = '#fff'; g.font = '900 ' + S * .2 + 'px Impact,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.strokeStyle = '#0c1030'; g.lineWidth = S * .03; g.strokeText('₴', S * .5, S * .5); g.fillStyle = '#7dffb0'; g.fillText('₴', S * .5, S * .5);
    g.font = '900 ' + S * .085 + 'px Impact,sans-serif'; g.fillStyle = '#fff7a8'; g.strokeText('КОЛ-ЦЕНТР', S * .5, S * .8); g.fillText('КОЛ-ЦЕНТР', S * .5, S * .8); g.font = '700 ' + S * .042 + 'px sans-serif'; g.fillStyle = '#ffd7a0'; g.fillText('PESSIMIST', S * .5, S * .91);
    return c;
  }
  function splash(w, h, txt) {
    const c = mk(w, h), g = c.getContext('2d'), bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#1a0c3a'); bg.addColorStop(.6, '#2a1050'); bg.addColorStop(1, '#0c0618'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
    const s = Math.min(w / 460, h / 800); for (let i = 0; i < 60; i++) {g.fillStyle = 'rgba(255,255,255,' + (.15 + (i * 37 % 10) / 20) + ')'; g.fillRect((i * 97 % 100) / 100 * w, (i * 53 % 100) / 100 * h * .7, 2, 2);}
    headset(g, w / 2, h * .3, 70 * s, '#ffd23a'); logoText(g, w / 2, h * .5, s);
    if (txt) {g.textAlign = 'center'; g.fillStyle = '#ffd7a0'; g.font = '700 ' + 20 * s + 'px sans-serif'; g.fillText('MADE BY PESSIMIST', w / 2, h * .6); g.fillStyle = '#9fd8ff'; g.font = '600 ' + 15 * s + 'px sans-serif'; g.fillText('@Izzolentaaa  ·  t.me/+OlavQF1edndlOWY1', w / 2, h * .635);}
    return c;
  }
  return {mk, scene, logoText, headset, icon, splash};
})();

'use strict';
/* КОЛ-ЦЕНТР: СМЕНА — процедурный звук и музыка. MADE BY PESSIMIST */
const Snd = (() => {
  let ac = null, mG = null, sG = null, nb = null, on = false, mv = .6, sv = .9, step = 0, timer = null, nextT = 0, mood = 'calm', ringT = null;
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  function init() {
    if (ac) return; try {ac = new (window.AudioContext || window.webkitAudioContext)();} catch (e) {return;}
    mG = ac.createGain(); sG = ac.createGain(); const c = ac.createDynamicsCompressor(); mG.connect(c); sG.connect(c); c.connect(ac.destination); mG.gain.value = mv * .5; sG.gain.value = sv * .7;
    nb = ac.createBuffer(1, ac.sampleRate, ac.sampleRate); const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  function resume() {init(); if (ac && ac.state !== 'running') ac.resume(); if (ac && !on) {on = true; nextT = ac.currentTime + .1; timer = setInterval(sched, 60);}}
  function setVol(m, s) {mv = m; sv = s; if (ac) {mG.gain.value = mv * .5; sG.gain.value = sv * .7;}}
  function osc(t, f, d, type, vol, dest, f2) {const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t + d); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(.02, d * .3)); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g); g.connect(dest); o.start(t); o.stop(t + d + .05);}
  function noise(t, d, vol, dest, type, f0, f1) {const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter(); s.buffer = nb; f.type = type || 'lowpass'; f.frequency.setValueAtTime(f0 || 1000, t); if (f1) f.frequency.exponentialRampToValueAtTime(f1, t + d); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); s.connect(f); f.connect(g); g.connect(dest); s.start(t, Math.random() * .5); s.stop(t + d + .05);}
  function sfx(n) {
    if (!ac || !on || sv <= 0) return; const t = ac.currentTime, o = sG;
    if (n === 'click') osc(t, 640, .05, 'square', .12, o, 380);
    else if (n === 'key') noise(t, .03, .18, o, 'highpass', 4000);
    else if (n === 'pick') {osc(t, 300, .08, 'triangle', .25, o, 500); noise(t, .06, .15, o, 'bandpass', 1500);}
    else if (n === 'hang') {osc(t, 420, .18, 'triangle', .25, o, 160);}
    else if (n === 'cash') {[0, 7, 12].forEach((k, i) => osc(t + i * .07, hz(84 + k), .22, 'sine', .22, o)); noise(t, .1, .12, o, 'highpass', 6000);}
    else if (n === 'bad') {osc(t, 150, .3, 'sawtooth', .2, o, 70);}
    else if (n === 'good') {[0, 4, 7, 12].forEach((k, i) => osc(t + i * .09, hz(67 + k), .4, 'triangle', .2, o));}
    else if (n === 'sad') {[0, -2, -5].forEach((k, i) => osc(t + i * .28, hz(62 + k), .7, 'sine', .22, o));}
    else if (n === 'coffee') {noise(t, .5, .2, o, 'bandpass', 800, 300); osc(t + .4, 880, .1, 'sine', .1, o);}
    else if (n === 'alarm') {for (let i = 0; i < 4; i++) osc(t + i * .18, i % 2 ? 480 : 640, .14, 'square', .16, o);}
    else if (n === 'ring1') {for (let i = 0; i < 2; i++) {osc(t + i * .2, 880, .15, 'square', .1, o); osc(t + i * .2, 1100, .15, 'square', .08, o);}}
  }
  function ringStart() {if (ringT) return; sfx('ring1'); ringT = setInterval(() => sfx('ring1'), 1500);}
  function ringStop() {if (ringT) {clearInterval(ringT); ringT = null;}}
  function setMood(m) {mood = m;}
  function sched() {
    if (!ac || !on || ac.state !== 'running' || mv <= 0) return; const sd = 60 / 78 / 4;
    while (nextT < ac.currentTime + .25) {note(step, nextT); nextT += sd; step++;}
  }
  function note(s, t) {
    const bar = (s >> 4) & 3, st = s & 15, root = [57, 53, 55, 52][bar] - (mood === 'tense' ? 2 : 0), o = mG, ch = [0, 3, 7, 10];
    if (st === 0) ch.forEach((k, i) => osc(t, hz(root + 12 + k), 3.4, 'triangle', .05, o)), osc(t, hz(root - 12), 3.6, 'sine', .2, o);
    if (st === 0 || st === 8) osc(t, 110, .14, 'sine', .35, o, 45);
    if (st === 4 || st === 12) noise(t, .08, mood === 'tense' ? .14 : .08, o, 'bandpass', 1800, 900);
    if (st % 2 === 0) noise(t, .025, .04, o, 'highpass', 7000);
    const mel = [0, -1, 7, -1, 5, -1, 3, -1, 0, -1, 3, -1, 7, -1, 10, -1], k = mel[(st + bar * 4) % 16]; if (k >= 0 && bar % 2 === 1) osc(t, hz(root + 24 + k), .5, 'sine', .06, o);
  }
  return {init, resume, setVol, sfx, ringStart, ringStop, setMood};
})();

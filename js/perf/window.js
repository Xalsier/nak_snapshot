const N = 3;
let C = 1;
function W() {
  for (let i = 1; i <= N; i++) {
    document.getElementById(`window${i}`).style.display = 'inline-block';
  }
}
function H(w) {
  const e = document.getElementById(`window${w}`);
  e.classList.add("active");
  e.classList.remove("inactive");
  e.querySelector(".window-content").style.display = 'flex';
  e.focus();
  for (let i = 1; i <= N; i++) {
    if (i !== w) {
      const o = document.getElementById(`window${i}`);
      o.classList.remove("active");
      o.classList.add("inactive");
      o.querySelector(".window-content").style.display = 'none';
    }
  }
  C = w;
}
document.addEventListener("DOMContentLoaded", () => {
  H(C);
  for (let i = 2; i <= N; i++) {
    document.querySelector(`#window${i} .window-content`).style.display = 'none';
  }
  const p = document.getElementById('proceed');
  if (p) {
    p.addEventListener('click', () => {
      W();
    });
  }
});
window.addEventListener('keydown', (e) => {
  if (e.code === "ArrowRight" || e.code === "Tab") {
    e.preventDefault();
    let n = C + 1;
    if (n > N) {
      n = 1;
    }
    H(n);
  } else if (e.code === "ArrowLeft" || (e.shiftKey && e.code === "Tab")) {
    e.preventDefault();
    let p = C - 1;
    if (p < 1) {
      p = N;
    }
    H(p);
  }
});
let s = null;
window.addEventListener('touchstart', (e) => {
  s = e.changedTouches[0].clientX;
});
window.addEventListener('touchend', (e) => {
  let x = e.changedTouches[0].clientX;
  let d = s - x;
  if (Math.abs(d) > 50) {
    if (d > 0) {
      let n = C + 1;
      if (n > N) {
        n = 1;
      }
      H(n);
    } else {
      let p = C - 1;
      if (p < 1) {
        p = N;
      }
      H(p);
    }
  }
});
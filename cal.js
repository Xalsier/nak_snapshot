日 = (e, n) => new Date(e, n, 1).getDay();
古 = (e, n, a) => new Date(e, n, a) < Date.now();
隠 = _ => 面 && (面.innerHTML = "");
獲 = _ => fetch("eve.json").then(e => e.json()).then(e => e.events);
設 = (e, n) => {(文 = 書[找]("cmy")) && (文.innerHTML = 12 * e + n + 1);};
造 = (e, n, a, s) => {
  (d = 書[元]("div")),
    (i = 日(a, s)),
    (d[名] = "cc"),
    Array.from({ length: i }).forEach(() => d.appendChild(Object.assign(書[元]("div"), { [名]: "cd empty" }))),
    Array.from({ length: n }, (_, n) => n + 1).forEach(n => {
      let o = 書[元]("div"),
        c = e[`${a}-${(s + 1 + "").padStart(2, "0")}-${(n + "").padStart(2, "0")}`],
        t = new Date(a, s, n).toDateString() == new Date().toDateString();
      o[名] = `cd ${古(a, s, n) ? "past " + `past-event-${c?.type}` : `event-${c?.type}`} ${t ? "today" : ""}`,
      o.innerHTML = n,
      d.appendChild(o);
    });
  return d;
};
面 = null;
初 = new Date();
元 = "createElement";
名 = "className";
找 = "getElementById";
旧 = (書 = document)[找]("pm");
新 = 書[找]("nm");
(更 = e => {
  初.setMonth(初.getMonth() + e);
  年 = 初.getFullYear();
  月 = 初.getMonth();
  数 = new Date(年, 月 + 1, 0).getDate();
  設(年, 月);
  獲().then(e => {
    (根 = 書[找]("ca")).innerHTML = "";
    根.appendChild(造(e, 数, 年, 月));
  });
})(0);
旧.onclick = _ => 更(-1);
新.onclick = _ => 更(1);
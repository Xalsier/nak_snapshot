事 = {
  "2023-01-25": {"type": 3}, // Placeholder Event
  "2023-01-27": {"type": 3}, // Placeholder Event
  "2023-04-16": {"type": 4}, // Placeholder Event
  "2023-04-28": {"type": 3}, // Placeholder Event
  "2023-04-30": {"type": 2}, // Placeholder Event
  "2023-05-07": {"type": 5}, // Placeholder Event
  "2023-05-13": {"type": 5}, // Placeholder Event
  "2023-05-16": {"type": 5}, // Placeholder Event
  "2023-05-17": {"type": 5} // Placeholder Event
};
// Code Golfed Calendar // < 1000 Characters //
日 = (e, n) => new Date(e, n, 1).getDay();
古 = (e, n, a) => new Date(e, n, a) < Date.now();
隠 = _ => 面 && (面.innerHTML = "");
獲 = _ => 事; // Calendar data is already available locally (No need for Fetch API)
設 = (e, n) => {(文 = 書[找]("cmy")) && (文.innerHTML = 12 * e + n + 1);};
造 = (e, n, a, s) => {
  (d = 書[元]("div")),
    (i = 日(a, s)),
    (d[名] = "cc"),
    Array.from({ length: i }).forEach(() => d.appendChild(Object.assign(書[元]("div"), { [名]: "cd empty" }))),
    Array.from({ length: n }, (_, n) => n + 1).forEach(n => {
      let o = 書[元]("div"),
        c = e[`${a}-${(s + 1 + "").padStart(2, "0")}-${(n + "").padStart(2, "0")}`],
        t = new Date(a, s, n).setHours(0,0,0,0) == 初.setHours(0,0,0,0); // Ignore the time, just compare the dates.
      o[名] = `cd ${古(a, s, n) ? "past " + `past-event-${c?.type}` : `event-${c?.type}`} ${t ? "today" : ""}`,
      o.innerHTML = n,
      d.appendChild(o);
    });
  return d;
};
面 = null;
初 = new Date(); // This now always represents today's date
表示 = new Date(); // This new object will represent the displayed date
元 = "createElement"; // DOM Element Variable
名 = "className"; // DOM Element Variable
找 = "getElementById"; // DOM Element Variable
旧 = (書 = document)[找]("pm"); // Previous Month
新 = 書[找]("nm"); // Next Month
(更 = e => {
  表示.setMonth(表示.getMonth() + e); // Adjust the displayed month
  年 = 表示.getFullYear(); // Get the year of the displayed month
  月 = 表示.getMonth(); // Get the displayed month
  数 = new Date(年, 月 + 1, 0).getDate(); // Get the number of days in the displayed month
  設(年, 月); // Update the displayed year and month
  根 = 書[找]("ca"); // Get the calendar element
  根.innerHTML = ""; // Clear the calendar container
  根.appendChild(造(獲(), 数, 年, 月)); // Append the newly generated month to the calendar container
})(0); // Immediately invoke the function with 0, causing the current month to be displayed.
旧.onclick = _ => 更(-1); // Go to Previous Month
新.onclick = _ => 更(1); // Go to Next Month
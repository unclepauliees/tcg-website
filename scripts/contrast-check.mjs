const palette = {
  concreteBlack: "#1C1C1A",
  trueBlack: "#0F0F0D",
  brass: "#C49A3C",
  brass700: "#6B4E16",
  sage: "#7D8B6D",
  offWhite: "#ECEAE3",
  trueWhite: "#FFFFFF",
  n300: "#BAB6AB",
  n400: "#908D83",
  n500: "#6B6860",
  n600: "#4A4D45",
  n700: "#333330",
  n800: "#242421",
};

const pairs = [
  ["dark primary", palette.offWhite, palette.concreteBlack, "normal"],
  ["dark secondary", palette.n300, palette.concreteBlack, "normal"],
  ["dark muted body", palette.n400, palette.concreteBlack, "normal"],
  ["dark muted", palette.n500, palette.concreteBlack, "large"],
  ["dark accent", palette.brass, palette.concreteBlack, "normal"],
  ["accent button", palette.trueBlack, palette.brass, "normal"],
  ["surface primary", palette.offWhite, palette.n800, "normal"],
  ["surface secondary", palette.n300, palette.n800, "normal"],
  ["surface muted body", palette.n400, palette.n800, "normal"],
  ["sage panel primary", palette.trueBlack, palette.sage, "normal"],
  ["light primary", "#161613", palette.trueWhite, "normal"],
  ["light secondary", palette.n700, palette.trueWhite, "normal"],
  ["light muted", palette.n600, palette.trueWhite, "normal"],
  ["light accent", palette.brass700, palette.trueWhite, "normal"],
  ["light raised primary", "#161613", "#F2F1EE", "normal"],
  ["light raised accent", palette.brass700, "#F2F1EE", "normal"],
];

function linearize(channel) {
  const value = channel / 255;
  return value <= 0.03928
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const normalized = hex.replace("#", "");
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return (
    0.2126 * linearize(red) +
    0.7152 * linearize(green) +
    0.0722 * linearize(blue)
  );
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  const light = Math.max(a, b);
  const dark = Math.min(a, b);
  return (light + 0.05) / (dark + 0.05);
}

console.log("TCG contrast matrix");
console.log("pair                 fg       bg       ratio  AA");

let failed = false;

for (const [name, foreground, background, use] of pairs) {
  const ratio = contrast(foreground, background);
  const required = use === "large" ? 3 : 4.5;
  const passes = ratio >= required;
  failed = failed || !passes;
  console.log(
    `${name.padEnd(20)} ${foreground.padEnd(8)} ${background.padEnd(8)} ${ratio
      .toFixed(2)
      .padStart(5)}  ${passes ? "PASS" : "FAIL"}`
  );
}

if (failed) {
  process.exitCode = 1;
}

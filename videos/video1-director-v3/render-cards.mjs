import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("/Users/kim/.npm/_npx/702923228c2ce1e6/node_modules/sharp");

const outDir = new URL("./cards/", import.meta.url);
await mkdir(outDir, { recursive: true });

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function cardSvg({ eyebrow, lines, sizes = [], status = "", confirm = false }) {
  const lineMarkup = lines.map((line, index) => {
    const size = sizes[index] ?? 104;
    const y = 150 + index * 120;
    const fill = index % 2 === 0 ? "#12a7e8" : "#f7fbff";
    const stroke = index % 2 === 0 ? "#f7fbff" : "#12a7e8";
    return `<text x="8" y="${y}" font-family="Arial" font-size="${size}" font-weight="900" letter-spacing="-3" fill="${fill}" stroke="${stroke}" stroke-width="8" paint-order="stroke fill" filter="url(#shadow)">${esc(line)}</text>`;
  }).join("");
  const statusY = 160 + lines.length * 120;
  const statusMarkup = status ? `
    <rect x="6" y="${statusY - 40}" width="${Math.min(660, status.length * 19 + 86)}" height="64" rx="10" fill="#042a43" fill-opacity=".82" stroke="#f7fbff" stroke-opacity=".84" stroke-width="2"/>
    <circle cx="31" cy="${statusY - 8}" r="9" fill="${confirm ? "#22c55e" : "#12a7e8"}"/>
    <text x="54" y="${statusY}" font-family="Arial" font-size="26" font-weight="700" letter-spacing="1.4" fill="#f7fbff">${esc(status)}</text>` : "";
  return `<svg width="920" height="440" viewBox="0 0 920 440" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="shadow" x="-20%" y="-20%" width="150%" height="160%"><feDropShadow dx="0" dy="9" stdDeviation="4" flood-color="#07385f" flood-opacity=".92"/></filter></defs>
    <rect x="4" y="20" width="70" height="6" rx="3" fill="#ef3340"/>
    <text x="88" y="31" font-family="Arial" font-size="24" font-weight="700" letter-spacing="2" fill="#f7fbff" stroke="#001522" stroke-opacity=".6" stroke-width="2" paint-order="stroke fill">${esc(eyebrow)}</text>
    ${lineMarkup}${statusMarkup}
  </svg>`;
}

const cards = {
  hook: { eyebrow: "TỪ NGUYÊN LIỆU ĐẾN XUẤT XƯỞNG", lines: ["MỘT CUỘN KIM LOẠI", "ĐI QUA NHỮNG GÌ?"], sizes: [72, 82] },
  material: { eyebrow: "PROCESS 01", lines: ["NGUYÊN LIỆU", "TẠO HÌNH"], sizes: [102, 112] },
  cutting: { eyebrow: "PROCESS 02", lines: ["CẮT"], sizes: [132], status: "THEO NHỊP VẬN HÀNH" },
  machining: { eyebrow: "PROCESS 03", lines: ["GIA CÔNG", "CƠ KHÍ"], sizes: [110, 120] },
  treatment: { eyebrow: "PROCESS 04", lines: ["THẤM NITƠ", "CHÂN KHÔNG"], sizes: [102, 102] },
  dispatch: { eyebrow: "FINAL STEP", lines: ["SẴN SÀNG", "GIAO HÀNG"], sizes: [104, 104], status: "XUẤT XƯỞNG", confirm: true }
};

for (const [name, spec] of Object.entries(cards)) {
  await sharp(Buffer.from(cardSvg(spec))).png().toFile(fileURLToPath(new URL(`${name}.png`, outDir)));
}

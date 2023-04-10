import {
  renderToString,
} from "https://esm.sh/preact-render-to-string@5.2.6?deps=preact@10.13.2";

const d = await import("./index.tsx");
const html = renderToString(
  d.default(),
);
Deno.writeTextFile(`out.html`, html);

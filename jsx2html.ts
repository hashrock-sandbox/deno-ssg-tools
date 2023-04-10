import {
  renderToString,
} from "https://esm.sh/preact-render-to-string@5.2.6?deps=preact@10.13.2";
import { walk } from "https://deno.land/std@0.182.0/fs/mod.ts";

function renameTsxToHtml(path: string) {
  return path.replace(/\.tsx?$/, ".html");
}

async function buildHtml(path: string) {
  const d = await import("./" + path);
  const html = renderToString(
    d.default(),
  );
  const output = renameTsxToHtml(path);
  await Deno.writeTextFile(output, html);
  console.log("Convert", path, " -> ", output);
}
// walk the directory and build all the html files
for await (const entry of walk(".")) {
  // if under "components" directory, skip
  if (entry.path.startsWith("components")) {
    continue;
  }
  if (entry.isFile && entry.name.endsWith(".tsx")) {
    await buildHtml(entry.path);
  }
}

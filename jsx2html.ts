import {
  renderToString,
} from "https://esm.sh/preact-render-to-string@5.2.6?deps=preact@10.13.2";

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
for await (const entry of Deno.readDir("./")) {
  // if under "components" directory, skip
  if (entry.name === "components") {
    continue;
  }
  if (entry.isFile && entry.name.endsWith(".tsx")) {
    await buildHtml(entry.name);
  }
}

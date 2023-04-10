/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "https://esm.sh/preact@10.11.2";
import {
  renderToString,
} from "https://esm.sh/preact-render-to-string@5.2.6?deps=preact@10.11.2";

export default function Page() {
  const css = {
    __html: `
      h1 {
        color: red;
      }
      `,
  };
  return (
    <html>
      <head>
        <title>Deno SSG</title>
      </head>
      <body>
        <style dangerouslySetInnerHTML={css} />
        <h1>Hello World</h1>
      </body>
    </html>
  );
}

const html = renderToString(
  <Page />,
);
Deno.writeTextFile(`index.html`, html);

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

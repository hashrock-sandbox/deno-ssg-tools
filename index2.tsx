export default function Page() {
  const css = {
    __html: `
      h1 {
        color: yellow;
      }
      `,
  };
  return (
    <html>
      <head>
        <title>Hello</title>
      </head>
      <body>
        <style dangerouslySetInnerHTML={css} />
        <h1>Hello World</h1>
      </body>
    </html>
  );
}

import { Header } from "./components/header.tsx";

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
        <title>Hello, World</title>
      </head>
      <body>
        <Header />
        <style dangerouslySetInnerHTML={css} />
        <h1>Hello World</h1>
      </body>
    </html>
  );
}

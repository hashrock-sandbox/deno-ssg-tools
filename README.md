# Asset config generator

# Example

> deno run -A morph.ts --out img.gen.ts --path assets

generates `img.gen.ts` file from `assets` directory.

# Options

> deno run -A assets.ts --out img.gen.ts --includes="jpg" --includes="md.ts"
> --exclude s="thumb"

# JSX to HTML

build all tsx file into html:

> deno run -A jsx2html.ts

with watcher:

> deno run -A --watch jsx2html.ts

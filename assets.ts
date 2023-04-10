import {
  Project,
  SyntaxKind,
} from "https://deno.land/x/ts_morph@18.0.0/mod.ts";
import { walk } from "https://deno.land/std@0.182.0/fs/walk.ts";
import { exists } from "https://deno.land/std@0.182.0/fs/exists.ts";
import { parse } from "https://deno.land/std@0.182.0/flags/mod.ts";

const flags = parse(Deno.args, {
  string: ["out", "path"],
  collect: ["includes", "excludes"],
  alias: {
    out: "o",
    path: "p",
    includes: "i",
    excludes: "e",
  },
});

const out = flags.out || "assets.gen.ts";
const path = flags.path || "./";
const includes = flags.includes as string[] || ["jpg", "png"];
const excludes = flags.excludes as string[] || ["thumb"];

if (!(await exists(out))) {
  Deno.writeTextFileSync(out, "export const assets = [];");
}

const project = new Project();
const sourceFile = project.addSourceFileAtPath(out);
const routesDeclaration = sourceFile.getVariableDeclarationOrThrow("assets");
const arrayLiteralExpression = routesDeclaration.getInitializerIfKindOrThrow(
  SyntaxKind.ArrayLiteralExpression,
);

const objs = arrayLiteralExpression.getChildrenOfKind(
  SyntaxKind.ObjectLiteralExpression,
);

const dataAssets = [];

for (const e of objs) {
  const name = e.getPropertyOrThrow("path");
  const as = name.asKindOrThrow(SyntaxKind.PropertyAssignment);
  const lit = as.getChildrenOfKind(SyntaxKind.StringLiteral);
  dataAssets.push(lit.shift()?.getLiteralText());
}

const dirAssets = [];

for await (const entry of walk(path)) {
  if (
    entry.isFile &&
    includes.some((i: string) => entry.name.match(i)) &&
    !excludes.some((e: string) => entry.name.match(e))
  ) {
    dirAssets.push(entry.path);
  }
}

for (const e of objs) {
  const name = e.getPropertyOrThrow("path");
  const as = name.asKindOrThrow(SyntaxKind.PropertyAssignment);
  const lit = as.getChildrenOfKind(SyntaxKind.StringLiteral);
  const asset = lit.shift()?.getLiteralText();

  if (asset && !dirAssets.includes(asset)) {
    arrayLiteralExpression.removeElement(e);
  }
}

for (const asset of dirAssets) {
  if (!dataAssets.includes(asset)) {
    arrayLiteralExpression.addElement(
      `{path: '${asset}', title: ''}`,
    );
  }
}

await sourceFile.formatText({
  indentSize: 2,
});
await sourceFile.save();

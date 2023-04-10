import {
  createWrappedNode,
  Node,
  Project,
  SyntaxKind,
} from "https://deno.land/x/ts_morph@18.0.0/mod.ts";

const project = new Project();
const sourceFile = project.addSourceFileAtPath("contents/assets.gen.ts");
const routesDeclaration = sourceFile.getVariableDeclarationOrThrow("assets");
const arrayLiteralExpression = routesDeclaration.getInitializerIfKindOrThrow(
  SyntaxKind.ArrayLiteralExpression,
);

const objs = arrayLiteralExpression.getChildrenOfKind(
  SyntaxKind.ObjectLiteralExpression,
);

const assets = [];

for (const [i, e] of objs.entries()) {
  const name = e.getPropertyOrThrow("path");
  const as = name.asKindOrThrow(SyntaxKind.PropertyAssignment);
  const lit = as.getChildrenOfKind(SyntaxKind.StringLiteral);
  assets.push(lit.shift()?.getLiteralText());
}
console.log(assets);

import { walk } from "https://deno.land/std@0.177.0/fs/walk.ts";
for await (const entry of walk(`./`)) {
  if (
    entry.isFile &&
    (entry.name.endsWith(".jpg") || entry.name.endsWith(".png")) &&
    !entry.name.startsWith("thumb") && !entry.name.startsWith("stand")
  ) {
    console.log(entry.path);
    if (!assets.includes(entry.path)) {
      arrayLiteralExpression.addElement(
        `{path: '${entry.path}', title: ''}`,
      );
    }
  }
}

// objs.entries().forEach(([i, e]) => {
//   const name = e.getPropertyOrThrow("path");
//   console.log(
//     i,
//     name.getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getText(),
//   );
// });

// objs.forEach((e) => {
//   const name = e.getPropertyOrThrow("path");

//   // e.getProperties().forEach((p) => {
//   //   console.log(p);
//   //   // console.log(p.getName());
//   //   // console.log(p.getInitializerIfKindOrThrow(SyntaxKind.StringLiteral));
//   // });
//   // console.log(e.getText());
// });

// arrayLiteralExpression.getElements().forEach((e) => {
//   e.
//   console.log(e.getText());
// });

// arrayLiteralExpression.forEachChild((e) => {
//   e.getExpressionIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
//   const a = e.getObjectLiteralExpressionOrThrow();
//   console.log(e.getText());
// });

await sourceFile.save();
// console.log(d);

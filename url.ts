import * as pm from "https://deno.land/std/path/mod.ts";

const local = "file:///Users/hash/code/hashrock/single-tsx-ssg/index2.tsx";
const pp = pm.fromFileUrl(local);
console.log(local, import.meta.url);

const ru = pm.relative(local, import.meta.url);
console.log(ru);

// const path = pm.fromFileUrl(local);
// const url = new URL(path, import.meta.url).pathname;
// console.log(url);

// const url2 = new URL(path, import.meta.url).pathname;
// console.log(url2);

// // calc relative path
// const relativePath = path.replace(url, "");
// console.log(relativePath);

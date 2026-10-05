import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";
import { catalogs, getTranslator, resolveLocale, source } from "../src/i18n/messages.ts";

test("neutral visits use English while saved language preferences take precedence", () => {
  assert.equal(resolveLocale(undefined), "en");
  assert.equal(resolveLocale(""), "en");
  assert.equal(resolveLocale("invalid"), "en");
  assert.equal(resolveLocale("ar"), "ar");
  assert.equal(resolveLocale("en"), "en");
});

test("every message has finished English copy and matching interpolation values", () => {
  assert.deepEqual(Object.keys(catalogs.ar).sort(), Object.keys(catalogs.en).sort());
  const tokens = (text) => text.match(/\{\d+\}/g)?.sort() ?? [];
  for (const [key, text] of Object.entries(catalogs.en)) {
    assert.ok(text.trim(), key);
    assert.ok(!/TODO|lorem ipsum|translation missing|English text here/i.test(text), key);
    if (key !== "navigation.arabic_label") assert.ok(!/[\u0600-\u06ff]/.test(text), key);
    assert.deepEqual(tokens(text), tokens(catalogs.ar[key]), key);
  }
});

test("language changes localize stored service data without changing its source", () => {
  const service = { id: "ceramic", name: source("speedCar.ceramic_window_film"), price: 20 };
  const english = getTranslator("en");
  const arabic = getTranslator("ar");
  assert.equal(english(service.name), "Ceramic window film");
  assert.equal(arabic(service.name), catalogs.ar["speedCar.ceramic_window_film"]);
  assert.equal(service.id, "ceramic");
  assert.equal(service.price, 20);
  assert.equal(service.name, catalogs.ar["speedCar.ceramic_window_film"]);
});

test("request messages localize service names, currency and dynamic values", () => {
  const english = getTranslator("en");
  const name = source("speedCar.ceramic_window_film");
  assert.equal(english("speedCar.service_value", [name]), "Service: Ceramic window film");
  assert.equal(english(source("speedCar.base_coverage_price_value_jod", [20])), "Base coverage price: 20 JOD");
  assert.equal(english("demo.name_value", ["Alex Jordan"]), "Name: Alex Jordan");
  assert.equal(english("A customer's own text"), "A customer's own text");
});

test("UI source contains no unconnected Arabic copy", () => {
  const technicalAlphabets = new Set(["٠١٢٣٤٥٦٧٨٩", "۰۱۲۳۴۵۶۷۸۹"]);
  const problems = [];
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) { scan(file); continue; }
      if (!/\.tsx?$/.test(file)) continue;
      const tree = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith("tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
      function visit(node) {
        if ((ts.isStringLiteral(node) || ts.isJsxText(node) || ts.isNoSubstitutionTemplateLiteral(node)) && /[\u0600-\u06ff]/.test(node.text) && !technicalAlphabets.has(node.text)) problems.push(`${file}: ${node.text}`);
        ts.forEachChild(node, visit);
      }
      visit(tree);
    }
  }
  scan(new URL("../src", import.meta.url).pathname);
  assert.deepEqual(problems, []);
});

// Design-system checker: refuses code that breaks the rules in DESIGN-RULES.md.
// Runs before every build (npm run build), so a breaking change never deploys.
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const src = join(root, 'src')
const tokensDir = join(src, 'styles', 'tokens')

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  )

const semantic = readFileSync(join(tokensDir, 'semantic.css'), 'utf8')
const definedTokens = new Set([...semantic.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]))

const files = walk(src).filter((f) => /\.(vue|css|js)$/.test(f) && !f.startsWith(tokensDir))
const errors = []
const report = (file, line, rule, msg) => errors.push(`${relative(root, file)}:${line}  [${rule}] ${msg}`)

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const lines = text.split('\n')
  const name = file.split(/[\\/]/).pop()

  // R1 — component names are camelCase, identical in Figma and Vue (Minos: buttonMain, cardProductBox).
  if (file.includes(`${'components'}`) && name.endsWith('.vue') && !/^[a-z][a-zA-Z0-9]*\.vue$/.test(name)) {
    report(file, 1, 'R1 naming', `component file must be camelCase (got ${name})`)
  }

  lines.forEach((l, i) => {
    const n = i + 1
    if (/^\s*(\/\/|\*|\/\*)/.test(l)) return // comments

    // R2 — no raw colours outside the token files.
    if (/(^|[\s:"'(,])#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/.test(l)) report(file, n, 'R2 raw colour', l.trim())

    // R3 — components read semantic tokens only, never primitives.
    if (/var\(--primitive-/.test(l)) report(file, n, 'R3 primitive', l.trim())

    // R4 — every token used must exist in semantic.css (catches typos and stale names).
    for (const m of l.matchAll(/var\((--[a-z0-9-]+)/g)) {
      if (!definedTokens.has(m[1])) report(file, n, 'R4 unknown token', m[1])
    }

    // R5 — 12px is the smallest text size.
    const fs = l.match(/font-size:\s*(\d+(?:\.\d+)?)px/)
    if (fs && Number(fs[1]) < 12) report(file, n, 'R5 text < 12px', l.trim())
  })

  // R6 — a single primary button per context (per component file).
  if (name.endsWith('.vue')) {
    const primaries = [...text.matchAll(/<buttonMain(?![^>]*variant="secondary")[^>]*>/g)]
    if (primaries.length > 1) report(file, 1, 'R6 primary', `${primaries.length} primary buttons in one context`)
  }
}

if (errors.length) {
  console.error(`\n✗ Design-system check failed (${errors.length}):\n  ${errors.join('\n  ')}\n`)
  process.exit(1)
}
console.log(`✓ Design-system check passed (${files.length} files, ${definedTokens.size} semantic tokens)`)

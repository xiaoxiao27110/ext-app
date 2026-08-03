# Domain docs

How engineering skills should consume this repository's domain documentation.

## Before exploring

- Read `CONTEXT.md` at the repository root when it exists.
- Read ADRs under `docs/adr/` that affect the area being changed.
- If these files do not exist, proceed silently. `/domain-modeling` creates them lazily when terminology or a durable decision is resolved.

## Layout

This is a single-context repository:

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── src/
```

`CONTEXT.md` is a glossary, not a specification or implementation notebook. ADRs record only decisions that are hard to reverse, surprising without context, and the result of a real trade-off.

## Consumer rules

- Use the glossary's canonical terms in issues, tests, and implementation.
- Do not introduce synonyms for terms the glossary defines.
- Surface conflicts with existing ADRs instead of silently overriding them.

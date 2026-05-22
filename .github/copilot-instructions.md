# Project-Wide Agent Instructions — Hide Haven

## 🚨 MANDATORY: Context Manager Invocation

After **every** task that creates, modifies, or deletes any file, you **MUST** invoke the **Context Manager** agent as your **final step** before reporting completion.

The Context Manager is defined at the user level as `context-manager`. To invoke it:

> Run subagent "Context Manager" to document changes in `instructions.md`.

### Why this is critical
- `instructions.md` is the project's living documentation — it tracks every file, its purpose, and how it connects to other files.
- If the Context Manager is skipped, the context chain breaks. Future agents will work with outdated or incomplete information.
- A single missed change can cause cascading failures across the entire project.

### When to invoke
- After creating new files
- After modifying existing files
- After deleting files
- After updating configuration (`.env`, `package.json`, `tsconfig.json`, etc.)
- After changing dependencies
- After updating the database schema
- After changing any architecture or data flow

### When NOT to invoke
- You are only reading files (no changes made)
- You are only having a conversation with no file modifications
- The Context Manager itself is running (no recursive invocation)

## General Guidelines
- Always read `instructions.md` at the start of a session to understand the full project context.
- Always read the **Change Log** at the bottom of `instructions.md` to see the most recent changes.
- Keep changes focused and well-documented.

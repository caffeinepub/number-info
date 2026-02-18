# Specification

## Summary
**Goal:** Add a dark, terminal/hacker-inspired theme with a persistent theme toggle, plus a persistent on-page history of searched numbers for quick re-search.

**Planned changes:**
- Apply a consistent dark, terminal-style visual treatment across the UI (backgrounds, surfaces, inputs, buttons, headers/footers, and results), including monospace typography for key areas and a terminal-like result/JSON panel; keep all user-facing text in English.
- Add a Dark/Light theme toggle that switches via a global dark-mode class and persists the selected theme in local storage (default to Dark when no preference exists).
- Add an on-page search history list for previously submitted numbers that supports click-to-rerun search (using the existing React Query flow), persists locally, caps length, deduplicates by moving re-searched numbers to the top, and includes a clear-history action.

**User-visible outcome:** Users can switch between Dark and Light themes (with their choice remembered), see results presented in a terminal-like style, and use a persistent history list to quickly re-run past number lookups or clear the history.

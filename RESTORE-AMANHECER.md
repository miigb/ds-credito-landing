# Restoring the Amanhecer 2026 design

The live site is **temporarily** on the previous (slate-blue / rose, Inter) design
because of a legal branding hold. The **Amanhecer 2026** redesign (warm amber/ember-gold
+ warm paper, Montserrat) is parked, intact, and ready to bring back.

## Parked references

- **Tag:** `amanhecer-2026-live` — the exact state that was live before the rollback.
- **Branch:** `redesign/amanhecer-2026` — the working line for the design.
- **Rollback commit:** `731e3f5` ("Temporarily roll back to pre-Amanhecer design").

## To restore Amanhecer (one round-trip)

```bash
git switch main
git revert --no-commit 731e3f5
git commit -m "Restore Amanhecer 2026 design"
npm install          # re-adds @paper-design/shaders-react, hls.js, lenis
npm run build        # sanity check
git push             # Vercel auto-deploys
```

This re-applies the **entire** rebrand including every post-launch refinement
(wizard pill styling, design-system docs) — nothing was lost.

Equivalent alternative (snapshot-based):

```bash
git checkout amanhecer-2026-live -- .
git commit -m "Restore Amanhecer 2026 design"
npm install
```

## Verify after restoring

- `git diff --stat amanhecer-2026-live` is empty (tree matches the parked live state).
- `src/app/globals.css` shows `--color-accent-700: #F39200` (ember) and Montserrat in `layout.tsx`.

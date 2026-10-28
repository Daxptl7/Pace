# Phase 1 validation

Verified locally on 28 October 2026 using Node 22.20.0, npm 10.9.3, macOS, and headless Google Chrome.

## Code checks

| Check                                       | Result                                               |
| ------------------------------------------- | ---------------------------------------------------- |
| `npm run typecheck`                         | Passed; strict frontend and Vite configuration types |
| `npm run lint`                              | Passed; zero errors or warnings                      |
| `npm test`                                  | Passed; 9 tests across 3 files                       |
| `npm run build`                             | Passed; Vite 8.3.5 production build                  |
| `npm run format:check`                      | Passed                                               |
| Dependency audit during clean `npm install` | Zero reported vulnerabilities                        |

The initial upgrade left two different Vite versions in npm's installed tree. A fresh installation and a root Vite override aligned the build, React plugin, Tailwind plugin, and Vitest on Vite 8.3.5. `npm ls vite` confirmed one shared version without invalid peers. No force-install or legacy-peer-dependency flags are required.

## Browser verification

The development browser run passed **51 directly loaded routes**, **8 viewport widths**, **6 accessibility scans**, and **9 interaction groups**, with **zero browser console or page errors**. The checked route list and results are preserved in [browser-report.json](./docs/validation/browser-report.json).

Widths: **320, 375, 767, 768, 1023, 1024, 1440, and 1920px**. No document horizontal overflow was found at any width or on any checked route. Desktop, tablet, and mobile screenshots were also visually inspected.

Verified behavior:

- All five desktop mega menus open on hover, remain available over their links, and close when leaving the header.
- Keyboard Arrow Down opens a menu and focuses its first link; Escape closes it and restores the disclosure button. The pointer can remain outside the header during keyboard use.
- Selecting a desktop menu link navigates and closes the menu.
- Search submissions encode queries in the URL and display the submitted query on the intentional search placeholder.
- The mobile drawer opens and expands nested categories; focus remains within the native modal dialog, body scrolling is locked, and Escape restores the initiating button and scrolling.
- Selecting a mobile nested link navigates, closes the drawer, and releases the scroll lock.
- The mobile search modal submits and closes correctly.
- Every sampled navigation/footer route renders one heading and the shared layout; unknown paths render the intentional 404.
- The page accepts the reduced-motion media preference; Motion and CSS both configure reduced motion.

The six axe-core scans used WCAG 2 A/AA and WCAG 2.1 AA rules on the desktop mega menu, mobile root, desktop root, expanded mobile drawer, mobile search modal, and 404. **Zero violations** were reported in these scans. This is automated coverage of the tested states, not a claim of full accessibility certification.

Browser checks exposed and resolved two interaction bugs before the final passing run: a newly mounted backdrop dismissed keyboard-opened menus under a stationary pointer, and clearing desktop hover on header blur dismissed the mobile dialog. The latter also has a permanent store regression test.

## Production preview

`npm run preview -- --port 4180 --strictPort` successfully served the production build. Chrome verified assets and direct loading of `/`, `/shoes`, `/sports/running`, and an unknown route, plus the mobile drawer and a production desktop accessibility scan. No browser errors or accessibility violations were reported. See [production-report.json](./docs/validation/production-report.json).

## Verification boundaries

- Browser QA used an existing local Playwright/axe installation through a temporary harness; a permanent Playwright framework was not added to this Phase 1 project. The temporary harness is `/private/tmp/pace-phase1-browser.cjs`, and screenshots are in `/private/tmp/pace-phase1-qa/` on this machine.
- Chrome initially could not launch inside the sandbox, and a temporary low-disk condition also interrupted a launch. Validation was rerun successfully after removing this task's generated dependency backup and using the permitted headless browser. Interrupted runs are not counted as passes.
- Firefox, Safari/WebKit, real touch devices, and a screen-reader session were not tested.
- Unmounted product primitives and optional announcement-carousel states were checked by TypeScript/lint rather than exercised in a catalog UI. No catalog/homepage was introduced to test them.
- No backend, authentication, checkout, payment provider, deployment, or remote Git publication was performed. Production hosting still needs the SPA rewrite documented in the README.

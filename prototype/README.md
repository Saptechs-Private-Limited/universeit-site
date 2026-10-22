# Mobile app prototype

Open `index.html` with its sibling files, or serve this directory with any static
web server. No install, app build, account or backend is required. All records
are demonstration fixtures; do not enter real credentials.

The 22 October 2026 sync reads the app's `src/navigation`, `src/screens`,
`src/theme/layout.ts`, `src/theme/colors.ts` and current mobile branding assets.
`index.html` retains the earlier persona screens; `latest.js` supplies the current
screen behavior and fixtures, and `latest.css` the current responsive layouts.

- Phone viewports use the raised profile tab. Swipe vertically or tap the
  header avatar to select any of three linked students, in Student or Parent mode.
- iPad viewports use the app's 88-point side rail at widths of 600 or more;
  expanded dashboards use columns from 840 points. Profile lists remain scrollable.
- The mixed login includes Ravi Kumar's Teacher workspace, session dates and
  end-time restrictions, approvals, staff conversations and clinic empty state.
  Teacher Home and Academics follow the current dashboard/grid structure,
  including mentee notes and sample quiz attempts/results.
- Alerts belong to named student/staff profiles; filters and read state agree.
- Calendar has month/week/day grids, empty dates and bottom Close controls.
  Class diary's calendar highlights dates containing summaries.
- Fees show due items, payment availability, receipt details and a downloadable
  PDF explicitly marked SAMPLE. The QR encodes a prototype-only warning and is
  not a campus credential. No payment or message is sent.
- Next-year confirmation appears only when its school-request control is on.
- UniverseIT and XYZ artwork can be previewed in the startup screen. Only the
  corrected profile hint is translated here; other sample screens remain English,
  as the language screen explains. The native app uses its full locale catalog.

Run `node test/ui/mobile-prototype.test.js` from the UniverseIt repository for
browser interaction, viewport, download and script-error checks.

Run `python docs/site/build-standalone.py` to include this directory under
`docs/site/dist/prototype/`. Copy the complete `dist/` output to the
`UniverseIt-site` repository; do not edit the deployed prototype separately.

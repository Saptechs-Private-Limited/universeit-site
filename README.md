# UniverseIT — product site

One self-contained HTML page. No build step, no dependencies to install, no
backend. `index.html` **is** the site.

Served by GitHub Pages from the default branch, root folder.

## Editing

The page is generated from the source in the private `UniverseIt` repository,
at `docs/site/`:

- `docs/site/index.html` — the page
- `docs/site/build-standalone.py` — wraps it in a full HTML document
  (charset, viewport, title, description, Open Graph, favicon)
- `docs/site/dist/index.html` — the output, copied here

After editing the source, run `python3 build-standalone.py` and copy
`dist/index.html` over this repository's `index.html`.

## What is in the page

The module catalogue, the timetable and academic calendar drawn against a time
ruler, the enrolment flow, the identity model, the rollout sequence, and the
mobile prototype — embedded as an inert payload that opens in a dialog, so the
page makes no request for it.

The only outbound requests are to Google Fonts.

## The demo form

`ENQUIRY_ENDPOINT` near the end of the page is `null`, so the enquiry form
composes the request and hands it to the visitor's mail app addressed to
`just.universe.it@saptechs.co.in`. Point that constant at a service and the
form POSTs there instead.

## Custom domain

Add a `CNAME` file containing the hostname, then point the DNS record at
`saptechs-private-limited.github.io`.

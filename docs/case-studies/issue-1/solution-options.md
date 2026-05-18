# Solution Options

## Option 1: Static HTML/CSS Resume

Create a static page with editable personal variables, responsive screen layout, and dedicated print CSS.

Pros:

- Simple to open locally.
- No build step or runtime dependency.
- Easy to print to PDF from a browser.
- Fits the current repository size.

Cons:

- Personal variables require a small JavaScript layer unless generated before publishing.

## Option 2: JSON Resume Theme

Use the JSON Resume ecosystem and customize a theme.

Pros:

- Structured resume data.
- Existing export workflows.

Cons:

- Adds Node tooling and theme constraints.
- Less direct control over the portfolio/case-study presentation.

## Option 3: React/Vite Resume App

Build an interactive app with components and data files.

Pros:

- More scalable for future portfolio expansion.
- Strong component reuse.

Cons:

- Unnecessary dependency and build complexity for this issue.
- More moving parts for print/PDF reliability.

## Chosen Approach

Option 1 is the most appropriate for this repository. The implementation adds:

- `index.html` for the resume.
- `assets/css/resume.css` for screen and print styles.
- `assets/js/profile.js` for manually editable personal variables.


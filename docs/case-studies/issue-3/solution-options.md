# Solution Options

## Option 1: Inline Task and Work Text in Static HTML

Add readable task and solution blocks inside each existing case card.

Pros:

- No build step.
- Works from a local file.
- Keeps portfolio content visible to reviewers and print/PDF export.
- Matches the current static implementation.

Cons:

- Updating source case files does not automatically update the resume.

## Option 2: Fetch Markdown Files in the Browser

Load `cases/*/task.md` and `work.md` dynamically with JavaScript.

Pros:

- Source files remain canonical.
- Less duplicated content in `index.html`.

Cons:

- Browser `fetch` is unreliable from `file://`.
- Requires Markdown parsing or manual formatting.
- Adds unnecessary runtime complexity for a static resume.

## Option 3: Add a Static Site Build Step

Generate case cards from Markdown during a build.

Pros:

- Source files stay canonical.
- Scales well for many future cases.

Cons:

- Adds tooling to a repository that currently has none.
- Overkill for three case studies.

## Chosen Approach

Option 1 is the best fit for this issue. It makes the portfolio self-contained and readable with the current design constraints.

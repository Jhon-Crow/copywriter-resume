# Issue 3 Case Study Research

## Request

Update the cases block so the portfolio shows the actual task and solution from the repository before the short description. Keep the result inside the existing design and make it comfortable to read.

## Repository Evidence

The source materials are stored in:

- `cases/case 1/task.md` and `cases/case 1/work.md`
- `cases/case 2/task.md` and `cases/case 2/work.md`
- `cases/case 3/task.md` and `cases/case 3/work.md`

The current `index.html` only contains short case summaries. That makes the portfolio look strategic, but it hides the actual copywriting samples and the original client briefs.

## Online Research Summary

Portfolio and case-study guidance consistently recommends showing enough context for the reader to evaluate the work: client or audience, assignment, constraints, the produced work, and a short explanation of decisions. For a copywriter resume, the original brief plus the written sample are especially important because they let a hiring manager compare the input with the output.

Relevant patterns:

- Keep the full brief and sample visually distinct from the analysis.
- Use compact headings so the reader can scan task, solution, and commentary.
- Avoid inventing metrics when results are unavailable; use a result-potential or intended effect instead.
- Preserve print behavior with `break-inside: avoid` and readable line lengths.

Sources checked:

- Nielsen Norman Group case-study structure guidance: https://www.nngroup.com/articles/case-study-structure/
- Copyfolio copywriting portfolio case study guidance: https://www.copyfol.io/blog/copywriting-portfolio-examples
- MDN `white-space` reference for preserving authored text line breaks in HTML: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space

## Implementation Direction

Because this repository is a static resume, the most maintainable solution is to keep the content directly in `index.html` and style it with existing CSS. Each case should include:

- title and tag,
- source task summary,
- work sample excerpt or full short post,
- existing concise analysis.

The source texts are long, so the design should use a two-column task/work layout on desktop and a single column on mobile. This keeps the original writing visible without turning each card into a dense wall of text.

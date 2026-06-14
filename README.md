# Rhett Rautsaw Website

This repository contains the source files for Rhett Rautsaw's personal academic and professional website, built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

The site includes pages for research, publications, scientific communication and outreach, software/apps, tutorials, collaborators and mentees, and a PDF CV. Content lives primarily in `docs/`, with site configuration in `mkdocs.yml` and dependency management handled by `pixi`.

## Repository Structure

- `mkdocs.yml`: MkDocs navigation, theme, plugin, CSS, and JavaScript configuration.
- `docs/`: source Markdown, images, PDFs, videos, custom CSS, and JavaScript used by the website.
- `site/`: generated MkDocs build output.
- `pixi.toml` / `pixi.lock`: reproducible local development environment.

## Local Development

Install dependencies:

```bash
pixi install
```

Preview locally:

```bash
pixi run mkdocs serve
```

Build the static site:

```bash
pixi run mkdocs build
```

<details>
<summary>Original setup notes</summary>

```bash
pixi init Website
✔ Created /Users/rhettrautsaw/Desktop/Website/pixi.toml
cd Website
pixi add mkdocs-material
✔ Added mkdocs-material >=9.6.18,<10
pixi run mkdocs new .
INFO    -  Writing config file: ./mkdocs.yml
INFO    -  Writing initial docs: ./docs/index.md
pixi run mkdocs serve


pixi add --pypi neoteroi-mkdocs
#pixi add --pypi mkdocs-glightbox
pixi add --pypi mkdocs-table-reader-plugin
```

</details>

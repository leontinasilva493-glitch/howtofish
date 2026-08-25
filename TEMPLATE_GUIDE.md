# Wiki Template Guide

## Content model

Keep page data separate from layout components. Add a category only when it has a real page and a distinct player question to answer.

Recommended content families:

- guides and walkthroughs
- entities and threats
- maps and locations
- items and weapons
- codes and promotions
- updates and events
- community and official channels
- tools and calculators
- local trackers and checklists

Every guide must provide a useful `quickAnswer`, at least two navigable sections, one traceable source, and related fast routes. Community tactics and unresolved behavior belong in `communityNote`, not in confirmed fact fields.

## Homepage modules

`homeSectionOrder` controls section order. `resolveHomeSections` removes modules with no publishable data, so a new game does not ship empty Codes, media, tracker, or database sections merely because the template supports them.

## Visual presets

Set `siteConfig.visualPreset` to `tactical-dark` or `editorial-light`. Both presets share semantic color variables, 44px interaction targets, visible keyboard focus, reduced-motion behavior, and mobile layouts. Add a new preset by overriding semantic tokens rather than editing page components.

## Page rules

Every public page should have a unique title, description, canonical path, update or evidence state, and links to related pages. Unknown guide slugs must return a real 404. Do not publish empty category pages or copy the same article into multiple slugs.

## Adding a new game

1. Replace the site configuration and verified external links.
2. Replace the data collections and page copy.
3. Replace the wiki image assets and manifest icons.
4. Check every navigation link and generated sitemap URL.
5. Run type checking, lint, build, and a mobile-width browser check.

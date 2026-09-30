<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Single-page site: all landing sections (hero, about, cakes, collections, wedding, custom-order form, gallery, testimonials, contact, footer) are anchor sections inside src/routes/index.tsx; smooth-scroll navbar links to #anchors. Do not create sibling routes for these sections — the client explicitly requires ONE page.

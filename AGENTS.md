<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project architecture
- Keep the five content pages on TanStack file routes; /system permanently redirects to /about to preserve existing links.
- Centralize page metadata, business schema, campaign values, and budget validation in the browser-safe agency module to keep pages and tests consistent.
- Application submissions are validated by the shared applications schema and inserted by a server function with the publishable client under an anon insert-only policy; show "received" only after the insert succeeds.
- Keep analyzer scoring, hidden-revenue math, bottleneck→service and fault→solution mappings as pure functions in the growth-system module so the analyzer, the Solution Architecture terminal and tests share one source.
- Theme is class-based (.dark on <html>) set by an inline head script from localStorage, with icons and logo variants switched via dark: classes, so SSR markup stays identical without a theme library.
- The Calendly embed renders only when the agency module's calendly URL passes the https calendly.com check; otherwise a placeholder shows.

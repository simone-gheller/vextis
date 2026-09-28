# Beta Docs Review: Introduction, Quickstart, and Core Concepts

Review basis: `docs/DOCUMENTATION_PLAN.md`, `docs/BETA_DOCS_SCOPE.md`, and the implementation at commit `e929c4c`.

## Assumptions made

- The requested **Introduction** is the first beta page called **Overview** in `BETA_DOCS_SCOPE.md`. It keeps the existing `/docs` route but uses “Introduction” as the page and navigation title.
- The public beta boundary is the dashboard plus local CLI workflow, as recommended by `BETA_DOCS_SCOPE.md`. The Introduction does not present the raw API, Node SDK, live updates, SSO, or billing automation as supported beta surfaces.
- **App** is the public name for the core configuration namespace. Current `project` identifiers are treated as implementation or legacy terminology.
- The Quickstart assumes a beta user already has a verified `vextis` CLI binary. No public installer command is shown because the checked-in installer still downloads releases from `simone-gheller/mull`.
- The Quickstart uses an unprotected `development` environment. The documented `vextis run` path was verified against the CLI and hidden `/v1/config` implementation for that context.
- Existing dashboard screenshots were not embedded because they show `test-org`, `test-app`, and empty resource states rather than the required Acme example. Publishing inaccurate captures would contradict the beta scope.
- Existing documentation pages outside these three were intentionally left unchanged.

## Unclear product behavior

- The supported public beta surfaces are still a product decision. The scope recommends dashboard plus local CLI, while API and SDK code exists.
- Protected-environment authorization is inconsistent between the org-scoped config route and `/v1/config`, which is used by `vextis run`. The org-scoped route checks reveal permission with environment conditions; `/v1/config` currently checks only `config:read`.
- Reveal auditing is inconsistent. The org-scoped config fetch emits an audit event, while resolved-parameter reads and `/v1/config` do not appear to provide the same reveal audit behavior.
- An empty string currently clears the local value (`isSet=false`) and allows ancestor fallback. It is unclear whether intentionally storing an empty string will remain unsupported.
- The create-app dialog displays a Description field, but `Projects.jsx` does not send it and the `App` schema has no description field.
- The public CLI distribution contract is unresolved. The installer supports macOS and Linux on x64 and arm64, while the build also produces Windows artifacts.

## Terminology inconsistencies

- The schema, backend routes, primary dashboard navigation, and new pages use **app**. Some dashboard copy still says **project** (`Projects`, `recent projects`, and `+ new project`).
- The CLI presents `app` flags and commands, but `.vextis/config.json` stores the selected app under `project`, and `/v1/config` accepts a `project` query parameter.
- The scope calls the first page **Overview**; the current request calls it **Introduction**. The implementation uses Introduction at the existing `/docs` route.
- Environment tiers are stored and sent as uppercase enum values such as `DEVELOPMENT`, while the dashboard displays lowercase labels such as `development`.

## Documentation claims that deserve manual verification

- A production signup sends a six-digit email code and the code completes the account flow for a new Acme organization.
- Google sign-in completes the same initial organization setup expected by the dashboard.
- `vextis auth login` opens the intended production dashboard URL, authorizes the selected organization, and stores a usable 90-day CLI session.
- The exact Quickstart sequence succeeds against the deployed beta: link `api/development`, set `DATABASE_URL`, and print `postgres://localhost:5432/app` from the child Node.js process.
- The deployed service uses the schema and envelope-encryption code reviewed here, so the “encrypted at rest” claim matches production operations and key management.
- The public docs deployment serves `/docs/core-concepts` directly on refresh and preserves the added legacy redirect.

## Suggested screenshots or diagrams

- **Introduction:** recapture `dashboard-overview.png` with organization `Acme`, apps and environments populated, and at least three parameters. Do not use the current zero-value API-call card as evidence of live usage.
- **Quickstart signup:** capture display name `Ada Lovelace`, email `ada@example.invalid`, and organization `Acme`, with no password visible.
- **Quickstart verification:** capture the six-digit verification step with the code field empty.
- **Quickstart app:** capture the new-app dialog with name `api` and parent `None` after the non-persisted Description field is fixed or removed.
- **Quickstart environment:** capture `development`, tier `development`, with the protected toggle off.
- **Quickstart parameter:** capture `DATABASE_URL`, description `Local database connection string`, and an empty default value.
- **Core concepts:** keep the small in-page `Acme → platform → api` conceptual diagram. It is clearer than a product screenshot for organization-wide environments and app inheritance.

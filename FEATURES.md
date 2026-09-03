# Features

Code-derived inventory of what this repo implements. Bullets and key file paths —
the mechanism lives in `docs/how-it-works.md`, the walkthrough in `docs/demo-script.md`.

_Last generated: 2026-09-02 by feature-doc._

A commercetools Connect connector (`connect.yaml`) that synchronizes a single
commercetools project with a single TikTok Shop, built from scratch (not a fork of
any starter). It deploys as four Connect applications — `event`, `service`,
`mc-app` (Merchant Center custom application), and `refresh-token-job` — plus a
Terraform module for provisioning commercetools custom types, and depends on an
externally-deployed **router-service** that proxies all TikTok API calls and
handles multi-tenant OAuth.

## Merchant Center Configuration Wizard (mc-app)

- Store/channel setup wizard: picks a commercetools Store carrying the
  `tiktok-store-type` custom type, sets `isTikTokShop: true` on it, and
  auto-flags its distribution channel (`isTikTokPrice: true`) and supply channel
  (`isTikTokWarehouse: true`, same channel if store uses one for both)
  (`mc-app/src/components/config-wizard/store-config-wizard.tsx`)
- Warehouse ID entry for the TikTok distribution channel
  (`mc-app/src/components/config-wizard/warehouse-config-wizard.tsx`)
- TikTok authorization flow: creates a temporary, scoped commercetools API
  client from the app, accepts a pasted TikTok authorization token, and posts
  both to the service app's `/service/connect-project` to complete the
  token exchange via router-service (`mc-app/src/components/config-wizard/connect-project.tsx`,
  `mc-app/src/hooks/use-create-api-client`)
- Product synchronization dashboard listing importable vs. unimportable products
  (with per-product validation error, e.g. "Missing required attribute: brand"),
  driven by `/service/full-product-check`
  (`mc-app/src/components/product-syncronization/ProductSynchronization.tsx`,
  `ImportableProductsTable.tsx`, `UnimportableProductsTable.tsx`)
- Attribute mapping UI: create/list/edit mappers that translate commercetools
  product attributes to TikTok category attributes, backed by GraphQL fetch/update
  operations against commercetools (`mc-app/src/components/mappers/*`,
  `mc-app/src/hooks/use-product-mappers/*.ctp.graphql`)
- TikTok category and category-attribute lookups surfaced for the mapping UI
  (`mc-app/src/hooks/use-tiktok-categories`, `mc-app/src/hooks/use-tiktok-attributes`)
- Welcome/entry-point screens for the custom application shell
  (`mc-app/src/components/welcome`, `mc-app/src/components/entry-point`)

## Event-Driven Product Sync (event app)

- Subscribes to commercetools Pub/Sub (GCP) or Service Bus (Azure) messages for
  product lifecycle (`ProductCreated`, `ProductPublished`, `ProductUnpublished`,
  `ProductDeleted`), inventory (`InventoryEntryCreated`, `InventoryEntryQuantitySet`,
  `InventoryEntryDeleted`), and product tailoring (`ProductTailoringCreated`,
  `ProductTailoringPublished`, `ProductTailoringUnpublished`,
  `ProductTailoringDeleted`) (`event/src/routes/event.route.ts`,
  `event/src/controllers/event.controller.ts`)
- Per-domain message routers dispatch to created/state-change handlers for
  products, inventory, and product tailoring
  (`event/src/controllers/product/product-message.router.ts`,
  `event/src/controllers/inventory/inventory-message.router.ts`,
  `event/src/controllers/product-tailoring/product-tailoring-message.router.ts`)
- On a qualifying change, resolves product detail, inventory (from the configured
  supply channel), price (from the configured distribution channel), and
  store-specific product tailoring, maps the result to a TikTok product draft, and
  posts it to the router-service under JWT auth
  (`event/src/controllers/product/product-created.controller.ts`,
  `event/src/controllers/product/product-state.controller.ts`,
  `event/src/shared/mappers`)
- Post-deploy hook creates the commercetools subscription for the configured
  Pub/Sub topic/Service Bus and announces it to router-service so TikTok webhooks
  get routed to this project; pre-undeploy hook tears the subscription down
  (`event/src/connector`)

## TikTok Order Sync (service app webhook)

- `/service/webhook` receives TikTok order webhooks, validates the payload's
  `shop_id` against `TIKTOK_SHOP_ID` to prevent cross-tenant delivery, and
  dispatches Type-1 order-status-change or Type-2 reverse (return/cancellation)
  events (`service/src/controllers/webhook.controller.ts`)
- Order status mapping into commercetools order state/payment state/shipment
  state: `UNPAID` creates the commercetools order (via order import) and registers
  an external order reference back to TikTok; `ON_HOLD` creates a Paid payment on
  the order; `AWAITING_SHIPMENT`/`AWAITING_COLLECTION` → shipment state Pending;
  `IN_TRANSIT` → Shipped; `DELIVERED` → Delivered; `COMPLETED` → order state
  Completed; `CANCEL` → order state Cancelled
  (`service/src/controllers/tiktok.order.controller.ts`)
- Reverse (return/cancellation) webhook is received and logged, not yet acted on
  — stubbed (`reverseStatusUpdate` in `tiktok.order.controller.ts`)

## Product Sync HTTP Endpoints (service app)

- `GET /service/full-product-sync`: iterates every product in the store's scope,
  maps each to a TikTok product draft (including flattened variant images), and
  creates it in TikTok Shop via router-service
  (`service/src/controllers/product-sync.controller.ts`)
- `POST /service/selective-product-sync`: same mapping/create flow scoped to a
  `productIds` list in the request body
  (`service/src/controllers/product-sync.controller.ts`)
- `GET /service/full-product-check`: dry-run validates every product against the
  TikTok mapping rules and returns `importableProducts` / `unimportableProducts`
  (with per-product error message) without syncing
  (`service/src/controllers/product-sync.controller.ts`)
- `GET /service/shop-config-sync`: refreshes the stored TikTok shop configuration
  (warehouses, region, locale) (`service/src/controllers/shop-config-sync.controller.ts`)
- `GET /service/connect-project`: completes the TikTok authorization handshake —
  exchanges the pasted auth token via router-service, verifies the commercetools
  connection with the temporary API client, and stores TikTok access/refresh
  tokens, JWT token, and shop configuration in commercetools Custom Objects
  (`service/src/controllers/tiktok.auth.controller.ts`)
- `GET /service/authorization-link`: returns the TikTok authorization URL
  (`service/src/routes/service.route.ts`, `service/src/shared/router-service`)
- TikTok category/category-rules/category-attributes lookups proxied through the
  service for the mc-app mapping UI
  (`service/src/routes/tiktok.route.ts`, `service/src/controllers/tiktok.category.controller.ts`)
- Feature-flagged test routes under `/service/tiktok/*` for exercising TikTok API
  calls directly, gated by `FEATURE_FLAG_ENABLE_TEST_TIKTOK_ROUTES`
- Post-deploy hook stores the service application's own endpoint URL in
  commercetools Custom Objects so mc-app can discover it
  (`service/src/connector`)

## Scheduled Token Refresh (refresh-token-job)

- Runs on a Connect job schedule (`connect.yaml`: `0 */12 * * *`, every 12 hours)
- Checks whether the stored TikTok access token is near expiry and, if so, calls
  router-service's refresh-access-token flow and persists the new token to
  Custom Objects
- Independently checks and refreshes the JWT used for router-service
  authentication, tolerating a failed JWT refresh without failing the whole job
  (`refresh-token-job/src/controllers/job.controller.ts`)

## commercetools Data Model (Terraform)

- `tiktok-channel-type` custom type on Channel: `isTikTokWarehouse`,
  `isTikTokPrice`, `warehouseId`, `warehouseEntityId`
  (`service/terraform`)
- `tiktok-store-type` custom type on Store: `isTikTokShop`
- Provisions a default `tiktok-channel` (with both `ProductDistribution` and
  `InventorySupply` roles) and a default `tiktok-store` linked to it
- TikTok tokens, JWT, and shop configuration are persisted as commercetools
  Custom Objects rather than environment variables or a separate database
  (`*/src/shared/commercetools-storage`)

## Integrations and Architecture

- commercetools APIs used: Products, Inventory, Product Tailoring, Channels,
  Stores, Orders (order import), Payments, Custom Objects, Pub/Sub or Azure
  Service Bus subscriptions
- All TikTok Shop API traffic — auth, categories, products, orders, webhook
  registration — is proxied through an external, separately-deployed
  router-service, which also issues short-lived JWTs for service-to-router calls
  and provides multi-tenant isolation across commercetools projects
  (`*/src/shared/router-service`)
- Supports GCP (Google Cloud Pub/Sub) and Azure (Service Bus) as the event
  transport, selected by environment configuration

## Known Limitations (stated in code/README, not fixed)

- Single TikTok Shop per commercetools project only
- Order fulfillment sync is one-directional (TikTok → commercetools); no
  automatic handling of TikTok product returns
- Reverse/return webhook events are logged only, no commercetools-side action
- Some TikTok product attributes require manual mapping via the mc-app mapper UI
  rather than being auto-mapped

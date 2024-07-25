# Progressive Web App Example

This example uses [`next-pwa`](https://github.com/shadowwalker/next-pwa) to create a progressive web app (PWA) powered by [Workbox](https://developers.google.com/web/tools/workbox/).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app&project-name=progressive-web-app&repository-name=progressive-web-app)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example progressive-web-app progressive-web-app
# or
yarn create next-app --example progressive-web-app progressive-web-app
# or
pnpm create next-app --example progressive-web-app progressive-web-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).


## Media Queries

```css
// Dispositivos extra small (telefones em modo retrato, com menos de 576px)
// Sem media query para `xs`, já que este é o padrão, no Bootstrap.

// Dispositivos small (telefones em modo paisagem, com 576px ou mais)
@media (min-width: 576px) { ... }

// Dispositivos médios (tablets com 768px ou mais)
@media (min-width: 768px) { ... }

// Dispositivos large (desktops com 992px ou mais)
@media (min-width: 992px) { ... }

// Dispositivos extra large (desktops grandes com 1200px ou mais)
@media (min-width: 1200px) { ... }
```
# `@lss/ui-web`

Web UI kit package (React + Tailwind CSS v4) based on the Catalyst components.

## Install

Dependencies used by Catalyst components:

```bash
npm i @headlessui/react @heroicons/react clsx motion
```

Tailwind CSS v4:

```bash
npm i tailwindcss@latest @tailwindcss/postcss postcss
```

## Usage

Import components:

```tsx
import { Button, Field, FieldGroup, Input, Label } from '@lss/ui-web'
```

Include the UI kit stylesheet in your global CSS (it expects your build to run Tailwind):

```css
@import '@lss/ui-web/styles/tailwind.css';
```

> Tailwind CSS v4 uses **source scanning**. This stylesheet already contains an internal `@source` directive for `@lss/ui-web/dist/index.js`, so the UI-kit’s classnames are discovered automatically (no extra app configuration needed).

## Dark theme (tokens + `dark:*` utilities)

`@lss/ui-web` uses a **single documented trigger** for both:

- **CSS tokens + `color-scheme`**
- Tailwind **`dark:*`** variants used inside the UI kit

Enable dark mode by setting one of the following on the document root (`html`, i.e. `:root`):

- `data-theme="dark"` (recommended)
- `.dark` (compatibility)

### Next.js (App Router) example

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  )
}
```

### Client-side toggle example

```ts
// Recommended:
document.documentElement.dataset.theme = 'dark' // or delete for light

// Compatibility:
document.documentElement.classList.toggle('dark', true)
```

Important: set the attribute/class on **`html`** (not `body`) so tokens and `dark:*` stay in sync.

## Notes / conventions

- The `Link` component is integrated with **Next.js App Router** via `next/link` in `src/components/link.tsx`.
- Components rely on Tailwind’s `data-*` variants (Headless UI `DataInteractive`) and Tailwind v4 features (CSS-first).
- For **neutral UI styling** (surfaces/text/borders), prefer semantic token utilities (`bg-surface`, `text-text-primary`, `border-border`, `ring-focus`) over hardcoded neutrals (`zinc-*`, `bg-white`, `dark:bg-*`, `dark:text-*`). Status colors (errors/warnings) can use palette utilities (`text-red-*`, etc).



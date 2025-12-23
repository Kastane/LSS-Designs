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

## Notes / conventions

- The `Link` component is integrated with **Next.js App Router** via `next/link` in `src/components/link.tsx`.
- Components rely on Tailwind’s `data-*` variants (Headless UI `DataInteractive`) and Tailwind v4 features (CSS-first).



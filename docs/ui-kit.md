# UI Kit (LSS)

Goal: maintain a shared component library that can be reused across **web**, **mobile**, and **desktop** versions of the app.

## Package structure

- `@lss/ui-web`: Catalyst-based React components styled with Tailwind CSS v4 (**the base package**).
- `@lss/ui-core`: platform-agnostic layer (tokens, types, behavioral primitives).
- `@lss/ui-mobile`: adapter package for hybrid mobile apps (**Capacitor/Cordova**) — reuses `@lss/ui-web`.
- `@lss/ui-desktop`: adapter package for desktop apps (**Electron/Tauri**) — reuses `@lss/ui-web`.
- `@lss/ui-native`: placeholder for fully native mobile (React Native/Expo) if we ever move there.

## Web usage (today)

Install peer dependencies required by Catalyst components:

```bash
npm i @headlessui/react @heroicons/react clsx motion
```

Next.js (App Router):

```bash
npm i next
```

Include Tailwind CSS v4 in your app and import UI kit stylesheet in your global CSS:

```css
@import '@lss/ui-web/styles/tailwind.css';
```

Tailwind CSS v4 uses **source scanning**. `@lss/ui-web/styles/tailwind.css` already includes an internal `@source` directive pointing at `@lss/ui-web/dist/index.js`, so the UI-kit’s Tailwind classes are discovered automatically (no extra app configuration needed).

Use components:

```tsx
import { Button, Field, FieldGroup, Input, Label } from '@lss/ui-web'

export function Example() {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <Field>
          <Label>Email</Label>
          <Input name="email" type="email" />
        </Field>
      </FieldGroup>
      <Button type="submit">Save</Button>
    </form>
  )
}
```

## Style guide (initial)

- **Composition over variants**: prefer composing existing primitives (`Field` + `Label` + `Input`) instead of adding many one-off variants.
- **Accessibility first**: keep labels connected, keep focus styles, don’t remove `aria-*` props.
- **Single routing integration point**: `@lss/ui-web`’s `Link` is the only place that should know about Next/Remix/etc.
- **Semantic tokens over neutrals**: don’t hardcode neutral palettes (`zinc-*`, `bg-white`, `dark:bg-*`, `dark:text-*`) for surfaces/text/borders. Use semantic utilities from tokens: `bg-bg`, `bg-surface`, `text-text-primary`, `border-border`, `ring-focus`, etc. (Status colors like `text-red-*` are ok for validation/errors.)
- **Tokens before hardcoding** (future): colors/spacing/radius should move to `@lss/ui-core` as tokens once we start customizing the design.
- **No app-specific business logic**: UI kit components should not call APIs or depend on app state managers.

## Component catalog (web)

Located in `packages/ui-web/src/components`:

- Layout: `auth-layout`, `sidebar-layout`, `stacked-layout`, `navbar`, `sidebar`
- Forms: `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `combobox`, `listbox`, `fieldset`
- Feedback: `alert`, `dialog`, `badge`, `divider`
- Data display: `table`, `description-list`, `pagination`
- Typography: `heading`, `text`
- Core: `button`, `link`, `avatar`

## How we’ll extend to mobile/desktop

- For **Capacitor/Cordova** and **Electron/Tauri**: reuse `@lss/ui-web` directly (web rendering).
- Use `@lss/ui-mobile` / `@lss/ui-desktop` for platform-specific wrappers (menus, shortcuts, safe areas, etc) without polluting `ui-web`.
- Move shared **types + tokens** into `@lss/ui-core` as we start customizing the design.
- If we ever go fully native: implement platform renderers in `@lss/ui-native`.



import clsx from 'clsx'
import type React from 'react'

export function AuthLayout({
  children,
  containerClassName,
  contentClassName,
  surfaceClassName,
  padding,
}: {
  children: React.ReactNode
  /**
   * Extra classes for the outer `<main>` element.
   */
  containerClassName?: string
  /**
   * Extra classes for the inner wrapper that contains `children`.
   */
  contentClassName?: string
  /**
   * Extra classes for the surface styling (bg/ring/shadow on desktop).
   * Added after the defaults so you can override them.
   */
  surfaceClassName?: string
  /**
   * Padding classes for the inner wrapper. Defaults to `p-6 lg:p-10`.
   */
  padding?: string
}) {
  return (
    <main className={clsx('flex min-h-dvh flex-col p-2', containerClassName)}>
      <div
        className={clsx(
          'flex grow items-center justify-center lg:rounded-lg lg:bg-surface lg:shadow-xs lg:ring-1 lg:ring-border/60',
          padding ?? 'p-6 lg:p-10',
          surfaceClassName,
          contentClassName
        )}
      >
        {children}
      </div>
    </main>
  )
}

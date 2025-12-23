'use client'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { useState } from 'react'
import { NavbarItem } from './navbar'

function OpenMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
    </svg>
  )
}

function CloseMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

function MobileSidebar({ open, close, children }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
  return (
    <Headless.Dialog open={open} onClose={close} className="lg:hidden">
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <Headless.DialogPanel
        transition
        className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full"
      >
        <div className="flex h-full flex-col rounded-lg bg-surface shadow-xs ring-1 ring-border/60">
          <div className="-mb-3 px-4 pt-3">
            <Headless.CloseButton as={NavbarItem} aria-label="Close navigation">
              <CloseMenuIcon />
            </Headless.CloseButton>
          </div>
          {children}
        </div>
      </Headless.DialogPanel>
    </Headless.Dialog>
  )
}

export function SidebarLayout({
  navbar,
  sidebar,
  children,
  containerClassName,
  contentClassName,
  surfaceClassName,
  maxWidth = '6xl',
  padding,
  sidebarWidthClassName = 'w-64',
  contentOffsetClassName = 'lg:pl-64',
}: React.PropsWithChildren<{
  navbar: React.ReactNode
  sidebar: React.ReactNode
  /**
   * Extra classes for the inner container that wraps `children`.
   * Defaults to `mx-auto max-w-6xl`.
   */
  containerClassName?: string
  /**
   * Extra classes for the `<main>` content element.
   */
  contentClassName?: string
  /**
   * Extra classes for the surface wrapper (padding/background/ring on desktop).
   * Added after the defaults so you can override them.
   */
  surfaceClassName?: string
  /**
   * Max width applied to the container wrapping `children`.
   * Use `"none"` to disable the built-in max-width and fully control it via `containerClassName`.
   */
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
  /**
   * Padding classes for the surface wrapper. Defaults to `p-6 lg:p-10`.
   */
  padding?: string
  /**
   * Desktop sidebar width classes. Defaults to `w-64`.
   */
  sidebarWidthClassName?: string
  /**
   * Desktop content offset classes (should match sidebar width). Defaults to `lg:pl-64`.
   */
  contentOffsetClassName?: string
}>) {
  let [showSidebar, setShowSidebar] = useState(false)

  let maxWidthClass =
    maxWidth === 'none'
      ? undefined
      : maxWidth === 'full'
        ? 'max-w-full'
        : maxWidth === '7xl'
          ? 'max-w-7xl'
          : maxWidth === '6xl'
            ? 'max-w-6xl'
            : maxWidth === '5xl'
              ? 'max-w-5xl'
              : maxWidth === '4xl'
                ? 'max-w-4xl'
                : maxWidth === '3xl'
                  ? 'max-w-3xl'
                  : maxWidth === '2xl'
                    ? 'max-w-2xl'
                    : maxWidth === 'xl'
                      ? 'max-w-xl'
                      : maxWidth === 'lg'
                        ? 'max-w-lg'
                        : maxWidth === 'md'
                          ? 'max-w-md'
                          : maxWidth === 'sm'
                            ? 'max-w-sm'
                            : undefined

  return (
    <div className="relative isolate flex min-h-svh w-full bg-bg max-lg:flex-col">
      {/* Sidebar on desktop */}
      <div className={clsx('fixed inset-y-0 left-0 max-lg:hidden', sidebarWidthClassName)}>{sidebar}</div>

      {/* Sidebar on mobile */}
      <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Navbar on mobile */}
      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <NavbarItem onClick={() => setShowSidebar(true)} aria-label="Open navigation">
            <OpenMenuIcon />
          </NavbarItem>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
      </header>

      {/* Content */}
      <main
        className={clsx(
          'flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2',
          contentOffsetClassName,
          contentClassName
        )}
      >
        <div
          className={clsx(
            'grow lg:rounded-lg lg:bg-surface lg:shadow-xs lg:ring-1 lg:ring-border/60',
            padding ?? 'p-6 lg:p-10',
            surfaceClassName
          )}
        >
          <div className={clsx('mx-auto', maxWidthClass, containerClassName)}>{children}</div>
        </div>
      </main>
    </div>
  )
}

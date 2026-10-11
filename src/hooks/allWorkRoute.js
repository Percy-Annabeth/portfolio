import { useSyncExternalStore } from 'react'

// Tiny "route" for the All Work page: it is open whenever the URL hash is  #/work
// (so the browser Back button, refreshing, and sharing the link all work).
const HASH = '#/work'
const listeners = new Set()
const notify = () => listeners.forEach((l) => l())
let openedInApp = false

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', notify)
  window.addEventListener('popstate', notify)
}

const subscribe = (cb) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export const isAllWorkOpen = () =>
  typeof window !== 'undefined' && window.location.hash === HASH

export function openAllWork() {
  openedInApp = true
  window.location.hash = HASH
}

export function closeAllWork() {
  if (!isAllWorkOpen()) return
  if (openedInApp) {
    // we pushed the #/work history entry ourselves, so just step back
    openedInApp = false
    window.history.back()
  } else {
    // page was opened directly on #/work — drop the hash without leaving the site
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    notify()
  }
}

export const useAllWorkOpen = () => useSyncExternalStore(subscribe, isAllWorkOpen, () => false)

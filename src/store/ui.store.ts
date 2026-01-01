import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * UIStore
 * --------
 * This interface defines:
 * 1. What UI state we store globally
 * 2. What actions are allowed to modify that state
 *
 * Think of this as:
 * - "Shape of the data"
 * - "Public API of the store"
 */
interface UIStore {
    // Whether sidebar is collapsed or expanded
    isSidebarCollapsed: boolean

    // Current theme of the application
    theme: 'light' | 'dark'

    // Currently active tab index
    activeTab: number

    // Actions (functions) to update the state
    toggleSidebar: () => void
    setSidebarCollapsed: (collapsed: boolean) => void

    setTheme: (theme: 'light' | 'dark') => void
    toggleTheme: () => void

    setActiveTab: (tab: number) => void
}

/**
 * useUIStore
 * ----------
 * This is the global Zustand store.
 *
 * - create()      -> creates a global state container
 * - persist()     -> saves and restores state from localStorage
 */
export const useUIStore = create<UIStore>()(
    persist(
        /**
         * This function defines:
         * - initial state
         * - how state can be updated
         *
         * `set` is Zustand’s way to update state.
         */
        (set) => ({
            /**
             * --------------------
             * INITIAL STATE
             * --------------------
             */
            isSidebarCollapsed: false,
            theme: 'light',
            activeTab: 0,

            /**
             * --------------------
             * SIDEBAR ACTIONS
             * --------------------
             */

            // Toggle sidebar collapsed <-> expanded
            toggleSidebar: () =>
                set((state) => ({
                    isSidebarCollapsed: !state.isSidebarCollapsed,
                })),

            // Explicitly set sidebar state
            setSidebarCollapsed: (collapsed) =>
                set({ isSidebarCollapsed: collapsed }),

            /**
             * --------------------
             * THEME ACTIONS
             * --------------------
             */

            /**
             * Set theme directly (light or dark)
             *
             * 1. Update the DOM <html> class
             * 2. Update Zustand state
             *
             * DOM update is needed because CSS (Tailwind / DaisyUI)
             * reacts to the `.dark` class.
             */
            setTheme: (theme) => {
                document.documentElement.classList.toggle(
                    'dark',
                    theme === 'dark'
                )

                set({ theme })
            },

            /**
             * Toggle theme:
             * light -> dark
             * dark  -> light
             *
             * This uses previous state to decide next state.
             */
            toggleTheme: () =>
                set((state) => {
                    const newTheme =
                        state.theme === 'light' ? 'dark' : 'light'

                    // Update DOM class immediately
                    document.documentElement.classList.toggle(
                        'dark',
                        newTheme === 'dark'
                    )

                    // Update Zustand state
                    return { theme: newTheme }
                }),

            /**
             * --------------------
             * TAB ACTION
             * --------------------
             */

            // Change active tab index
            setActiveTab: (tab) => set({ activeTab: tab }),
        }),

        /**
         * --------------------
         * PERSIST CONFIG
         * --------------------
         */
        {
            // Key used in localStorage
            name: 'ui-storage',

            /**
             * onRehydrateStorage
             * ------------------
             * This runs AFTER Zustand restores state from localStorage
             * when the page is refreshed.
             *
             * Why this exists:
             * - Zustand restores JS state
             * - BUT DOM classes are NOT restored automatically
             *
             * So we re-apply the theme to <html> here.
             */
            onRehydrateStorage: () => (state) => {
                if (!state) return

                document.documentElement.classList.toggle(
                    'dark',
                    state.theme === 'dark'
                )
            },
        }
    )
)

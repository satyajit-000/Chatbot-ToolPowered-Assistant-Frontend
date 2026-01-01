import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../common/interfaces/auth.type'
import { decodeUserFromToken } from '../common/utils/jwt'
import { mapUser } from '../common/utils/authUserMapper'

interface AuthStore {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    isLoading: boolean
    authError?: string | null;

    setLoading: (loading: boolean) => void
    setAuthError: (authError: string | null) => void;
    login: (payload: { access: string; refresh: string }) => void
    logout: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,

            setLoading: (isLoading) => set({ isLoading }),
            setAuthError: (authError) => set({ authError }),

            login: ({ access, refresh }) => {
                // 1️⃣ Decode token
                const backendUser = decodeUserFromToken(access)

                // 2️⃣ Map backend → frontend user
                const user = mapUser(backendUser)

                // 3️⃣ Store everything
                set({
                    user,
                    accessToken: access,
                    refreshToken: refresh,
                    isAuthenticated: true,
                    isLoading: false,
                })
            },

            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                if (!state?.accessToken) return

                const backendUser = decodeUserFromToken(state.accessToken)
                state.user = mapUser(backendUser)
                state.isAuthenticated = true
            }
        }
    )
)

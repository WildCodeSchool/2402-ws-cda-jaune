import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface UserPublicProfile {
  mail: string;
  id: number;
  roles: string;
}
interface UserState {
  profile: UserPublicProfile | null;
  login: (user: UserPublicProfile) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        profile: null,
        login: (user) => set(() => ({ profile: user })),
        logout: () => set({ profile: null }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);

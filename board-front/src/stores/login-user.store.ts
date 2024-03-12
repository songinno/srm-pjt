import { User } from 'types/interface';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LoginUserStore {
    loginUser: User | null;
    setLoginUser: (loginUser: User) => void;
    resetLoginUser: () => void;
}

// # Store
// const useLoginUserStore = create<LoginUserStore>(set => ({
//     // ! State
//     loginUser: null,
//     // ! Action
//     setLoginUser: (loginUser) =>
//         set((prev) => ({
//             ...prev, loginUser
//         })),
//     resetLoginUser: () =>
//         set((prev) => ({
//             ...prev, loginUser: null
//         }))
// }));

// ! persist - Session Stroage
const useLoginUserStore = create(
    persist<LoginUserStore>(
        (set, get) => ({
            loginUser: null,
            setLoginUser: (loginUser) => set({loginUser: loginUser}),
            resetLoginUser: () => set({loginUser: null})
        }),
        // ! Options
        {
            name: 'login-user-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)


export default useLoginUserStore;
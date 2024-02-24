import { User } from 'types/interface';
import { create } from 'zustand';

interface LoginUserStore {
    loginUser: User | null;
    setLoginUser: (loginUser: User) => void;
    resetLoginUser: () => void;
}

// # Store
const useLoginUserStore = create<LoginUserStore>(set => ({
    // ! State
    loginUser: null,
    // ! Action
    setLoginUser: (loginUser) =>
        set((prev) => ({
            ...prev, loginUser
        })),
    resetLoginUser: () =>
        set((prev) => ({
            ...prev, loginUser: null
        }))
}));

export default useLoginUserStore;
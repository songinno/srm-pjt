import { create } from "zustand";

interface BoardStore {
    // ! State
    title: string;
    content: string;
    boardImageFileList: File[];
    
    // ! Action
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: '',
    content: '',
    boardImageFileList: [],
    setTitle: title => set(prev => ({
        ...prev, title
    })),
    setContent: content => set(prev => ({
        ...prev, content
    })),
    setBoardImageFileList: boardImageFileList => set(prev => ({
        ...prev, boardImageFileList
    })),
    resetBoard: () => set(prev => ({
        ...prev,
        title: '',
        content: '',
        boardImageFileList:[],
    }))
}));

export default useBoardStore;
import { create } from 'zustand'

interface UsePropsType {
    displayProfile: Boolean;
    setDisplayProfile: (value: Boolean) => void;
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    displayContact: Boolean;
    setDisplayContact: (value: Boolean) => void;
    displayWorks: Boolean;
    setDisplayWorks: (value: Boolean) => void;
    circleScale: Boolean;
    setCircleScale: (value: Boolean) => void;
    showNotification: Boolean;
    setShowNotification: (value: Boolean) => void;
    sendNotification: Boolean;
    setSendNotification: (state: Boolean) => void;

}

const useProps = create<UsePropsType>((set) => ({
    displayProfile: false,
    setDisplayProfile: (value) => set({ displayProfile: value }),
    name: '',
    setName: (value) => set({ name: value}),
    email: '',
    setEmail: (value) => set({ email: value }),
    displayContact: false,
    setDisplayContact: (value) => set({ displayContact: value}),
    displayWorks: false,
    setDisplayWorks: (value) => set({ displayWorks: value}),
    circleScale: false,
    setCircleScale: (value) => set({ circleScale: value }),
    showNotification: false,
    setShowNotification: (value) => set({ showNotification: value }),
    sendNotification: false,
    setSendNotification: (state) => set({ sendNotification: state })
}))

export default useProps; 
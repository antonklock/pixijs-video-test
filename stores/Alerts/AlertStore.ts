import { create } from 'zustand';

interface Alert {
    id: number;
    title: string;
    message: string;
    color: string;
}

interface AlertStore {
    alerts: Alert[];
    addAlert: (alert: Omit<Alert, 'id'>) => void;
    removeAlert: (id: number) => void;
}

const useAlertStore = create<AlertStore>((set) => ({
    alerts: [],
    addAlert: (alert) => {
        const id = Date.now();
        set((state) => ({ alerts: [...state.alerts, { ...alert, id }] }));

        setTimeout(() => {
            set((state) => ({ alerts: state.alerts.filter(a => a.id !== id) }));
        }, 5000);
    },
    removeAlert: (id) => set((state) => ({ alerts: state.alerts.filter(a => a.id !== id) })),
}));

export default useAlertStore;

import { useState, useCallback } from 'react';

export const useTabState = (initialTab: string = '') => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const onTabPress = useCallback((tab: string) => {
        setActiveTab(tab);
    }, []);

    return {
        activeTab,
        onTabPress,
        setActiveTab
    };
};

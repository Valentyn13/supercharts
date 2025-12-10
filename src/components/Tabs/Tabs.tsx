import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from './Tabs.styles';
import AppButton from '../AppButton/AppButton';
import formatTabLabel from '../../helpers/formatDate';

type Props = {
    tabs: string[];
    activeTab: string;
    onTabPress: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onTabPress }: Props) => {

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {tabs.map((tab) => (
                    <AppButton
                        key={tab}
                        title={formatTabLabel(tab)}
                        onPress={() => onTabPress(tab)}
                        isActive={tab === activeTab}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Tabs;
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStorage from '../../hooks/useStorage';
import { PasswordItem } from './components/passwordItem';

export function Passwords() {
    const [passwords, setPasswords] = useState([]);
    const focused = useIsFocused();
    const { getItems, removeItem } = useStorage();

    useEffect(() => {
        async function loadPasswords() {
            let passwords = await getItems('@pass');
            setPasswords(passwords);
        }

        loadPasswords();
    }, [focused]);

    const handleRemovePassword = async item => {
        let passwords = await removeItem('@pass', item);
        setPasswords(passwords);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas senhas</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    style={{ flex: 1, paddingTop: 14 }}
                    data={passwords}
                    keyExtractor={item => String(item)}
                    renderItem={({ item }) => <PasswordItem data={item} removePassword={() => handleRemovePassword(item)} />}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#392de9',
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14
    }
});
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    const getItems = async (key) => {
        try {
            const passwords = await AsyncStorage.getItem(key);
            return JSON.parse(passwords) || [];
        } catch (error) {
            console.log('Erro ao buscar senhas', error);
            return [];
        }
    }

    const saveItem = async (key, value) => {
        try {
            let passwords = await getItems(key);
            passwords.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(passwords));
            return passwords;
        } catch (error) {
            console.log('Erro ao salvar senha', error);
            return [];
        }
    }

    const removeItem = async (key, item) => {
        try {
            let passwords = await getItems(key);
            let myPasswords = passwords.filter(password => password !== item);
            await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
            return myPasswords;
        } catch (error) {
            console.log('Erro ao remover senha', error);
            return [];
        }
    }

    return {
        getItems,
        saveItem,
        removeItem
    }
}

export default useStorage;
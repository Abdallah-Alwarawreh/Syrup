export const getSettings = async () => {
    return localStorage;
}

export const getSetting = async (key: string) => {
    return localStorage.getItem(key);
}

export const setSetting = async (key: string, value: any) => {
    return localStorage.setItem(key, value);
}

export const resetSettings = async () => {
    return localStorage.clear();
}
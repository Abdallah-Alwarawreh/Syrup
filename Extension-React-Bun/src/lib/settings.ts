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

export const setSettings = async (settings: { [key: string]: any }) => {
    try {
        for (const key in settings) {
            await setSetting(key, settings[key]);
        }
    } catch (error) {
        console.error("Error setting settings:", error);
        return false;
    }
    return true;
}

export const getSettingsObject = async () => {
    const settings = await getSettings();
    const settingsObject: { [key: string]: any } = {};
    for (const key in settings) {
        settingsObject[key] = settings[key];
    }
    return settingsObject;
}
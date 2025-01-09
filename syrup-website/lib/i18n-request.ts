import { getRequestConfig } from 'next-intl/server';
import { getUserLocale, getDefaultLocale } from './locale';
import deepmerge from 'deepmerge';

export default getRequestConfig(async () => {
    const locale = await getUserLocale();
    const defaultLocale = await getDefaultLocale();
    const localeMessages = (await import(`@/_locale/${locale}.json`)).default;
    const fallbackMessages = (await import(`@/_locale/${defaultLocale}.json`)).default;
    const messages = deepmerge(fallbackMessages, localeMessages);

    return {
        locale,
        messages: messages
    };
});

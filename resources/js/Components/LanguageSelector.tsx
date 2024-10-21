import {useForm} from "@inertiajs/react";

export const LanguageSelector = () => {
    const {patch} = useForm();

    const switchLanguage = (lang: string) => {
        patch(route('locale.switch', { locale: lang }));
    };

    return (
        <div className={"flex gap-2 text-white dark:text-gray-500"}>
            <button onClick={() => switchLanguage('en')}>EN</button>
            <button onClick={() => switchLanguage('lt')}>LT</button>
        </div>
    );
}
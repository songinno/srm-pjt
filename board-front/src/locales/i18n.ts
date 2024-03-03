import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationKO from 'locales/ko/translation.json';


const resources = {
    ko: {
        translation: translationKO
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ko", // 기본 설정 언어
        fallbackLng: "en", // 번역 파일에서 찾을 수 없는 경우의 언어
        interpolation: {
            escapeValue: false
        }
    });

    export default i18n;
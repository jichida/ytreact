import englishMessages from 'ra-language-english';
import chineseMessages from './cn_s';

import customChineseMessages from './cn';
import customEnglishMessages from './en';

export default {
    cn: { ...chineseMessages, ...customChineseMessages },
    en: { ...englishMessages, ...customEnglishMessages },
};

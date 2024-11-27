import { createI18n } from 'vue-i18n'

import english from '../i18n/english.json'
import chinese_simplified from '../i18n/chinese_simplified.json'

const messages = {
  english,
  chinese_simplified,
}

const i18n = createI18n({
  locale: 'chinese_simplified',
  fallbackLocale: 'english',
  messages,
})

export default i18n

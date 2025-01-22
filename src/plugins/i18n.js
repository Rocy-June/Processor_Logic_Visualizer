import { createI18n } from 'vue-i18n'

import chinese_simplified from '../i18n/chinese_simplified.json'
import chinese_traditional from '../i18n/chinese_traditional.json'
import english from '../i18n/english.json'
import japanese from '../i18n/japanese.json'
import korean from '../i18n/korean.json'

const messages = {
  chinese_simplified,
  chinese_traditional,
  english,
  japanese,
  korean,
}

const i18n = createI18n({
  warnHtmlInMessage: 'off',
  locale: 'english',
  fallbackLocale: 'english',
  messages,
})

export default i18n

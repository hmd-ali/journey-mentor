import withNuxt from './.nuxt/eslint.config.mjs'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default withNuxt(skipFormatting, {
  rules: {
    'vue/script-indent': 'off',
    'vue/multi-word-component-names': 'off',
  },
})

// @ts-check
import antfu from '@antfu/eslint-config' // eslint 配置
import withNuxt from './.nuxt/eslint.config.mjs' // nuxt eslint 配置

export default withNuxt(
  antfu({
    rules: {
      'node/prefer-global/process': 'off',
    },
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      css: true,
      /**
       * Format HTML files
       * By default uses Prettier
       */
      html: true,
      /**
       * Format Markdown files
       * Supports Prettier and dprint
       * By default uses Prettier
       */
      markdown: 'prettier',
    },
  }),
)

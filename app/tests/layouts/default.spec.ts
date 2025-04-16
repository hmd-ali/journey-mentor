import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, describe, it } from 'vitest'
import Default from '~/layouts/default.vue'

describe('app/layouts/default.vue', async () => {
  const mount = () => mountSuspended(Default)

  it('should render', async () => {
    const wrapper = await mount()

    expect(wrapper.exists()).toBe(true)
  })

  it('renders the title and theme switch button', async () => {
    const wrapper = await mount()
    expect(wrapper.html()).toContain('Where in the world?')
    const button = wrapper.get('button[data-test="theme-switch"]')
    expect(button).toBeDefined()
  })

  it('toggles the theme on button click', async () => {
    const wrapper = await mount()
    const button = wrapper.get('button[data-test="theme-switch"]')

    const html = document.documentElement

    expect(html.classList.contains('light')).toBe(true)
    await button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(html.classList.contains('dark')).toBe(true)
  })
})

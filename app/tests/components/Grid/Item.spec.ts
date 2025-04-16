import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, describe, it } from 'vitest'
import Item from '~/components/Grid/Item.vue'

describe('app/components/Grid/Item.vue', async () => {
  it('should render', async () => {
    const wrapper = await mountSuspended(Item, {
      props: {
        country: {
          capital: 'Test Capital',
          flag: 'https://flagcdn.com/test-flag.png',
          name: 'Test Country',
          population: 1000000,
          region: 'Test Region',
          flagAlt: 'Test Flag Alt',
        },
      },
    })

    expect(wrapper.html()).toContain('Test Capital')
    expect(wrapper.html()).toContain('Test Country')
    expect(wrapper.html()).toContain('Test Region')
    expect(wrapper.html()).toContain('Test Flag Alt')
    expect(wrapper.html()).toContain('1,000,000')
    expect(wrapper.html()).toContain('https://flagcdn.com/test-flag.png')
  })
})

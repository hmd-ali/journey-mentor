import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { LabelValue } from '#components'

describe('app/components/global/LabelValue.vue', async () => {
  it('should render', async () => {
    const wrapper = await mountSuspended(LabelValue, {
      props: {
        label: 'Test Label',
        value: 'Test Value',
      },
    })

    expect(wrapper.html()).toContain('Test Label')
    expect(wrapper.html()).toContain('Test Value')
  })
})

import { Dropdown } from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, describe, it } from 'vitest'

describe('app/components/global/Dropdown.vue', async () => {
  it('should render', async () => {
    const wrapper = await mountSuspended(Dropdown, {
      props: {
        options: [
          { name: 'Option 1', value: 'option1' },
          { name: 'Option 2', value: 'option2' },
          { name: 'Option 3', value: 'option3' },
        ],
        modelValue: { name: 'Option 1', value: 'option1' },
        label: 'Test Label',
        displayValue: (value) => value?.name ?? null,
      },
    })

    expect(wrapper.html()).toContain('Test Label')

    const dropdownButton = wrapper.find('button')
    expect(dropdownButton.exists()).toBe(true)
    await dropdownButton.trigger('click')
    await wrapper.vm.$nextTick()
    const dropdownOptions = wrapper.findAll('[role="option"]')
    expect(dropdownOptions.length).toBe(3)
    expect(dropdownOptions?.[0]?.text()).toContain('Option 1')
  })
})

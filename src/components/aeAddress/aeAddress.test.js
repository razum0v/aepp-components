import { shallow, mount } from 'vue-test-utils'
import AeAddress from './aeAddress.vue'
import AeAddressPlugin from './index'

describe('AeAddress', () => {
  const address = '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9'

  it('has an install function', () => {
    expect(AeAddressPlugin).toBeInstanceOf(Function)
  })

  describe('basic rendering', () => {
    it('contains an ae-identity-avatar when show-avatar is true', () => {
      const wrapper = shallow(AeAddress, {
        propsData: {
          address,
          showAvatar: true
        },
        stubs: {
          'ae-identity-avatar': '<div data-identity-avatar></div>'
        }
      })

      expect(wrapper.contains('[data-identity-avatar]')).toBe(true)
    })

    it('does NOT contain an ae-identity-avatar when show-avatar is false', () => {
      const wrapper = shallow(AeAddress, {
        propsData: {
          address,
          showAvatar: false
        },
        stubs: {
          'ae-identity-avatar': '<div data-identity-avatar></div>'
        }
      })
      expect(wrapper.contains('[data-identity-avatar]')).toBe(false)
    })

    it('passes on the address to the rendered ae-identity-avatar', () => {
      const address = '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9'
      const wrapper = shallow(AeAddress, {
        propsData: {
          address,
          showAvatar: true
        },
        stubs: {
          'ae-identity-avatar': '<div data-identity-avatar></div>'
        }
      })

      const avatar = wrapper.find('[data-identity-avatar]')
      expect(avatar.element.getAttribute('address')).toBe(address)
    })

    it('renders address in a shorted format when size is not \'full\'', () => {
      const address = '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9'
      const wrapper = mount(AeAddress, {
        propsData: {
          address,
          size: 'short'
        }
      })
      wrapper.update()

      return wrapper.vm.$nextTick().then(() => {
        const addrElem = wrapper.find('.address')
        const addrText = addrElem.element.textContent
        const matched = addrText.match(/^0x?[A-Fa-f0-9]*…*[A-Fa-f0-9]*9$/)
        expect(matched.length).toBe(1)
        expect(addrText.length).toBeLessThan(address.length)
      })
    })
  })
})

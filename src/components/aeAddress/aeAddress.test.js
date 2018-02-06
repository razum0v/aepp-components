import { shallow, mount } from 'vue-test-utils'
import AeAddress from './aeAddress.vue'
import AeAddressPlugin from './index'

describe('AeAddress', () => {
  it('has an install function', () => {
    expect(AeAddressPlugin).toBeInstanceOf(Function)
  })

  describe('basic rendering', () => {
    it('contains an ae-identity-avatar when show-avatar is true', () => {
      const wrapper = shallow(AeAddress)
      wrapper.setProps({showAvatar: true})
      expect(wrapper.contains('ae-identity-avatar')).toBe(true)
    })

    it('does NOT contain an ae-identity-avatar when show-avatar is false', () => {
      const wrapper = shallow(AeAddress)
      wrapper.setProps({showAvatar: false})
      expect(wrapper.contains('ae-identity-avatar')).toBe(false)
    })

    it('passes on the address to the rendered ae-identity-avatar', () => {
      const wrapper = shallow(AeAddress)
      const address = '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9'
      wrapper.setProps({
        showAvatar: true,
        address
      })
      const avatar = wrapper.find('ae-identity-avatar')
      expect(avatar.element.getAttribute('address')).toBe(address)
    })

    it('renders address in a shorted format when size is not \'full\'', () => {
      const address = '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9'
      console.log(AeAddress)
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
        console.log(wrapper.vm.address)
        console.log(wrapper.vm.size)
        console.log(wrapper.vm.displayAddress)
        console.log(addrText)
        const matched = addrText.match(/^0x?[A-Fa-f0-9]*…*[A-Fa-f0-9]*9$/)
        expect(matched.length).toBe(1)
        expect(addrText.length).toBeLessThan(address.length)
      })
    })
  })
})

import {shallow, mount} from 'vue-test-utils'
import AeValidatedTextInput from './aeValidatedTextInput.vue'
import AeTextValidatedInputPlugin from './index'

describe('AeValidatedTextInput', () => {
  const createMountProps = (data = {}) => {
    return {
      propsData: data,
      slots: {
        default: '<input>'
      }
    }
  }

  const createShallowWrapper = (data) => {
    return shallow(
      AeValidatedTextInput, createMountProps(data)
    )
  }

  const createWrapper = (data = {}) => {
    return mount(
      AeValidatedTextInput, createMountProps(data)
    )
  }

  it('has an install function', () => {
    expect(AeTextValidatedInputPlugin).toBeInstanceOf(Function)
  })

  describe('basic rendering', () => {
    it('renders an input provided as default slot', () => {
      const wrapper = shallow(AeValidatedTextInput)
      expect(wrapper.contains('input')).toBe(true)
    })

    it('forwards placeholder prop onto ae-text-input element', () => {
      const placeholder = 'plchldr'
      const wrapper = createShallowWrapper({placeholder})
      const input = wrapper.find('input')
      expect(input.vm.$props.placeholder).toBe(placeholder)
    })

    it('sets id property for the input', () => {
      const id = 'asdfas'
      const wrapper = createShallowWrapper({inputId: id})
      const input = wrapper.find('input')
      const receivedId = input.vm.id
      expect(receivedId).toBe(id)
    })

    it('renders the value prop as the value of the input', () => {
      const value = 'flk'
      const wrapper = createShallowWrapper({value})
      const input = wrapper.find('input')
      expect(input.vm.value).toBe(value)
    })
  })

  describe('event handling', () => {
    it('emits input event with value when input emits one', () => {
      const value = 'adqd'
      const wrapper = createWrapper({value})
      const input = wrapper.find('input')
      input.trigger('input')
      const receivedEvent = wrapper.emitted('input')
      expect(receivedEvent).toBeTruthy()
      expect(receivedEvent.length).toBe(1)
      expect(receivedEvent[0]).toEqual([value])
    })

    it('emits blur event with value when input emits one', () => {
      const value = 'adqd'
      const wrapper = createWrapper({value})
      const input = wrapper.find('input')
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('blur')
      expect(receivedEvent).toBeTruthy()
      expect(receivedEvent.length).toBe(1)
      expect(receivedEvent[0]).toEqual([value])
    })

    it('emits focus event when input triggers it', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      input.trigger('focus')
      const receivedEvent = wrapper.emitted('focus')
      expect(receivedEvent).toBeTruthy()
    })

    it('forwards clearRequest event', () => {
      const onClearRequest = jest.fn()
      const value = 'adsfaddd'
      const wrapper = createShallowWrapper({onClearRequest})
      const input = wrapper.vm.$refs.input
      input.$emit('clearRequest', value)
      const received = wrapper.emitted('clearRequest')

      expect(received).toBeTruthy()
      expect(received.length).toBe(1)
      expect(received[0][0]).toBe(value)
    })

    it('emits validation event when input emits input event', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnInput call result to validate event when input emits input event', () => {
      const result = 'xaxaxax'
      const validateOnInput = () => result
      const wrapper = createWrapper({validateOnInput})
      const input = wrapper.find('input')
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent.length).toBe(2)
      expect(receivedEvent[1]).toEqual([result])
    })

    it('emits validation event when input emits blur', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnBlur call result to validate event when input emits blur', () => {
      const result = 'xaxaxax'
      const validateOnBlur = () => result
      const wrapper = createWrapper({validateOnBlur})
      const input = wrapper.find('input')
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent.length).toBe(2)
      expect(receivedEvent[1]).toEqual([result])
    })

    it('emits validate when value property changes', () => {
      const wrapper = createWrapper({value: 'sadfs'})
      const initialEvent = wrapper.emitted('validation') || []
      const initialLength = initialEvent.length || 0

      wrapper.setProps({value: '.kj;kj'})
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
      expect(receivedEvent.length).toBe(initialLength + 1)
    })
  })
})

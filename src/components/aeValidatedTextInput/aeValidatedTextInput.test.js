import {shallow, mount} from 'vue-test-utils'
import AeValidatedTextInput from './aeValidatedTextInput.vue'
import AeTextValidatedInputPlugin from './index'
import AeInput from '../aeInput/aeInput.vue'

describe('AeValidatedTextInput', () => {
  const createMountProps = (data = {}) => {
    return {
      propsData: data,
      slots: {
        default: AeInput
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
      const wrapper = createShallowWrapper()
      expect(wrapper.contains(AeInput)).toBe(true)
    })
  })

  describe('event handling', () => {
    it('emits validation event when input emits input event', () => {
      const wrapper = createWrapper()
      const input = wrapper.find(AeInput)
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnInput call result to validate event when input emits input event', () => {
      const result = 'xaxaxax'
      const validateOnInput = () => result
      const wrapper = createWrapper({validateOnInput})
      const input = wrapper.find(AeInput)
      input.trigger('input')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent.length).toBe(1)
      expect(receivedEvent[0][0]).toEqual(result)
    })

    it('emits validation event when input emits blur', () => {
      const wrapper = createWrapper()
      const input = wrapper.find(AeInput)
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent).toBeTruthy()
    })

    it('attaches validateOnBlur call result to validate event when input emits blur', () => {
      const result = 'xaxaxax'
      const validateOnBlur = () => result
      const wrapper = createShallowWrapper({
        validateOnBlur
      })
      const input = wrapper.find(AeInput)
      input.setProps({value: result})
      input.trigger('blur')
      // input.element.dispatchEvent(new Event('blur'))
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent.length).toBe(2)
      expect(receivedEvent[1][0]).toEqual(result)
    })

    // it('emits validate when value property changes', () => {
    //   const wrapper = createShallowWrapper({value: 'sadfs'})
    //   const initialEvent = wrapper.emitted('validation') || []
    //   const initialLength = initialEvent.length || 0
    //
    //   wrapper.setProps({value: '.kj;kj'})
    //   const receivedEvent = wrapper.emitted('validation')
    //   expect(receivedEvent).toBeTruthy()
    //   expect(receivedEvent.length).toBe(initialLength + 1)
    // })
  })
})

describe('AeValidatedTextInput/input', () => {
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
      const wrapper = createShallowWrapper()
      expect(wrapper.contains('input')).toBe(true)
    })
  })

  describe('event handling', () => {
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
      expect(receivedEvent.length).toBe(1)
      expect(receivedEvent[0][0]).toEqual(result)
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
      const wrapper = createShallowWrapper({
        validateOnBlur
      })
      const input = wrapper.find('input')
      input.trigger('blur')
      const receivedEvent = wrapper.emitted('validation')
      expect(receivedEvent.length).toBe(1)
      expect(receivedEvent[0][0]).toEqual(result)
    })

    // it('emits validate when value property changes', () => {
    //   const wrapper = createShallowWrapper({value: 'sadfs'})
    //   const initialEvent = wrapper.emitted('validation') || []
    //   const initialLength = initialEvent.length || 0
    //
    //   wrapper.setProps({value: '.kj;kj'})
    //   const receivedEvent = wrapper.emitted('validation')
    //   expect(receivedEvent).toBeTruthy()
    //   expect(receivedEvent.length).toBe(initialLength + 1)
    // })
  })
})

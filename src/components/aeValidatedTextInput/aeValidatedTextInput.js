import AeButton from '../aeButton/aeButton.vue'

const alwaysValid = () => undefined

export default {
  name: 'ae-validated-text-input',
  components: {
    AeButton
  },
  data () {
    return {
      isValid: undefined,
      hasFocus: false
    }
  },
  props: {
    validateOnBlur: {
      type: Function,
      default: alwaysValid
    },
    validateOnInput: {
      type: Function,
      default: alwaysValid
    },
    maxlength: {
      type: Number,
      validator: function (value) {
        return value > 0 && parseInt(value) === value
      }
    }
  },
  computed: {
    errorMessage () {
      const errorId = this.errorId

      if (!errorId) {
        return undefined
      }

      return this.errorMessageMap[errorId] || this.errorDefaultMessage
    },
    inputVM () {
      const defaultSlot = this.$slots.default
      if (!defaultSlot || defaultSlot.length === 0) {
        return null
      }

      return defaultSlot[0].componentInstance
    },
    inputElement () {
      const root = this.$refs.root
      return root.querySelector('input, textarea')
    }
  },
  methods: {
    onBlur () {
      const value = this.inputVM.value
      this.hasFocus = false
      this.validateBlured()
      this.$emit('blur', value)
    },
    onInput () {
      const value = this.inputElement.value
      this.hasFocus = true
      this.internalValue = value
      this.validateFocused()
      this.$emit('input', value)
    },
    onFocus () {
      this.hasFocus = true
      this.validateFocused()
      this.$emit('focus')
    },
    validateFocused () {
      const value = this.inputElement.value
      const validationResult = this.validateOnInput(value)
      const valid = !validationResult
      this.isValid = valid
      this.$emit(
        'validation',
        valid ? undefined : validationResult
      )
    },
    validateBlured () {
      const value = this.inputVM.$props ?
        this.inputVM.$props.value : this.inputElement.value
      const validationResult = this.validateOnBlur(value)
      const valid = !validationResult
      this.isValid = valid
      this.$emit(
        'validation',
        valid ? undefined : validationResult
      )
    },
    validate () {
      if (this.hasFocus) {
        this.validateFocused()
      } else {
        this.validateBlured()
      }
    },
    onClearRequest (value) {
      this.$emit('clearRequest', value)
    }
  },
  mounted () {
    const inputVM = this.inputVM
    const input = this.inputElement
    input.addEventListener('focus', this.onFocus.bind(this))
    input.addEventListener('blur', this.onBlur.bind(this))
    input.addEventListener('input', this.onInput.bind(this))
    // inputVM.$on('blur', this.onBlur.bind(this))
    inputVM.$watch('value', this.validate.bind(this))
    this.isValid = this.validate()
  },
  destroyed () {
    // try {
    //   const rootElem = this.$refs.root
    //   const input = rootElem.querySelector('input, textarea')
    //   input.removeEventListener('focus', this.onFocus)
    //   input.removeEventListener('blur', this.onBlur)
    //   input.removeEventListener('input', this.onInput)
    // } catch (err) {}
  }
}

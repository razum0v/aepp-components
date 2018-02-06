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
      hasFocus: false,
      internalValue: this.value
    }
  },
  props: {
    inputId: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    validateOnBlur: {
      type: Function,
      default: alwaysValid
    },
    validateOnInput: {
      type: Function,
      default: alwaysValid
    },
    value: {
      type: String,
      default: ''
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
    }
  },
  methods: {
    onBlur (value) {
      this.hasFocus = false
      this.validateBlured()
      this.$emit('blur', value)
    },
    onInput (value) {
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
      const value = this.internalValue
      const validationResult = this.validateOnInput(value)
      const valid = !validationResult
      this.isValid = valid
      this.$emit(
        'validation',
        valid ? undefined : validationResult
      )
    },
    validateBlured () {
      const value = this.internalValue
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
    this.isValid = this.validate()
  },
  watch: {
    value (val) {
      this.internalValue = val
      this.validate()
    }
  }
}

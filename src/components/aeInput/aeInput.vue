<template>
  <textarea
    v-if="['textarea', 'address'].includes(type)"
    :class="className"
    @input="handleInput"
    @copy="handleCopy"
  >{{formattedValue}}</textarea>
  <input
    v-else
    :type="type"
    :class="className"
    @input="handleInput"
    @copy="handleCopy"
    :value="formattedValue"
  />
</template>

<script>
  export default {
    name: 'ae-input',
    props: {
      value: {
        type: String,
        default: ''
      },
      /**
       * Type of input, possible values: 'textarea', 'password', 'address'
       */
      type: {
        type: String,
        validator: (value) => {
          return ['textarea', 'password', 'address'].includes(value)
        }
      },
      /**
       * Enables monospace font
       */
      monospace: Boolean
    },
    computed: {
      className () {
        return {
          'ae-input': true,
          monospace: this.monospace,
          address: this.type === 'address'
        }
      },
      formattedValue () {
        if (this.type !== 'address') return this.value
        return this.formatAddress(this.value).address
      }
    },
    methods: {
      handleInput (inputEvent) {
        if (this.type === 'address') {
          const { selectionStart, value } = inputEvent.target
          const { address, cursor } = this.formatAddress(value, selectionStart)
          if (address !== value) {
            inputEvent.target.value = address
            inputEvent.target.setSelectionRange(cursor, cursor)
          }
          this.$emit('input', inputEvent.target.value.replace(/[ \n]/g, ''))
        } else {
          this.$emit('input', inputEvent.target.value)
        }
      },
      handleCopy (event) {
        if (this.type !== 'address') return
        const { selectionStart: s1, selectionEnd: s2, value } = event.target
        event.clipboardData.setData('text/plain',
          value.slice(Math.min(s1, s2), Math.max(s1, s2)).replace(/[ \n]/g, ''))
        event.preventDefault()
      },
      formatAddress (address, cursor = address.length) {
        if (['', '0'].includes(address)) return { address, cursor }

        let [begin, end] = [[address.startsWith('0x') ? 2 : 0, cursor], [cursor]]
          .map(args => address.slice(...args).replace(/[^A-Fa-f0-9]/g, ''))

        begin = `0x${begin}`

        const splitBy = 7
        const addSpaces = (address, firstLength) => {
          const fl = firstLength || splitBy
          const res = []
          let i = -1
          const group = () => i >= 0
            ? address.slice(splitBy * i + fl, splitBy * (i + 1) + fl)
            : address.slice(0, fl)
          while (group() !== '') {
            res.push(group())
            i++
          }
          return [res.join(' '), res.length ? res[res.length - 1].length : 0]
        }

        let lastLength
        [begin, lastLength] = addSpaces(begin);
        [end] = addSpaces(end, splitBy - lastLength)

        let res = `${begin}${lastLength === splitBy ? ' ' : ''}${end}`.slice(0, 47)
        const lineBreakPos = (splitBy + 1) * 3 - 1
        res = res[lineBreakPos]
          ? `${res.slice(0, lineBreakPos)}\n${res.slice(lineBreakPos + 1)}`
          : res

        return { address: res, cursor: begin.length }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../variables";

  .ae-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: solid 2px $silver;
    padding: 14px 26px;
    margin: 10px 0 30px 0;

    font-weight: 500;
    line-height: 1.63;
    letter-spacing: 0.2px;
    color: $anthracite;

    ::placeholder {
      color: $grey;
    }

    &.monospace, &[type=password], &.address {
      font-family: 'Roboto Mono', monospace;
    }
  }

  textarea.ae-input {
    min-height: 110px;
    max-height: 300px;
    resize: vertical;

    &.address {
      resize: none;
      text-align: center;
      min-height: 0;
      height: 90px;
      line-height: 29px;
      overflow: hidden;
    }
  }
</style>

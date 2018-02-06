<template>
  <div>
    <slot
      ref="input"
      :value="internalValue"
      :id="inputId"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
  </div>
</template>
<script src="./aeValidatedTextInput.js">
  export {default} from './aeValidatedTextInput'
</script>
<style scoped lang='scss' src='./aeValidatedTextInput.scss'/>

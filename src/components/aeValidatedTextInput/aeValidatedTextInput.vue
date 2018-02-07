<template>
  <div ref="root">
    <slot
      ref="input"
      :id="inputId"
      :placeholder="placeholder"

    />
  </div>
</template>
<script src="./aeValidatedTextInput.js">
  export {default} from './aeValidatedTextInput'
</script>
<style scoped lang='scss' src='./aeValidatedTextInput.scss'/>

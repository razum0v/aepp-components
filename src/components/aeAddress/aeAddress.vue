<template>
  <div :class='cssClass'>
    <ae-identity-avatar v-if='showAvatar' :address='address' />
    <span ref="address" class='address'>{{displayAddress}}</span>
  </div>
</template>
<script src='./aeAddress.js'>
  export {default} from './aeAddress'
</script>
/* eslint no-unused-expressions: "off" */
<style src='./aeAddress.scss'/>

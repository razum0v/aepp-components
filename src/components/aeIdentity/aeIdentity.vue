<template>
<div :class="{ 'identity-wrap' : true}">
		<div @click="$emit('click', $event)" :class="classObject">
      <div class="flex-row">
        <ae-identity-avatar :address='identity ? identity.address : ""'/>
        <span class="identity-info _short" v-if="collapsed">{{shortAddress}}</span>

        <div>
          <div v-if='tokenAmount' :class="{balance: true, '_small-font': collapsed}">
            <span class="amount">{{tokenAmount}}</span>
            <span class="currency-symbol">AE</span>
          </div>
          <div :class="{balance: true, '_small-font': tokenAmount}">
            <span class="amount">{{amount}}</span>
            <span class="currency-symbol">ETH</span>
          </div>
        </div>
      </div>
      <div v-if="!collapsed">
        <div class="public-id-title">Public identity</div>
        <div class="identity-info _long">{{address}}</div>
      </div>
      <div class="bottom-inserted-elements" v-if="hasSlot && !collapsed">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script src='./aeIdentity.js'/>
// eslint-disable-next-line no-unused-expressions, semi
<style scoped src='./aeIdentity.css'/>

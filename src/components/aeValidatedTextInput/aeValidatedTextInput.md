```javascript
new Vue({
  data:{
    inputValue: 'Initial value',
    errMsg:''
  },
 template: `
  <div>
      <ae-validated-text-input
        @validation="onValidationResult"
        :validateOnBlur="validate"
        :validateOnInput="validate"
      >
        <ae-input :value="inputValue" placeholder="Test input"/>
      </ae-validated-text-input>
      <p>{{errMsg}}</p>
  </div>
  `,
  methods: {
      validate(value){
        const inValid = /\D/.test(value)
        if(inValid){
         return 'Only digits are allowed'
        }
      },
      onValidationResult(result){
        this.errMsg = typeof result === 'string' ? result : ''
      }
  }
})
```

```javascript
new Vue({
  data:{
    inputValue: 'Initial value',
    errMsg:''
  },
 template: `
  <div>
      <ae-validated-text-input
        @validation="onValidationResult"
        :validateOnBlur="validate"
        :validateOnInput="validate"
      >
        <input :value="inputValue" placeholder="Test input"/>
      </ae-validated-text-input>
      <p>{{errMsg}}</p>
  </div>
  `,
  methods: {
      validate(value){
        const inValid = /\D/.test(value)
        if(inValid){
         return 'Only digits are allowed'
        }
      },
      onValidationResult(result){
        this.errMsg = typeof result === 'string' ? result : ''
      }
  }
})
```

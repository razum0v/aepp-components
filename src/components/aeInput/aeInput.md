```js
  <ae-input placeholder="Placeholder" />
```

```js
  <ae-input type="textarea" monospace placeholder="Textarea, monospace" />
```

```js
  <ae-input type="password" value="1234" />
```

```js
  new Vue({
    data () { return { address: '' } },
    template: `
      <div>
        <ae-input
          type="address"
          placeholder="0x00000 0000000 0000000\n0000000 0000000 0000000"
          v-model="address"
        />
        Address: {{address}}
      </div>
    `
  })
```

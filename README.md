# Accessible Modal for Vue3

- overwritable CSS
- `aria-*` filled
- autofocus on first interactive element
- focus trapped inside
- close en ESC key
- refocus on initiator


## Usage

```html
<template>
    <Modal ref="modal" v-slot="{ payload }">
        {{ payload.text }}
    </Modal>
</template>

<script>
import Modal from '@todo/vue-modal'

export default {
    components: {
        Modal
    },
    methods: {
        openModal() {
            this.$refs.modal.open({ text: 'Hey !' })
        }
    }
}
</script>
```

## Attributes

| prop | type | default | desc |
| ---- | ---- | ---- | ---- |
| `teleport` | `String` | `body` | name of the DOM element to teleport the modal in, see `Teleport.to` |
| `transition` | `String` | `modal_transition` | name of the CSS transition to play, see `Transition.name` |

*Note: `.modal_transition` basic animation is included*

## Slot props

| prop | type | desc |
| ---- | ---- | ---- |
| `payload` | `Object` | exposed data from `open(payload)` method |
| `close` | `Function` | see `close` method |
| `accept` | `Function` | see `accept` method |
| `reject` | `Function` | see `reject` method |

##  Events

| event | param | desc |
| ----- | ----- | ---- |
| `open` | - | triggered when modal is activated |
| `close` | - | triggered when modal is deactivated |
| `toggle` | `Boolean` | triggered on both `open` and `close` with the active value |

## Methods

### `Modal.open(payload, alert)`

Open modal and pass `payload` to the slot.

| param | type | desc |
| ------ | ------ | ---- |
| `payload` | `*` | custom data passed down to the `<slot />` |
| `alert` | `Boolean` | if `true` turn the modal into `alert` role, disable closing till `accept` or `reject`. Has an `Object` variant, see next |
| `alert` | `Object { label: String, desc: String}` | same as previous and set `aria-labelledby` and `aria-describedby` for better a11y |

Returns a `Promise` waiting for `accept()` or `reject()`.

### `Modal.expect(payload, alert)`

Same as `Modal.open()` but defaultly set `alert` to `true` and returns a `Boolean` based on the `Promise` result.

### `Modal.close()`

Close the modal and reset its data. **Note: It does not resolve nor reject the `Promise` !**

### `Modal.accept(result)`

Resolve the `Promise` with `result` and close.

### `Modal.accept(result)`

Reject the `Promise` with `result` and close.


## Customization

### CSS

Set these CSS variables:
```css
--modal-zindex
--modal-backdrop
--modal-width
--modal-margin
--modal-padding
--modal-background
--modal-radius
--modal-shadow
--modal-close-margin
--modal-transition
```

Or overwrite these global CSS classes:
```css
.modal {}
.modal_body {}
.modal_close {}
.modal_transition {}
```

Or specify by adding your own class:
```html
<template>
    <Modal class="myModal">
        <!-- your content here -->
    </Modal>
</template>

<style>
.myModal.modal {}
.myModal.modal .modal_body {}
.myModal.modal .modal_close {}
.myModal.modal .modal_transition {}
</style>
```

### Close button

By default, the close button is the `x` icon from [feathericons.com](https://feathericons.com).
To change it, use the `#close` slot:

```html
<template>
    <Modal>
        <template #close>
            Close <!-- "Close" will now replace the default icon -->
        </template>
        <template #default>
            <!-- your content here -->
        </template>
    </Modal>
</template>
```


## Exemples

### Basic payload

```html
<template>
    <Modal ref="modal" v-slot="{ payload, close }">
        <MyForm v-model="payload" @submit="close" />
    </Modal>
</template>

<script>
import Modal from '@todo/vue-modal'
import MyForm from '@/components/MyForm'

export default {
    components: {
        Modal,
        MyForm
    },
    data: () => ({
        form: {
            // form data here
        }
    }),
    methods: {
        openModal() {
            this.$refs.modal.open(this.form)
        }
    }
}
</script>
```

### Confirm modal

```html
<template>
    <Modal ref="modal" v-slot="{ payload, accept, reject }">
        <p>{{ payload.message }}</p>
        <button @click="accept()">OK</button>
        <button @click="reject()">Nope</button>
    </Modal>
</template>

<script>
import Modal from '@todo/vue-modal'

export default {
    components: {
        Modal
    },
    methods: {
        async confirm(message) {
            const confirmed = await this.$refs.modal.expect({ message })
            if(confirmed) {
                // process if confirmed
            }
            else {
                // process if denied
            }
        }
    }
}
</script>
```

### Confirm modal - Try/catch alternative

```html
<template>
    <Modal ref="modal" v-slot="{ payload, accept, reject }">
        <p>{{ payload.message }}</p>
        <button @click="accept('oh yes')">OK</button>
        <button @click="accept('not sure')">Maybe</button>
        <button @click="reject('oh no')">Nope</button>
    </Modal>
</template>

<script>
import Modal from '@todo/vue-modal'

export default {
    components: {
        Modal
    },
    methods: {
        async confirm(message) {
            try {
                const result = await this.$refs.modal.open({ message })
                // result = "oh yes" or "not sure"
            }
            catch(result) {
                // result = "oh no"
            }
        }
    }
}
</script>
```

### More

See `test/components` for more exemples.
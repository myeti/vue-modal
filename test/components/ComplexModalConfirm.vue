<template>
    <section>

        <h2>Complex Modal for confirm</h2>

        <ul>
            <li>Active: {{ active }}</li>
            <li>Confirmed: {{ confirmed }}</li>
            <li>Result: {{ result }}</li>
        </ul>

        <button @click="open()">Open complex Modal for confirm</button>

        <Modal ref="modal" v-slot="{ payload, accept, reject }" v-model:active="active">
            <h3>Complex Modal for confirm</h3>
            <p>{{ payload.text }}</p>
            <button @click="accept('yes')">YES</button>
            <button @click="accept('maybe')">MAYBE</button>
            <button @click="reject('no')">NO</button>
        </Modal>

    </section>
</template>

<script>
export default {
    data: () => ({
        active: false,
        confirmed: false,
        result: null
    }),
    methods: {
        async open() {
            try {
                this.result = await this.$refs.modal.open({ message: 'Hey ?' }, true)
                this.confirmed = true
            }
            catch(rejected) {
                this.result = rejected
                this.confirmed = false
            }
        }
    }
}
</script>
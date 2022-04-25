<template>
    <section>

        <h2>Simple Modal for confirm</h2>

        <ul>
            <li>Active: {{ active }}</li>
            <li>Confirmed: {{ confirmed }}</li>
        </ul>

        <button @click="open()">Open simple Modal for confirm</button>

        <Modal ref="modal" v-slot="{ payload, accept, reject }" v-model:active="active">
            <h3>Simple Modal for confirm</h3>
            <p>{{ payload.text }}</p>
            <button @click="accept()">YEP</button>
            <button @click="reject()">NOPE</button>
        </Modal>

    </section>
</template>

<script>
export default {
    data: () => ({
        active: false,
        confirmed: null
    }),
    methods: {
        async open() {
            this.confirmed = await this.$refs.modal.expect({ text: 'Hey ?' })
        }
    }
}
</script>
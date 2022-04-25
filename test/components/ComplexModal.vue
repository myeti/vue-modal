<template>
    <section>

        <h2>Complex Modal</h2>

        <ul>
            <li>Active: {{ active }}</li>
        </ul>

        <button @click="open()">Open complex Modal</button>

        <Modal ref="modal" v-slot="{ payload, close }" v-model:active="active">
            <h3>Complex Modal</h3>
            <form>
                <p>{{ LOREM_IPSUM }}</p>
                <input type="text" placeholder="no autofocus" v-model="payload.foo" />
                <p>{{ LOREM_IPSUM }}</p>
                <input type="text" placeholder="autofocus" autofocus />
                <p>{{ LOREM_IPSUM }}</p>
            </form>
            <button @click="close()">OK</button>
        </Modal>

    </section>
</template>

<script>
export default {
    data: () => ({
        active: true
    }),
    methods: {
        open() {
            this.$refs.modal.open({ foo: 'payload.foo' })
        }
    }
}
</script>
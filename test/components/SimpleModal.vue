<template>
    <section>

        <h2>Simple Modal</h2>

        <ul>
            <li>Active: {{ active }}</li>
        </ul>

        <button @click="open()">Open simple Modal</button>

        <Modal ref="modal" v-model:active="active">
            <h3>Simple Modal</h3>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
            <p>{{ LOREM_IPSUM }}</p>
        </Modal>

    </section>
</template>

<script>
export default {
    data: () => ({
        active: false
    }),
    methods: {
        open() {
            this.$refs.modal.open()
        }
    }
}
</script>
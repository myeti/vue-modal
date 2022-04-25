<template>
    <section>

        <h2>Simple Confirm</h2>

        <ul>
            <li>Active: {{ active }}</li>
            <li>Confirmed: {{ confirmed }}</li>
        </ul>

        <button @click="open()">Open simple Confirm</button>

        <Confirm ref="confirm" v-model:active="active" />

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
            this.confirmed = await this.$refs.confirm.open('Confirm ?', this.LOREM_IPSUM)
        }
    }
}
</script>
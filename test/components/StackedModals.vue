<template>
    <section>

        <h2>Stacked Modals</h2>

        <ul>
            <li>First active: {{ firstActive }}</li>
            <li>Second active: {{ secondActive }}</li>
        </ul>

        <button @click="openFirst()">Open first stacked Modal</button>

        <Modal ref="first" v-model:active="firstActive">
            <h3>First stacked Modal</h3>
            <form>
                <p>{{ LOREM_IPSUM }}</p>
                <input type="text" placeholder="autofocus" autofocus />
                <p>{{ LOREM_IPSUM }}</p>
            </form>
            <button @click="openSecond()">
                Toggle second stacked Modal
            </button>
        </Modal>

        <Modal ref="second" v-model:active="secondActive">
            <h3>Second stacked Modal</h3>
            <p>{{ LOREM_IPSUM }}</p>
        </Modal>

    </section>
</template>

<script>
export default {
    data: () => ({
        firstActive: false,
        secondActive: false
    }),
    methods: {
        openFirst() {
            this.$refs.first.open()
        },
        openSecond() {
            this.$refs.second.open()
        },
        onToggleFirst(open) {
            this.fistIsOpen = open
        },
        onToggleSecond(open) {
            this.secondIsOpen = open
        }
    }
}
</script>
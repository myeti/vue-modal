<template>
    <main>
        <h1>{{ name }} {{ version }}</h1>
        <SimpleModal />
        <ComplexModal />
        <SimpleModalConfirm />
        <ComplexModalConfirm />
        <StackedModals />
        <SimpleConfirm />
    </main>
</template>

<script>
import { name, version } from '../package.json'
import SimpleModal from './components/SimpleModal'
import ComplexModal from './components/ComplexModal'
import SimpleModalConfirm from './components/SimpleModalConfirm'
import ComplexModalConfirm from './components/ComplexModalConfirm'
import StackedModals from './components/StackedModals'
import SimpleConfirm from './components/SimpleConfirm'

export default {
    components: {
        SimpleModal,
        ComplexModal,
        SimpleModalConfirm,
        ComplexModalConfirm,
        StackedModals,
        SimpleConfirm
    },
    setup: () => ({
        name,
        version
    })
}
</script>

<style lang="scss">
body {
    font-family: sans-serif;

    .modal h3 {
        margin-top: 0;
    }
}
</style>
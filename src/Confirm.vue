<template>
    <Modal class="modal-confirm"
        ref="modal"
        v-slot="{ payload, accept, reject }"
        @open="$emit('open')"
        @close="$emit('close')"
        @toggle="e => $emit('toggle', e)"
        @update:active="e => $emit('update:active', e)">
        <slot :ariaIds="ariaIds">
            <strong role="header" :id="ariaIds.label">{{ payload.title }}</strong>
            <p :id="ariaIds.desc">{{ payload.text }}</p>
        </slot>
        <slot name="actions" :accept="accept" :reject="reject">
            <div class="modal-confirm_actions">
                <button @click="reject()">{{ labels.reject }}</button>
                <button @click="accept()">{{ labels.accept }}</button>
            </div>
        </slot>
    </Modal>
</template>

<script>
import Modal from './Modal'

export default {
    components: {
        Modal
    },
    props: {
        name: String,
        labels: {
            type: Object,
            default: () => ({
                accept: 'Yes',
                reject: 'No'
            })
        }
    },
    computed: {
        ariaIds() {
            return {
                label: `${this.$refs.modal.uid}_label`,
                desc: `${this.$refs.modal.uid}_desc`
            }
        }
    },
    methods: {
        open(title, text) {
            return this.$refs.modal.expect({ title, text }, { ariaIds: this.ariaIds })
        }
    }
}
</script>

<style lang="scss">
.modal-confirm {
    
    &_actions {
        padding-top: 20px;
        text-align: right;

        button {
            margin-left: 20px;
        }
    }
}
</style>
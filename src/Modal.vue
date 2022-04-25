<template>
    <Teleport :to="teleport">
        <Transition :name="transition">
            <div class="modal"
                ref="main"
                :class="{ active }"
                :role="alert ? 'alertdialog' : 'dialog'"
                tabindex="0"
                aria-modal="true"
                :aria-hidden="!active"
                :aria-labelledby="alert?.ariaIds?.label"
                :aria-describedby="alert?.ariaIds?.desc"
                v-bind="$attrs"
                v-if="active">
                <div class="modal_body" ref="body">
                    <button class="modal_close"
                        @click="close()"
                        v-if="!alert">
                        <slot name="close">
                            <img :src="CLOSE_ICON" alt="close" />
                        </slot>
                    </button>
                    <slot :uid="uid"
                        :payload="payload"
                        :close="accept"
                        :accept="accept"
                        :reject="reject" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script>
import { pushModal, dropModal } from './stack'
import CLOSE_ICON from './assets/close.svg'

export const FOCUS_PRIORITIES = [
    '[autofocus]',
    'input, select, textarea, button:not(.modal_close)',
    '[tabindex]:not([tabindex="-1"]), [href]'
]

export default {
    inheritAttrs: false,
    props: {
        teleport: {
            type: String,
            default: 'body'
        },
        transition: {
            type: String,
            default: 'modal_transition'
        }
    },
    data: () => ({
        CLOSE_ICON,
        uid: null,
        active: false,
        promise: null,
        payload: null,
        alert: null,
        initiator: null
    }),
    methods: {

        /**
         * Open modal and setup a Promise till closing (the async promise is optional but usefull for confirm/alert modal)
         * @param {*} payload data given to the slot in v-slot={ payload }
         * @param {Object|Boolean} alert alert label and desc IDs
         * @return {Promise} resolve on close()/accept() and reject on reject()
         */
        open(payload, alert) {

            // open a promise that resolve on close()/accept() and reject on reject()
            // usefull for confirm/alert modal
            return new Promise((accept, reject) => {

                // activate modal
                this.active = true
                this.payload = payload
                this.alert = alert
                this.promise = { accept, reject }

                // keep track of the initiator to give the focus back later
                this.initiator = document.activeElement

                // add to stack
                pushModal(this)

                // spread the starting event
                this.$emit('open')
                this.$emit('toggle', true)
                this.$emit('update:active', true)

                // on next rendering, focus on the first interactive element
                this.$nextTick(() => this.setInnerFocus())
            })
        },

        /**
         * Open modal and wrap promise to return boolean, simplifying the try/catch process
         * @param {*} payload see open(payload)
         * @param {Object|Boolean} alert alert label and desc IDs
         * @return {Boolean}
         */
        async expect(payload, alert = true) {
            try {
                const result = await this.open(payload, alert)
                return result ?? true
            }
            catch {
                return false
            }
        },

        /**
         * Close modal and resolve Promise without result value
         */
        close() {

            // clear data
            this.active = false
            this.promise = null
            this.payload = null
            this.alert = null

            // remove from stack
            dropModal(this)

            // spread ending event
            this.$emit('close')
            this.$emit('toggle', false)
            this.$emit('update:active', false)
        },

        /**
         * Resolve Promise (with result value) and close modal
         * @param {*} result
         */
        accept(result) {
            this.promise.accept(result)
            this.close()
        },

        /**
         * Reject Promise (with result value) and close modal
         * @param {*} result
         */
        reject(result) {
            this.promise.reject(result)
            this.close()
        },

        /**
         * Set focus on first interactive element
         * @param {Boolean} priority if true, priority to [autofocus] elements
         */
        setInnerFocus(priority = true) {
            const selectors =  priority ? FOCUS_PRIORITIES : [FOCUS_PRIORITIES.join(',')]
            const focusable = selectors.map(selector => this.$refs.body.querySelector(selector)).shift()
            if(focusable) focusable.focus()
            else this.$refs.main.focus()
        },

        /**
         * Give focus back to initiator
         */
        releaseFocus() {
            if(this.initiator) {
                this.initiator.focus()
                this.initiator = null
            }
        },

        /**
         * Keep focus inside active modal while it's open
         * @param {Event} e
         */
        onTrapFocus(e) {
            if(this.active && !this.$refs.body.contains(e.target)) {
                e.preventDefault()
                this.setInnerFocus(false)
                return false
            }
        },

        /**
         * Close active modal on ESC key
         * @param {Event} e
         */
        onEscape(e) {
            if(e.key === 'Escape' && !this.alert) {
                this.close()
            }
        }
    },
    created() {
       
        // generate unique ID for stacking purpose
        this.uid = Math.random().toString(36).slice(2)
    }
}
</script>

<style lang="scss">
.modal {
    z-index: var(--modal-zindex, 999);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    padding-top: var(--modal-spacearound, 100px);
    padding-bottom: var(--modal-spacearound, 100px);
    background: var(--modal-backdrop, rgba(0, 0, 0, .7));
    overflow: auto;

    &_body {
        position: relative;
        width: 100%;
        max-width: var(--modal-width, 650px);
        padding: var(--modal-padding, 60px);
        margin-left: auto;
        margin-right: auto;
        background: var(--modal-background, white);
        border-radius: var(--modal-radius, 4px);
        box-shadow: var(--modal-shadow, 0 4px 8px rgba(0, 0, 0, .3));
        transform-origin: top center;
    }

    &_close {
        position: absolute;
        top: var(--modal-close-margin, 16px);
        right: var(--modal-close-margin, 16px);
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        opacity: .5;
        transition: opacity 100ms ease-in-out;
        &:hover, &:focus {
            opacity: 1;
        }
    }

    &_transition  {
        &-enter-active,
        &-enter-active > .modal_body,
        &-leave-active,
        &-leave-active > .modal_body {
            transition: var(--modal-transition, all 240ms ease-in-out);
        }
        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
        &-enter-from > .modal_body {
            transform: scale(.6);
        }
        &-leave-to > .modal_body {
            opacity: 0;
            transform: scale(1.4);
        }
    }
}
</style>
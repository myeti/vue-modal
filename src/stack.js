/**
 * Stack of modals
 * @type {Array<Modal>}
 */
const stack = []

let listening = false

/**
 * Add Modal to stack
 * @param {Modal} modal 
 */
export function pushModal(modal) {
    listenEvents()
    stack.push(modal)
}

/**
 * Remove Modal from stack
 * @param {Modal} modal 
 */
export function dropModal(modal) {
    const i = stack.findIndex(m => m.uid === modal.uid)
    stack.splice(i, 1)
    releaseFocus(modal)
}

/**
 * Get the last inserted Modal
 * @returns {Modal}
 */
export function getActiveModal() {
    return stack[stack.length - 1]
}

/**
 * Close active modal on ESC key
 * @param {Event} e
 */
function onEscape(e) {
    if(e.key === 'Escape') {
        getActiveModal()?.onEscape(e)
    }
}

/**
 * Keep focus inside active modal while it's open
 * @param {Event} e
 */
function onTrapFocus(e) {
    getActiveModal()?.onTrapFocus(e)
}

/**
 * On close, give focus back to active modal or initiator
 * @param {Modal} initiator
 */
function releaseFocus(modal) {
    const active = getActiveModal()
    if(active) active.setInnerFocus()
    else modal.releaseFocus()
}

/**
 * Listen event for stack operations
 */
function listenEvents() {
    if(!listening) {
        document.addEventListener('keyup', onEscape)
        document.addEventListener('focus', onTrapFocus, true)
        listening = true
    }
}
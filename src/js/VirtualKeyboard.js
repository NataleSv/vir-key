
export class VirtualKeyboard {
    constructor(className, parentClassName) {
        this.className = className;
        this.parentClassName = parentClassName;

    }
    createElem() {
        let keyboard = document.createElement('div');
        keyboard.classList.add(this.className);
        return keyboard;
    }

    addWrapVirtualKeyboard() {
        let wrapVirtualKeyboard = document.querySelector(".wrap-virtual-keyboard");
        wrapVirtualKeyboard.append(this.createElem());

    }



}

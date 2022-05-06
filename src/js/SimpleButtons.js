export class SimpleButtons {
    constructor(value, valueShift, className) {
        this.value = value;
        this.valueShift = valueShift;
        this.className = className;
    }
    createButton() {
        let btn = document.createElement('div');
        btn.classList.add('btn');
        btn.classList.add(this.className);
        btn.innerHTML = this.value;
        return btn;
    }

}





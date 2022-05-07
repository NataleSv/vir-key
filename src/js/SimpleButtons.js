export class SimpleButtons {
    constructor(value, className, codeKey) {
        this.value = value;
        this.className = className;
        this.codeKey = codeKey;
    }
    createButton() {
        let btn = document.createElement('div');
        btn.classList.add('btn');
        btn.classList.add(this.className);
        btn.innerHTML = this.value;
        btn.id = this.codeKey;
        btn.setAttribute("data-code", this.codeKey);
        return btn;
    }

}





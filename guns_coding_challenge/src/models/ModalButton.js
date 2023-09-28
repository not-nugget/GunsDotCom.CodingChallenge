
export default class ModalButton {
    
    text;
    style;
    dismiss;

    /** Configures the buttons rendered in a modal's footer
     *  @param {String} text The text to render on the button
     *  @param {String} style The color of the button (bootstrap class)
     *  @param {Boolean} dismiss If the button will dismiss the modal when clicked */
    constructor(text, style = "btn-secondary", dismiss = false)
    {
        this.text = text;
        this.style = style;
        this.dismiss = dismiss;
    }
}
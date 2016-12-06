export default class Layout {
    id: String;
    name: String;
    visibility: Boolean;
    endless: Boolean;
    highlightDots: Boolean;
    dots: Array<any>;

    constructor(name) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.visibility = true;
        this.endless = true;
        this.highlightDots = false;
        this.dots = [];
    }

    private generateUniqueId(): String {
        let uniqueIdMask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
            uniqueId = '',
            i, letter;
        for(i = 0; i < uniqueIdMask.length; i++) {
            letter = uniqueIdMask.substr(i, 1);
            if (letter == 'x') {
                uniqueId += (Math.floor(Math.random() * 16)).toString(16);
            } else if (letter == 'y') {
                uniqueId += ( 8 + Math.floor(Math.random() * 4)).toString(16);
            } else {
                uniqueId += letter;
            }
        }
        return uniqueId;
    }
}

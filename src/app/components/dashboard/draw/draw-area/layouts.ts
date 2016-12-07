export default class Layouts {
    data: any;
    layouts: any;
    layout: any;
    dots: any;

    constructor(data: any) {
        console.log(firebase);
        // firebase.database().ref('/layouts').once('value').then((snapshot) => {
        //     console.log(snapshot.val());
        // });
        this.data = data;
        data.layouts
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    this.layout = snapshot.val();
                });
            });
    }

    push(x, y) {
        let currentLayout = this.getCurrentLayout();
        if (!currentLayout.dots) {
            currentLayout.dots = [];
        }
        currentLayout.dots.push({
            x: x,
            y: y
        });
    }

    pushAfterIndex(index, x, y) {
        this.getCurrentLayout().dots.splice(index + 1, 0, {x: x, y: y});
    }

    move(x, y, index) {
        if (index == this.getCurrentLayout().dots.length) {
            index = 0;
        }
        this.getCurrentLayout().dots[index].x = x;
        this.getCurrentLayout().dots[index].y = y;
    }

    removeDot(index) {
        this.getCurrentLayout().dots.splice(index, 1);
    }

    getCurrentLayout() {
        return this.layout;
    }

}

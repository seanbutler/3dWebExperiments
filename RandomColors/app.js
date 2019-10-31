
class WidgetFactory {

    static getCanvas(width, height) {
        let element = document.createElement('canvas')
        element.width = width
        element.height = height
        return element
    }

}

class App {
    constructor() {
        console.log("App constructor")

        // let palette = new Palette()

        this.target = WidgetFactory.getCanvas(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.target)

        let ctx = this.target.getContext('2d')
        ctx.lineWidth = "2"
        ctx.strokeStyle = "black"
        // this.ctx.fillStyle = "lightgrey"

        let circle = 360


        // let scale = [Math.ceil(window.innerWidth/circle), Math.ceil(window.innerHeight/100)]

        // for (let h = 0; h < circle; h++) {

        //     for (let j = 100; j > 0; j--) {

        //         ctx.fillStyle = `hsl(${Math.floor(h)},${Math.floor(j)}%,${50}%)`;
        //         ctx.fillRect(h * scale[0], (100-j) * scale[1], scale[0], scale[1]);
        //     }
        // }

        // ctx.translate(window.innerWidth*0.1, window.innerHeight * 0.15 )

        let size = 3
        let spread = circle/size
        // let spread = circle/size
        let palette = []

        let  H1 = Math.floor(Math.random() * circle)

        palette.push({h:H1%circle,               s:100,  l:25})      // ground is fully saturated
        palette.push({h:(H1 - spread%circle),    s:100,   l:25})      // water is generally darker as absorbes light on way down
        palette.push({h:(H1 + spread%circle),    s:100,   l:25})      // sky is generally paler as light passes trough

        palette.push({h:H1%circle,               s:100,  l:50})      // ground is fully saturated
        palette.push({h:(H1 - spread%circle),    s:100,   l:50})      // water is generally darker as absorbes light on way down
        palette.push({h:(H1 + spread%circle),    s:100,   l:50})      // sky is generally paler as light passes trough

        palette.push({h:H1%circle,               s:50,  l:50})      // ground is fully saturated
        palette.push({h:(H1 - spread%circle),    s:50,   l:50})      // water is generally darker as absorbes light on way down
        palette.push({h:(H1 + spread%circle),    s:50,   l:50})      // sky is generally paler as light passes trough

        palette.push({h:H1%circle,               s:75,  l:90})      // ground is fully saturated
        palette.push({h:(H1 - spread%circle),    s:75,   l:90})      // water is generally darker as absorbes light on way down
        palette.push({h:(H1 + spread%circle),    s:75,   l:90})      // sky is generally paler as light passes trough

        palette.forEach(function (item, index) {
            ctx.fillStyle = `hsl(${item.h}, ${item.s}%, ${item.l}%)`;
            console.log(index)
            ctx.fillRect(0, 
                            index * ( window.innerHeight/12), 
                            window.innerWidth, 
                            window.innerHeight/12);
        })

    }
}

let app = new App()





export function getTileSVG(Tile){
    
    const textSize = 22
    const textWeigth = '700'
    const textColor = Tile.colors['text'][1]

    const backgroundShapeSVG = '<rect fill=' + Tile.colors['background'][1]+ ' stroke-width="1" width="220" height="220"class="shadow"/>'
    const shapeSVG = createShapeSVG(Tile.shape, Tile.colors['shape'][1])
    const topTextSVG = createTextSVG(Tile.text[0].toUpperCase(), textSize, textWeigth, textColor, 31, 36)
    const bottomTextSVG = createTextSVG(Tile.text[1].toUpperCase(), textSize, textWeigth, textColor, 67, 65)
    const numberText = createTextSVG(Tile.number, 55 , textWeigth, Tile.colors['number'][1], 50, 50, 'Verdana')

    return createTileSVG([backgroundShapeSVG, shapeSVG, topTextSVG, bottomTextSVG, numberText])
}

const createTileSVG = (SVGlist) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220"> ${SVGlist.join("\n")} </svg>`
const createShapeSVG = (shape, color) => SHAPE_SVG[shape](color)

const SHAPE_SVG = {
    "kwadrat" : (s) => `<rect stroke="#ffffff" fill=${s} stroke-width="1" width="160" height="160" x="30" y="30" class="shadow"/>`, 
    "trojkat": (s) => `<polygon stroke="#ffffff" fill=${s} stroke-width="1" points="30 190 110 30 190 190 190 190" class="shadow"/>`, 
    "prostokat" : (s) =>`<rect stroke="#ffffff" fill=${s} stroke-width="1" class="shape shadow" width="180" height="110" x="20" y="55"/>`, 
    "kolo" : (s) => `<circle stroke="#ffffff" fill=${s} stroke-width="1" cx="110" cy="110" r="80" class="shadow"/>`,
}

var createTextSVG = (text, size, weight, color, x, y, font) => `
<text 
    stroke="white" 
    fill="${color}" 
    stroke-width="1" 
    style="font-size:${size}px;" 
    font-weight="${weight}" 
    font-family="${font}, sans-serif";
    x="50%" 
    y="${y}%" 
    dominant-baseline="middle" 
    text-anchor="middle"
>
    ${text}
</text> `

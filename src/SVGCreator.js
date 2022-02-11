export function getTileSVG(Tile){
    
    const textSize = 23
    const textColor = Tile.colors['text'][1]

    const backgroundShapeSVG = '<rect fill=' + Tile.colors['background'][1]+ ' stroke-width="1" width="220" height="220"class="shadow"/>'
    const shapeSVG = createShapeSVG(Tile.shape, Tile.colors['shape'][1])
    const topTextSVG = createTextSVG(Tile.text[0].toUpperCase(), textSize, 900, textColor, 31, 31, 'Arial', 0.5)
    const bottomTextSVG = createTextSVG(Tile.text[1].toUpperCase(), textSize, 900, textColor, 67, 71, 'Arial', 0.5)
    const numberText = createTextSVG(Tile.number, 84 , '600', Tile.colors['number'][1], 50, 53, 'Open Sans', 1)
    

    return createTileSVG([backgroundShapeSVG, shapeSVG, topTextSVG, bottomTextSVG, numberText])
}

const createTileSVG = (SVGlist) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220"> ${SVGlist.join("\n")} </svg>`
const createShapeSVG = (shape, color) => SHAPE_SVG[shape](color)

const SHAPE_SVG = {
    "kwadrat" : (s) => `<rect stroke="#ffffff" fill=${s} stroke-width="1" width="180" height="180" x="20" y="20" class="shadow"/>`, 
    "trojkat": (s) => `<polygon stroke="#ffffff" fill=${s} stroke-width="1" points="10 210 110 10 210 210 210 210" class="shadow"/>`, 
    "prostokat" : (s) =>`<rect stroke="#ffffff" fill=${s} stroke-width="1" class="shape shadow" width="200" height="130" x="10" y="45"/>`, 
    "kolo" : (s) => `<circle stroke="#ffffff" fill=${s} stroke-width="1" cx="110" cy="110" r="95" class="shadow"/>`,
}

var createTextSVG = (text, size, weight, color, x, y, font, stroke) => `
<text 
    style="font-size:${size}px;" 
    stroke="white" 
    fill="${color}" 
    stroke-width="${stroke}" 
    font-weight="${weight}" 
    font-family="${font}";
    x="50%" 
    y="${y}%" 
    dominant-baseline="middle" 
    text-anchor="middle"
>
    ${text}
</text> `
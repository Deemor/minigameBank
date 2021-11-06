const randomInt = (max) => Math.floor(Math.random() * Math.floor(max))
const sample = (array) => array[randomInt(array.length)]
const shuffleArray = (array) => array.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value)

const SHAPES = ["kwadrat", "trojkat", "prostokat", "kolo"]

const COLORABLE = ['background', 'text', 'number', 'shape']

const COLORS = {
    'czarny' :          '#000000',
    'bialy' :           '#ffffff', 
    'niebieski' :       '#0100fe',
    'czerwony' :        '#ff0000',
    'zolty' :           '#eff000',
    'pomaranczowy' :    '#FFa500',
    'zielony' :         '#018001',
    'fioletowy' :       '#80007f',
}

const QUESTIONS = {
    'kolor tla' :           (t) => t.colors['background'][0],
    'kolor tekstu' :        (t) => t.colors['text'][0],
    'kolor numeru' :        (t) => t.colors['number'][0],
    'kolor ksztaltu' :      (t) => t.colors['shape'][0],
    'napisany kolor' :      (t) => t.text[0],
    'napisany ksztalt' :    (t) => t.text[1],
    'ksztalt pod tekstem' : (t) => t.shape 
}

class tile {
    constructor(shape, number, text, colors) {
        this.shape = shape
        this.number = number
        this.text = text
        this.colors = colors
      }
  }
export function createQuestion(amount, q_amount, tab)
{
    var random = [];
    for(var i=1;i<=amount;i++)
    {
        random.push(i);
    }
    random = shuffleArray(random);
    var question = "";
    var answer = "";
    for(var i=0;i<q_amount;i++)
    {
        var q = sample(Object.keys(QUESTIONS));
        question += q + " ("+random[i]+")";
        answer += QUESTIONS[q](tab[random[i]-1][1]);
        if(i+1<q_amount)
        {
            answer+=" ";
            question+=" oraz ";
        }
    }
    return [question.toLowerCase(), answer.toLowerCase()];
}
export function createTile(tileAmount){

    const shape = sample(SHAPES)
    const number = randomInt(tileAmount) + 1

    const topText = sample(Object.keys(COLORS))
    const bottomText = sample(SHAPES)

    const colors = COLORABLE.reduce((obj, color) => {var c = sample(Object.keys(COLORS)); obj[color] = [c, COLORS[c]]; return obj}, {})
    
    var COLORS_COPY = [];
    for (const [key, value] of Object.entries(COLORS)) {
        if(key != colors['text'][0])
        {
            if(key != colors['number'][0])
            {
                COLORS_COPY[key] = value;
            }
        }
    }
    var c = sample(Object.keys(COLORS_COPY));
    colors['shape'] = [c, COLORS_COPY[c]];

    return new tile(shape, number, [topText, bottomText], colors)
}

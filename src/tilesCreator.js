const ARRANGEMENT =
[
  [1],
  [1],[2],[3],[4],[5],[3,3],[7],[4,4],[5,4],[5,5],//10
  [6,5],[6,6],[7,6],[7,7],[6,5,4],[6,5,5],[6,6,5],[6,6,6],[7,6,6],[7,7,6],//20
  [7,7,7],//21
]
export function createTiles(tab, tileAmount){
    $('#tileContainer').empty();
    var createdTiles = 0;
    var createdRows = 0;
    for(var i = 0; i<ARRANGEMENT[tileAmount].length;i++)
    {
        addRow(createdTiles, ARRANGEMENT[tileAmount][i], tab, createdRows);
        createdTiles += ARRANGEMENT[tileAmount][i];
        createdRows++;
    }
    //TUTAJ STOSUJE INNY MARGIN DLA 6 KAFELKOW
    if(tileAmount == 6)
    {
        $('#b'+String(tab[0][0])).css("margin-right", "120px");
        $('#b'+String(tab[1][0])).css("margin-right", "120px");
        $('#b'+String(tab[3][0])).css("margin-right", "120px");
        $('#b'+String(tab[4][0])).css("margin-right", "120px");
        
    }
}

function addRow(startingId, amount, tab, row)
{
    var divRow ='<div class="row justify-content-center tileRow" id="row'+ String(row) + '">' +
                '</div>';
    $('#tileContainer').append(divRow);
    for(var i=0;i<amount;i++)
    {
        // border border-4 border-success
        var divCol = `
                    <div id="b`+ String(tab[startingId + i][0]) +`" class="  align-self-center p-0 boxHack">
                        <p class="d-flex h-100 align-items-center justify-content-center font-weight-bold boxHackTextLoading">` + String(tab[startingId + i][0]) +`</p>
                    </div>
                    `
        $('#row'+String(row)).append(divCol);
    }
}
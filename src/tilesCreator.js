export function createTiles(tab, tileAmount){
    var columns = 6;
    $('#tileContainer').empty();
    var createdTiles = 0;
    var createdRows = 0;
    while(tileAmount > (columns*2)-1)
    {
        tileAmount = tileAmount - columns;
        var divRow =  '<div class="row justify-content-center" id="row'+ String(createdRows) + '">' +
                    '</div>';
        $('#tileContainer').append(divRow);

        for(var i=0;i<columns;i++)
        {
            var divCol =  '<div id="b' + String(tab[createdTiles][0]) +'" class="col-2 border border-4 border-success align-self-center p-0 m-2 boxHack" >'+
                            ' <div class="container g-0 h-100 w-100">'+
                            '   <p class="d-flex h-100 align-items-center justify-content-center font-weight-bold boxHackTextLoading">' + String(tab[createdTiles][0]) + '</p>'+
                            ' </div>'
                            '</div>';
            $('#row'+String(createdRows)).append(divCol);
            createdTiles++;
        }
        createdRows++;
    }
    if(tileAmount <= columns)
    {
        addRow(createdTiles, tileAmount, tab, createdRows);
        createdRows++;
        createdTiles = createdTiles + tileAmount;
    }else
    {
        addRow(createdTiles, tileAmount-parseInt(tileAmount/2), tab, createdRows);
        createdRows++;
        createdTiles = createdTiles + tileAmount-parseInt(tileAmount/2);
        addRow(createdTiles, parseInt(tileAmount/2), tab, createdRows);
        createdRows++;
        createdTiles = createdTiles + parseInt(tileAmount/2);
    }

}

function addRow(startingId, amount, tab, createdRows)
{
    var divRow ='<div class="row justify-content-center" id="row'+ String(createdRows) + '">' +
                '</div>';
    $('#tileContainer').append(divRow);
    for(var i=0;i<amount;i++)
    {
    var divCol =  '<div id="b' + String(tab[startingId + i][0]) +'" class="col-2 border border-4 border-success align-self-center p-0 m-2 boxHack" >'+
            ' <div class="container g-0 h-100 w-100">'+
            '   <p class="d-flex h-100 align-items-center justify-content-center font-weight-bold boxHackTextLoading">' + String(tab[startingId + i][0]) + '</p>'+
            ' </div>'
            '</div>';
    $('#row'+String(createdRows)).append(divCol);
    }
}
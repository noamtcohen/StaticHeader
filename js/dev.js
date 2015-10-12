/**
 * Created by noamc on 10/11/15.
 */
function createATd(ipsumOptions,isDiv){
    return  (isDiv?"<div style='_display: table-cell' class='cell'>":"<td>") +loremIpsum(ipsumOptions)+ (isDiv?"</div>":"</td>");
}

function createARow(colCount,ipsumOptions,isDiv,css){
    var tr=isDiv?("<div style='_display: table-row' class='"+css+" row'>"):"<tr>";

    for(var i=0;i<colCount;i++)
        tr+=createATd(ipsumOptions,isDiv);

    return tr + (isDiv?"</div>":"</tr>");
}

function generateDevTable(colCount,rowCount,headerIpsum,bodyIpSum){
    var tbl = "<table cellpadding='0' cellspacing='0'><thead>";

    tbl+=createARow(colCount,headerIpsum);

    tbl+="</thead><tbody>"

    for(var i=0;i<rowCount;i++)
        tbl+=createARow(colCount,bodyIpSum);

    tbl +="</tbody></table>"

    $("#container").append(tbl);

    console.log(tbl);
}
function generateDevDivTable(colCount,rowCount,headerIpsum,bodyIpSum){
    var tbl = "<div style='_display:table;' class='div-tbl'>";

    tbl+=createARow(colCount,headerIpsum,true,"thead");

    for(var i=0;i<rowCount;i++)
        tbl+=createARow(colCount,bodyIpSum,true,"tbody");

    tbl +="</div>"

    $("#container").append(tbl);

    //console.log(tbl);
}
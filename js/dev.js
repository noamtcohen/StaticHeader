/**
 * Created by noamc on 10/11/15.
 */
$(function(){
    generateDevTable(10,10);
});

function createATd(ipsumOptions){
    return  "<td>" +loremIpsum(ipsumOptions)+ "</td>";
}

function createARow(colCount,ipsumOptions){
    var tr="<tr>";

    for(var i=0;i<colCount;i++)
        tr+=createATd(ipsumOptions);

    return tr +"</tr>";
}

function generateDevTable(colCount,rowCount){
    var tbl = "<table cellpadding='0' cellspacing='0'><thead>";

    tbl+=createARow(colCount,{units:'words',count:2});

    tbl+="</thead><tbody>"

    for(var i=0;i<rowCount;i++)
        tbl+=createARow(colCount,{units:'sentences',count:1});

    tbl +=" </tbody></table>"

    $("#container").append(tbl);
}
"use strict";

let PhotoOrderArray = window.opener.PhotoOrder;
let FigFileName = "Porsche0" + PhotoOrderArray[2] + ".jpg";
let CurrentFig = PhotoOrderArray[2];

function PageSetup(){
    document.getElementsByTagName("img")[0].src = FigFileName;
    createEventListener();
}

function addToFavList(){
    window.opener.AddFavList();
    CloseWin();
}

function CloseWin(){
    window.close();
}

function createEventListener(){
    let CloseWinDiv = document.getElementsByTagName("p")[0];
    if (CloseWinDiv.addEventListener){
        CloseWinDiv.addEventListener("click", CloseWin, false);
    }else if(CloseWinDiv.attachEvent){
        CloseWinDiv.attachEvent("onclick", CloseWin);
    }

    varle AddFavDiv = document.getElementsByTagName("p")[1];
    if(AddFavDiv.addEventListener){
        AddFavDiv.addEventListener("click", addToFavList, false);
    }else if (AddFavDiv,attachEvent){
        AddFavDiv.attachEvent("onclick", addToFavList);
    }
}

window.onload = PageSetup();
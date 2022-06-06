"use strict";
var PhotoOrder = [1, 2, 3, 4, 5];
var AutoAdvance = setInterval(rightAdvance, 5000);
var FigureCount = 3;

var FavList =[];

function PopulateFigure(){
    var FileName;
    var CurrentFig;
    if (FigureCount ===3) {
        for (var i = 1; i<4; i++){
            FileName ="Porsche0" + PhotoOrder[i] + ".jpg"
            CurrentFig = document.getElementsByTagName("img")[i-1];
            CurrentFig.src = FileName;
        }
    }else{
        for(var i=0; i<5; i++){
            FileName="Porsche0" + PhotoOrder[i] + ".jpg";
            CurrentFig = document.getElementsByTagName("img")[i];
            CurrentFig.src = FileName;
        }
    }
}

function rightArrow(){
    clearInterval (AutoAdvance);
    rightAdvance();
}

function rightAdvance(){
    for (var i=0; i<5; i++){
        if((PhotoOrder[i] + 1) === 6){
            PhotoOrder[i] = 1;
        }else{
            PhotoOrder[i] += 1;
        }
        PopulateFigure();
    }
}

function leftArrow(){
    clearInterval(AutoAdvance);
    for (var i =0; i<5; i++) {
        if((PhotoOrder[i]-1) === 0){
            PhotoOrder[i]=5;
        }else{
            PhotoOrder[i] -= 1;
        }
        PopulateFigure();
    }
}

function AddFavList(){
    if (FavList.length<5){
        if(FavList.includes(ZoomWindow.CurrentFig)){
            alert("The picture is already in the favourite list")
        }
        else{
            FavList.push(ZoomWindow.CurrentFig);
        }
    }
    else{
        alert("Please remove at least one picture before adding this one");
    }
    DisplayFavList();
}

function DisplayFavList(){
    var favDiv = document.getElementById("Favourites");
    favDiv.innerHTML = "<div style ='margin: 5px'><p>Favourite: </p></div>";
    for (var i=0; i<FavList.length; i++){
        var FavFig = document.createElement("div");
        FavFig.style="display: inline-block; padding: 5px; text-align: center; padding-left:1.5%";
        var FavImgDiv = document.createElement("div")
        var FavImg = document.createElement("img");
        FavImg.width ="160";
        FavImg.height = "90";
        FavImg.src ="Porsche0" + FavList[i] + ".jpg";
        FavImgDiv.appendChild(FavImg);
        FavFig.appendChild(FavImgDiv);

        let removebtn = document.createElement("button");
        removebtn.innerHTML ="Remove";
        removebtn.value =i;
        removebtn.style = "margin: 5px;"
        removebtn.className = "btn btn-outline-light btn-sm";
        removebtn.addEventListener("click", removeFav, false);
        FavFig.appendChild(removebtn);
        favDiv.appendChild(FavFig);
    }
}

function removeFav(){
    var index = this.value;
    FavList.splice(index, 1);
    DisplayFavList();
}

function PreviewFive(){
    var articleE1 = document.getElementsByTagName("article")[0];
    var lastFig = document.createElement("figure");
    lastFig.id = "fig5";
    lastFig.style.zIndex = "5";
    lastFig.style.position = "absolute";
    lastFig.style.right ="45px";
    lastFig.style.top = "67px";
    var lastImg = document.createElement("img");
    lastImg.width ="240";
    lastImg.height ="135";
    lastFig.appendChild(lastImg)
    articleE1.appendChild(lastFig);
    articleE1.insertBefore(lastFig, document.getElementById("rightarrow"));

    var firstFig = lastFig.cloneNode(true);
    firstFig.id = "fig1";
    firstFig.style.right="";
    firstFig.style.left="45px";
    articleE1.insertBefore(firstFig, document.getElementById("fig2"));

    FigureCount = 5;
    var numberButton = document.querySelector("#fiveButton p");
    numberButton.innerHTML = "Show fewer image";
    if (numberButton,addEventListener){
        numberButton.removeEventListener("click", PreviewFive, false);
        numberButton.addEventListener("click", PreviewThree, false);
    }else if (numberButton.attachEvent){
    numberButton.detachEvent("onclick", PreviewFive);
    numberButton.attachEvent("onclick", PreviewThree);
    }
    document.getElementsByTagName("img")[0].src="Porsche0" + PhotoOrder[0] + ".jpg";
    document.getElementsByTagName("img")[4].src="Porsche0" + PhotoOrder[4] + ".jpg";
}

function PreviewThree(){
    var articleE1 = document.getElementsByTagName("article")[0];
    var numberButton = document.querySelector("#fiveButton p");
    FigureCount =3;
    articleE1.removeChild(document.getElementById("fig1"));
    articleE1.removeChild(document.getElementById("fig5"));
    numberButton.innerHTML = "Show more images";
    if(numberButton.addEventListener){
        numberButton.removeEventListener("click", PreviewThree,false);
        numberButton.addEventListener("click", PreviewFive, false);
    }else if (numberButton.attachEvent){
        numberButton.detachEvent("onclick", PreviewThree);
        numberButton.attachEvent("onclick", PreviewFive);
    }
}
var ZoomWindow;

function ZoomFig(){
    var ProWidth = 1000;
    var ProHeight = 600;
    var WinLeft = ((screen.width - ProWidth)/2);
    var WinTop = ((screen.height - ProHeight)/2);
    var WinOptions = "width=1000, height=600";
    WinOptions += ",left=" + WinLeft;
    WinOptions += ",top="+ WinTop;
    ZoomWindow = window.open("Zoom.html", "ZoomWin", WinOptions);
    ZoomWindow.focus();
}

function createEventListeners(){
    var leftarrow = document.getElementById("leftarrow");
    if(leftarrow.addEventListener){
        leftarrow.addEventListener("click", leftArrow, false);
    }else if (leftarrow.attachEvent){
        leftarrow.attachEvent("onclick", leftArrow);5
    }

    var rightarrow = document.getElementById("rightarrow");
    if(rightarrow.addEventListener){
        rightarrow.addEventListener("click", rightArrow, false);
    }else if (rightarrow.attachEvent){
        rightarrow.attachEvent("onclick", rightArrow);6
    }

    var MainFig = document.getElementsByTagName("img")[1];
    if(MainFig.addEventListener){
        MainFig.addEventListener("click", ZoomFig, false);
    }else if (MainFig.attachEvent){
        MainFig.attachEvent("onclick", ZoomFig);
    }


    var ShowAllButton = document.querySelector("#fiveButton p");
    if(ShowAllButton.addEventListener){
        ShowAllButton.addEventListener("click", PreviewFive, false);
    }else if(ShowAllButton.attachEvent){
        ShowAllButton.attachEvent("onclick", PreviewFive);
    }
}

function SetPage(){
    createEventListeners();
    PopulateFigure();
}

if(window.addEventListener){
    window.addEventListener("load", SetPage, false);
}else if (window.attachEvent){
    window.attachEvent("onload", SetPage);
}
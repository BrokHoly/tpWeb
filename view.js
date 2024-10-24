function updateShapeList(forme, id){
    document.getElementById('shapeList').insertAdjacentHTML('beforeend', htmlForme(forme, id))
} 

function htmlForme(forme, id){
    let htmlContent = `<li id="lirm${id}">`
    if(forme.constructor === Rectangle){ htmlContent += `<span>□</span><span>Rect` }
    else if(forme.constructor === Line){ htmlContent += `<span>/</span><span>Line` }
    else if(forme.constructor === Circle){ htmlContent += `<span>&#9711</span><span>Circle` }
    else if(forme.constructor === Polygon) { htmlContent += `<span>&#9658</span><span>Polygon (${forme.sides})` }
    htmlContent += `<button type="button" class="shapeRemover" id="burm${id}" style="background:${forme.couleur}">X</button></span>`
    htmlContent += '</li>'
    return htmlContent
}


Rectangle.prototype.paint = function(ctx) {
    var getRect = this.Getters()
    ctx.strokeStyle = getRect.color;
    ctx.lineWidth = getRect.thickness;
    ctx.beginPath();
    ctx.rect(getRect.initX, getRect.initY, getRect.finalX, getRect.finalY); // Si jamais, faut inverser ici
    ctx.stroke();
};
  
Line.prototype.paint = function(ctx) {
    var getLine = this.Getters()
    ctx.strokeStyle = getLine.color;
    ctx.lineWidth = getLine.thickness;
    ctx.beginPath();
    ctx.moveTo(getLine.initX, getLine.initY);
    ctx.lineTo(getLine.finalX, getLine.finalY);
    ctx.stroke();
};

Circle.prototype.paint = function(ctx) {
    var getCircle = this.Getters();
    ctx.strokeStyle = getCircle.color;
    ctx.lineWidth = getCircle.thickness;
    ctx.beginPath();
    ctx.arc(getCircle.initX, getCircle.initY, Math.sqrt(Math.pow(getCircle.finalX-getCircle.initX,2)+Math.pow(getCircle.finalY-getCircle.initY,2)), 0, 2 * Math.PI)
    ctx.stroke();
};

//Faire attention à la forme de mesure de l'angle.
//Les x et y d'origine du point par la distance seront ajouter dans paintPoly. Ici on calcul les coordonnées de manière absolue.
function calcCoord(centerDist,sides,corner,angle){
    return {x:(centerDist*(Math.cos(angle+((Math.PI*2)/sides)*corner))),y:(centerDist*(Math.sin(angle+((Math.PI*2)/sides)*corner)))};
}

function paintPoly(ctx,getPoly){
    //Là je dois faire autant de linestroke que de sides, en passant par chaques coins.
    //Calculer l'angle du point de départ aux point d'arrive et la distance
    ctx.beginPath() 
    for(let i=0; i<getPoly.sides+1 ; i++){
        let centerDist = Math.sqrt(Math.pow(getPoly.finalX-getPoly.initX,2)+Math.pow(getPoly.finalY-getPoly.initY,2));
        let angle = Math.atan2((getPoly.finalY-getPoly.initY),(getPoly.finalX-getPoly.initX));
        let absCoordCorner = calcCoord(centerDist,getPoly.sides, i, angle);
        if(i==0){  ctx.moveTo(absCoordCorner.x+getPoly.initX,absCoordCorner.y+getPoly.initY) }
        else  ctx.lineTo(absCoordCorner.x+getPoly.initX,absCoordCorner.y+getPoly.initY)
    }
    ctx.stroke()
    
}

Polygon.prototype.paint = function(ctx){
    var getPoly = this.Getters();
    ctx.strokeStyle = getPoly.color;
    ctx.lineWidth = getPoly.thickness;
    paintPoly(ctx,getPoly)
}

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = this.getBackgroundColor(); // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getForms().forEach(function (eltDuTableau) {
        // now fill the canvas
        eltDuTableau.paint(ctx);
    });
};
  
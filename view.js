
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
// Forme.prototype.paint = function(ctx){
//     var getForme = this.Getters()
//     ctx.strokeStyle = getForme.color;
//     ctx.lineWidth = getForme.thickness;
// }

function updateShapeList(forme, id){
    document.getElementById('shapeList').insertAdjacentHTML('beforeend', htmlForme(forme, id))
} 

function htmlForme(forme, id){
    let htmlContent = `<li id="lirm${id}">`
    if(forme.constructor === Rectangle){ htmlContent += `<span>□ Rect </span>` }
    else if(forme.constructor === Line){ htmlContent += `<span>/ Line </span>` }
    else if(forme.constructor === Circle){ htmlContent += `<span>&#9711 Circle </span>` }
    htmlContent += `<button type="button" class="btn btn-default remove" id="burm${id}" style="background:${forme.couleur}"><span class="glyphicon glyphicon-remove-sign"></span></button>`
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
    console.log(getCircle)
    ctx.strokeStyle = getCircle.color;
    ctx.lineWidth = getCircle.thickness;
    ctx.beginPath();
    ctx.arc(getCircle.initX, getCircle.initY, Math.sqrt(Math.pow(getCircle.finalX-getCircle.initX,2)+Math.pow(getCircle.finalY-getCircle.initY,2)), 0, 2 * Math.PI)
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getForms().forEach(function (eltDuTableau) {
        // now fill the canvas
        eltDuTableau.paint(ctx);
    });
};
  
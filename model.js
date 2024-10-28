class Drawing {
    constructor(){

        this.formes = new Map();
        this.backgroundColor = "#f0f0f0";
    }

    getForms(){
        return this.formes
    }

    getBackgroundColor(){
        return this.backgroundColor
    }
}


class Forme{
    constructor(startX, startY, epaisseur,couleur, lineStyle){
        this.startX = startX;
        this.startY = startY;
        this.couleur = couleur;
        this.epaisseur = epaisseur;
        this.lineStyle = lineStyle
    }

    Getters(){
        return {
            initX : this.startX,
            initY : this.startY,
            color : this.couleur,
            thickness : this.epaisseur,
            lineStyle : this.lineStyle
        }
    }
}

class Rectangle extends Forme{
    constructor(startX,startY,largeur,hauteur,epaisseur,couleur,lineStyle){
        super(startX,startY,epaisseur,couleur,lineStyle);
        this.largeur = largeur;
        this.hauteur = hauteur;
    }

    Getters(){
        return {
            initX : this.startX,
            initY : this.startY,
            finalX : this.largeur,
            finalY : this.hauteur,
            color : this.couleur,
            thickness : this.epaisseur,
            lineStyle : this.lineStyle
        }
    }
}

class Line extends Forme{
    constructor(startX,startY,endX,endY,epaisseur,couleur,lineStyle){
        super(startX,startY,epaisseur,couleur,lineStyle);
        this.endX = endX;
        this.endY = endY;
    }
    
    Getters(){
        return {
            initX : this.startX,
            initY : this.startY,
            finalX : this.endX,
            finalY : this.endY,
            color : this.couleur,
            thickness : this.epaisseur,
            lineStyle : this.lineStyle
        }
    }
}

class Circle extends Forme{
    constructor(startX,startY,endX,endY,epaisseur,couleur,lineStyle){
        super(startX,startY,epaisseur,couleur,lineStyle);
        this.endX = endX;
        this.endY = endY;
    }

    Getters(){
        return {
            initX : this.startX,
            initY : this.startY,
            finalX : this.endX,
            finalY : this.endY,
            color : this.couleur,
            thickness : this.epaisseur,
            lineStyle : this.lineStyle
        }
    }
}

class Polygon extends Forme{
    constructor(startX,startY,endX,endY,epaisseur,couleur, lineStyle, sides){
        super(startX,startY,epaisseur,couleur,lineStyle);
        this.endX = endX;
        this.endY = endY;
        this.sides = sides
    }

    Getters(){
        return {
            initX : this.startX,
            initY : this.startY,
            finalX : this.endX,
            finalY : this.endY,
            color : this.couleur,
            thickness : this.epaisseur,
            lineStyle : this.lineStyle,
            sides : this.sides
        }
    }
}


class Drawing {
    constructor(){

        this.formes = new Map();
        this.history = new Array()
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
    constructor(startX, startY, epaisseur,couleur){
        this.startX = startX;
        this.startY = startY;
        this.couleur = couleur;
        this.epaisseur = epaisseur;
    }

    Getters(){
        return {
            initX : this.startX,
            initY : this.startY,
            color : this.couleur,
            thickness : this.epaisseur
        }
    }
}

class Rectangle extends Forme{
    // Forme.call(this,couleur,epaisseur);
    constructor(startX,startY,largeur,hauteur,epaisseur,couleur){
        super(startX,startY,epaisseur,couleur);
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
        }
    }
}

class Line extends Forme{
    //Forme.call(this,couleur,epaisseur);
    constructor(startX,startY,endX,endY,epaisseur,couleur){
        super(startX,startY,epaisseur,couleur);
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
        }
    }
}

class Circle extends Forme{
    constructor(startX,startY,endX,endY,epaisseur,couleur){
        super(startX,startY,epaisseur,couleur);
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
        }
    }
}

class Polygon extends Forme{
    constructor(startX,startY,endX,endY,epaisseur,couleur, sides){
        super(startX,startY,epaisseur,couleur);
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
            sides : this.sides
        }
    }
}


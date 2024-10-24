
var editingMode = { rect: 0, line: 1, circle : 3, polygon : 4 };


function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.rect;
	this.currLineWidth = 5;
	this.currColour = document.getElementById('colour').value;
	this.currentShape = 0;
	this.context = ctx;
	this.currSides = 3;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById('butRect').onclick = ()=>{this.currEditingMode = editingMode.rect}
	document.getElementById('butLine').onclick = ()=>{this.currEditingMode = editingMode.line}
	document.getElementById('butCircle').onclick = ()=>{this.currEditingMode = editingMode.circle}
	document.getElementById('butPoly').onclick = ()=>{this.currEditingMode = editingMode.polygon}
	document.getElementById('spinnerWidth').onchange = (e)=>{this.currLineWidth = e.target.value}
	document.getElementById('colour').onchange = (e)=>{this.currColour = e.target.value}
	document.getElementById('polySides').onchange = (e)=>{this.currSides = e.target.value}


	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(dnd) {

	}.bind(this)


	this.onInteractionUpdate = function(dnd) {
		if(this.currEditingMode == editingMode.rect) {
			this.currentShape = new Rectangle(dnd.basex,dnd.basey,dnd.finx - dnd.basex,dnd.finy - dnd.basey,this.currLineWidth,this.currColour);
		}
		if(this.currEditingMode == editingMode.line){
			this.currentShape = new Line(dnd.basex,dnd.basey,dnd.finx,dnd.finy,this.currLineWidth,this.currColour);
		}
		if(this.currEditingMode == editingMode.circle){
			this.currentShape = new Circle(dnd.basex,dnd.basey,dnd.finx,dnd.finy,this.currLineWidth,this.currColour);
		}
		if(this.currEditingMode == editingMode.polygon){
			this.currentShape = new Polygon(dnd.basex,dnd.basey,dnd.finx,dnd.finy,this.currLineWidth,this.currColour,this.currSides);
		}
		drawing.paint(ctx,canvas)
		this.currentShape.paint(ctx)
	}.bind(this)


	function generateId(){
		return Date.now()
	}

	this.onInteractionEnd = function(dnd) {
		var shapeId = generateId()
		drawing.formes.set(shapeId,this.currentShape)
		drawing.paint(ctx,canvas)
		updateShapeList(this.currentShape,shapeId)
		document.getElementById(`burm${shapeId}`).onclick = (e) => removeShape(drawing,shapeId,ctx,canvas) //e.currentTarget.id.substring(4)
	}.bind(this)
};


function removeShape(drawing, id, ctx, canvas){
	drawing.formes.delete(id)
	document.getElementById(`lirm${id}`).remove()
	drawing.paint(ctx,canvas)
}



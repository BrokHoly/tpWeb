
var editingMode = { rect: 0, line: 1, circle : 2, polygon : 3 };
var lineDashStyles = { solid:[], dashed :[6,2], dotted:[1,1], dashdot:[10,3,3,3]};


function applyTickness(arr, thickness){
	newarr = arr.slice();
	newarr.forEach((value, index) => {
		console.log(value*thickness)
		newarr[index] = value*thickness;
	})
	console.log(newarr)
	return newarr
}

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.rect;
	this.currLineWidth = 5;
	this.currColour = document.getElementById('colour').value;
	this.currentShape = 0;
	this.context = ctx;
	this.currSides = 3;
	this.lineStyle = lineDashStyles.solid

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById('butRect').onclick = ()=>{this.currEditingMode = editingMode.rect}
	document.getElementById('butLine').onclick = ()=>{this.currEditingMode = editingMode.line}
	document.getElementById('butCircle').onclick = ()=>{this.currEditingMode = editingMode.circle}
	document.getElementById('butPoly').onclick = ()=>{this.currEditingMode = editingMode.polygon}
	document.getElementById('polySides').onchange = (e)=>{this.currSides = e.target.value}
	document.getElementById('backgroundColor').onchange = (e)=>{drawing.backgroundColor = e.target.value; drawing.paint(ctx)}

	document.getElementById('lineStyle').onchange = (e)=> {
		if (e.target.value == 'solid'){this.lineStyle = applyTickness(lineDashStyles.solid,this.currLineWidth)}
		else if (e.target.value == 'dashed') {this.lineStyle = applyTickness(lineDashStyles.dashed,this.currLineWidth); console.log(e.target.value)}
		else if (e.target.value == 'dotted') {this.lineStyle = applyTickness(lineDashStyles.dotted,this.currLineWidth); console.log(e.target.value)}
		else if (e.target.value == 'dashdot') {this.lineStyle = lineDashStyles.dashdot; console.log(e.target.value)}
	}
	document.getElementById('spinnerWidth').onchange = (e)=>{this.currLineWidth = e.target.value}
	document.getElementById('colour').onchange = (e)=>{this.currColour = e.target.value}

	const list = document.getElementById('shapeList');
	document.getElementById('clearButton').onclick = ()=>{ if(confirm("Do you realy want to delete all your drawing ?")) drawing.clear(ctx,list); }
	document.getElementById('undoButton').onclick = ()=>{ drawing.undo(ctx) }
	document.getElementById('redoButton').onclick = ()=>{ drawing.redo(ctx) }


	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(dnd) {

	}.bind(this)


	this.onInteractionUpdate = function(dnd) {
		if(this.currEditingMode == editingMode.rect) {
			// console.log(this.lineStyle)
			this.currentShape = new Rectangle(dnd.basex,dnd.basey,dnd.finx - dnd.basex,dnd.finy - dnd.basey,this.currLineWidth,this.currColour, this.lineStyle);
		}
		if(this.currEditingMode == editingMode.line){
			this.currentShape = new Line(dnd.basex,dnd.basey,dnd.finx,dnd.finy,this.currLineWidth,this.currColour,this.lineStyle);
		}
		if(this.currEditingMode == editingMode.circle){
			this.currentShape = new Circle(dnd.basex,dnd.basey,dnd.finx,dnd.finy,this.currLineWidth,this.currColour,this.lineStyle);
		}
		if(this.currEditingMode == editingMode.polygon){
			this.currentShape = new Polygon(dnd.basex,dnd.basey,dnd.finx,dnd.finy,this.currLineWidth,this.currColour,this.lineStyle,this.currSides);
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
	// drawing.historyMap.set(id,drawing.formes.get(id))
	// drawing.historyIdArray.push(id)
	drawing.formes.delete(id)
	document.getElementById(`lirm${id}`).remove()
	drawing.paint(ctx,canvas)
}



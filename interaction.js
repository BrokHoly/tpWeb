function DnD(canvas, interactor) {

  this.basex = 0;
  this.basey = 0;
  this.finx = 0;
  this.finy = 0;
  this.hasBeenPressed = false;
  this.interactor = interactor

	// Developper les 3 fonctions gérant les événements
  this.click=function(evt){
    res = getMousePosition(canvas,evt)
    this.basex = res.x;
    this.basey = res.y;
    this.hasBeenPressed = true;
    this.interactor.onInteractionStart(this);
  }.bind(this);

  this.drag=function(evt){
    if(this.hasBeenPressed){
      res = getMousePosition(canvas,evt)
      this.finx = res.x;
      this.finy = res.y;
      this.interactor.onInteractionUpdate(this);
    }
  }.bind(this);

  this.drop=function(evt){
    res = getMousePosition(canvas,evt)
    this.finx = res.x;
    this.finy = res.y;
    this.hasBeenPressed = false;
    this.interactor.onInteractionEnd(this);
  }.bind(this);


  // Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.click, false);
  canvas.addEventListener('mousemove', this.drag, false);
  canvas.addEventListener('mouseup',this.drop, false);
	
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};




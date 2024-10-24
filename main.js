
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width=800
canvas.height=600

// Code temporaire pour tester l'affiche de la vue
// var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
// rec.paint(ctx);
// var ligne = new Line(10, 20, 50, 100, 5, '#00CCC0');
// ligne.paint(ctx);
// var rec = new Rectangle(100,100,100,70,5, '#00CCC0');
// rec.paint(ctx);
// var circle = new Circle(100,100,100,70,5,'#009900')
// circle.paint(ctx)

// Code final à utiliser pour manipuler Pencil.
var drawing = new Drawing();
var pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);


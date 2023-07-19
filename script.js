
// Load Event fires when the whole page has been, Loaded , Including all dependent resources such as stylesheet and images
window.addEventListener('load',function (){

    // canvas setup
    const canvas = document.getElementById('canvas1');

    const ctx = canvas.getContext('2d');

     /*a built-in object that contains all methods and properties that allows to draw and animate colors,shapes
     and other graphics on HTML Canvas*/

    canvas.width = 1500;
    canvas.height = 500;

    /* JavaScript is a prototype based Object-Oriented,which means it doesn't have classes , It has prototypes. We used
    Syntactical Sugar to mimics classes Like Java Classes */

    class InputHandler {
        // This class will keep track of specified user inputs
    }

    class Projectile {
        // This class will handle player lasers
    }

    class Particle {
        // This class will deal with falling screws, corks and bolts that from damage enemies
    }

    class Player {
        // This class will control the main character
    }

    class Enemy {
        // This class will be the main blueprint handling many different enemy types
    }

    class Layer {
        // This class will handle individual background layers
    }

    class Background {
        // This Class will pull all layers objects together to animate the entire game
    }

    class UI {
        // This class will draw score , timer and other information that needs to be displayed for the user
    }

    class Game {
        // This class will be the Brain of the entire Project
    }
});


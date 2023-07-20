
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

        constructor(game) {

            /* Objects in JavaScript are so-called reference data types , which means that unlike primitive data types,
               they are dynamic in nature.

               I'm just creating a reference that is pointing to the place in memory that stores the main game object.
               So, When the values and properties on te main game object get update, those changes will be immediately
               visible from this game reference inside this player class.

             */

            //Convert that game object into Player class property using "this" keyword

            this.game = game;
            this.width = 120; // Player Width
            this.height = 190; // Player height

            this.x = 20; // Player horizontal position
            this.y = 100; // Player vertical position

            this.speedY = 0; // Player vertical speed
        }
        update(){

            // This method will update player movements

            this.y += this.speedY; // This will increase vertical y position on the player by speed

        }

        /* This "draw(context)" will specify which canvas element we want to draw , cause will multiple layers  */
        draw(context){
            // This method will draw graphics representing the player

            /* This context.fillRect will draw simple rectangle by using given info */
            context.fillRect(this.x, this.y, this.width, this.height)
        }
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

        /* providing width and height of canvas as arguments to constructor */
        constructor(width,height) {

            /* This will make sure width and height of the game matches size of the canvas element */

            this.width = width; //Convert them in to class properties
            this.height = height; // Convert them in to class properties

            /* Reason that I'm doing this one that When I instantiate the game class , I want it to automatically create
               instance of player class.

               The new keyword is a special command in JavaScript. It will look for class "Player" name  it will run
               Its constructor to create one instance of it based on the blueprint inside.
             */
            this.player = new Player(this); // "this" keyword refers to this entire game object

        }
        update(){
            this.player.update(); // This will call the update method of Player Class
        }

        draw(context){
            this.player.draw(context); // This will call the draw method of Player Class
        }
    }

    /* Creating and saving instance of a game class stores in variable.This new keyword triggers Game class Constructor*/

    const game = new Game(canvas.width , canvas.height);
});


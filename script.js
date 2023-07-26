
// Load Event fires when the whole page has been, Loaded , Including all dependent resources such as stylesheet and images
window.addEventListener('load',function (){

    // canvas setup
    const canvas = document.getElementById('canvas1');

    const ctx = canvas.getContext('2d');

     /** a built-in object that contains all methods and properties that allows to draw and animate colors,shapes
     and other graphics on HTML Canvas*/

    canvas.width = 1500;
    canvas.height = 500;

    /** JavaScript is a prototype based Object-Oriented,which means it doesn't have classes , It has prototypes. We used
    Syntactical Sugar to mimics classes Like Java Classes */

    class InputHandler {

        // This class will keep track of specified user inputs
        constructor(game) {

            /** Taking game as an argument convert it into InputHandler class property */

            this.game=game;

            /** When we create an instance of class, all the code inside class constructor gets executed . Taking that
            advantage Apply eventListeners from here */

            /** A special feature of arrow function is that "this" keyword inside arrow functions always represents the
            object which the arrow function is defined.  */

            window.addEventListener('keydown',e => {

                /** Callback function of eventListener has an auto generated argument that contains all kinds of additional
                details about the event that just happened.

                Whatever we put here(* as keyboardEvent) will become a custom variable name containing a special object
                with additional information about the key down event tha just happened.

                I will save it in a variable I call "e" and console.log it

                 */

                if ((   (e.key === 'ArrowUp') ||
                        (e.key === 'ArrowDown')


                ) && this.game.keys.indexOf(e.key) === -1){

                    this.game.keys.push(e.key); // Pushing that "key"(the pressing key) into an Array

                }

                // Calling a specific property called key

                console.log(this.game.keys); // This will console.log if "ArrowUp" key correctly added


            });

            window.addEventListener('keyup', e=>{

                /** When we release the key, I want to remove it from the array. I do that by checking if the array
                contains that key.  */

                /** The .indexOf() method returns the first index at which a given element can be found in the array,Or
                it returns -1 if the element is not present.   */

                if (this.game.keys.indexOf(e.key) > -1){

                    this.game.keys.splice(this.game.keys.indexOf(e.key) ,1);

                    /** The .splice() method changes the contents of an array by removing or replacing existing elements.
                    This method needs at least two arguments.

                        1. The index at which we want to start changing the array(So it will be that key that we want
                     to remove )

                        2. Delete Count (An integer indicating the number of elements in the array we want to remove
                     from that starting index )

                      */

                }
                console.log(this.game.keys); // This will console.log if "ArrowUp" key correctly removed
            });
        }
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

            /** Objects in JavaScript are so-called reference data types , which means that unlike primitive data types,
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

            /** Instead of hardcoded -1 and +1 , Maybe player speed is dynamic and player can speed up during a power up.
            For that purpose better to save max speed in variable like below */

            this.maxSpeed = 2;
        }
        update(){

            /** The .includes() method determines whether an array includes a certain value among its entries, returning
            true or false as appropriate.   */

            // If this line returns "true", Player will move to Up
            if(this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;

            // If this line returns "true", Player will move to Down

            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;

            // This will make sure Player will stop moving when no keys pressed

            else this.speedY = 0;

            // This method will update player movements

            this.y += this.speedY; // This will increase vertical y position on the player by speed

        }

        /** This "draw(context)" will specify which canvas element we want to draw , cause will multiple layers  */
        draw(context){
            // This method will draw graphics representing the player

            /** This context.fillRect will draw simple rectangle by using given info */
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

        /** providing width and height of canvas as arguments to constructor */
        constructor(width,height) {

            /** This will make sure width and height of the game matches size of the canvas element */

            this.width = width; //Convert them in to class properties
            this.height = height; // Convert them in to class properties

            /** Reason that I'm doing this one that When I instantiate the game class , I want it to automatically create
               instance of player class.

               The new keyword is a special command in JavaScript. It will look for class "Player" name  it will run
               Its constructor to create one instance of it based on the blueprint inside.
             */
            this.player = new Player(this); // "this" keyword refers to this entire game object

            /** So as I did with the "player", I want my InputHandler class to be instantiated automatically.
             So here inside the "Game" class constructor, I create a property. I set it to the "new InputHandler()" and
             its constructor expects "game" as an argument , So same as I did it with the Player , I pass it this referring
             to "this" this entire "game" class. So now if I create a "Game" object it will automatically create "Player"
             object and "InputHandler" object.

             As I call the "new" keyword on-line  135 JavaScript will jump to line 22 and it will run "InputHandler"
             class constructor, Which will, among other things apply this key "down" eventListener that's console.log
             that is pressed.
             */



            this.input = new InputHandler(this);

            /** Below array's job will be to keep track of all keys that are currently active, that are currently
            being pressed "down".  */

            this.keys = [];

        }
        update(){
            this.player.update(); // This will call the update method of Player Class
        }

        draw(context){
            this.player.draw(context); // This will call the draw method of Player Class
        }
    }

    /** Creating and saving instance of a game class stores in variable.This new keyword triggers Game class Constructor*/

    const game = new Game(canvas.width , canvas.height);

    // Animation Loop - Thi Animation loop tha will run, Update and draw methods over and over 60 times per Second

    /** Creating a custom function called animate() */
    function animate() {

        ctx.clearRect(0,0, canvas.width ,canvas.height); // This will fix that by deleting all kind of drawing between each animation frame

        game.update(); /** Taking the instance of game class - Associated update method */

        game.draw(ctx); /** This means "ctx" variable will be passed here,and it will get passed along to draw method on
         player object of Game class - Caused now the player know where want to draw it  */

        /** After we called update and draw methods, we want to trigger the next animation frame. So I call built in animation frame*/

        requestAnimationFrame(animate); // Passing animate the name of its parent function to create an endless animation loop

        /** requestAnimationFrame(); tells the browser that we wish to perform animation, and it requests that the browser
         calls a specified function to update an animation before the next repaint.

         requestAnimationFrame() - has two special features

                1. It adjusts the user's screen refresh rate
                2. It also auto generates timestamp argument and passes that as an argument to its callback function

         */

    }
    animate();
});


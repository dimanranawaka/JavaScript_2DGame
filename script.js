
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

                }else if (e.key === ' '){

                    // This will make sure when the user pressed "SpaceBar" calls the "shootTop()" method

                    this.game.player.shootTop();

                }

                // Calling a specific property called key

                /*console.log(this.game.keys); // This will console.log if "ArrowUp" key correctly added*/


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
                // console.log(this.game.keys); // This will console.log if "ArrowUp" key correctly removed
            });
        }
    }

    class Projectile {
        // This class will handle player lasers

        /** Constructor will need three arguments

         1.The main "game" object so that this class has access to game properties when it needs them

         2. Starting x and y coordinates - those needs to be dynamic passed as arguments from here because
         starting coordinates of each projectile will depend on player's current position

         */

        constructor(game,x,y) {

            this.game = game;

            this.x = x;

            this.y = y;

            this.width = 10;

            this.height = 3;

            this.speed = 3;

            /** Will also need "markedForDeletion" property which will be initially set to false */

            this.markedForDeletion = false;
        }

        /** "update()" method will increase horizontal x coordinate from line 108 by speed from line 116 */

        update(){

            this.x += this.speed;

            /** Horizontal x coordinate of this projectile object is more than width of the game
             meaning it has move across the game area and this projectile object can be deleted  */

            // Make sure "Player" lasers have limited range

            if(this.x > this.game.width * 0.8) this.markedForDeletion = true;

        }

        /** Will also need a simple draw method that will take context as an argument */

        draw(context){

            context.fillStyle = 'red';

            // This will represent the projectile(laser)

            context.fillRect(this.x, this.y, this.width, this.height);


        }

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

            /** I will create an array to hold all the currently active projectile objects */

            this.projectiles = [];
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

            /** Handles Projectiles

                I take  "this.projectiles" array and forEach element in that array I call update method which was
             defined on-line : 131.

             I want to remove those elements from projectiles array and I will do it using JavaScript filter method.

             The .filter() - method creates a new array with all element that pass the test implemented by the provided
             function.

             So, here I'm taking projectiles array I call filter on it and the test is that I want all elements to
             have "markedForDeletion()" set to false.

              */

            this.projectiles.forEach(projectile =>{
                projectile.update();
            });

            //This will filter out and remove all elements with "markedForDeletion" Properties set to true.

            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }

        /** This "draw(context)" will specify which canvas element we want to draw , cause will multiple layers  */
        draw(context){
            // This method will draw graphics representing the player

            context.fillStyle = 'black';

            /** This context.fillRect will draw simple rectangle by using given info */
            context.fillRect(this.x, this.y, this.width, this.height);

            /** I will also call "forEach()" on all projectiles from inside the "draw()" method and triggers "draw()"
             method from line:146 on each one */

            this.projectiles.forEach(projectile =>{
                projectile.draw(context);
            });

        }

        /** Adding projectiles to the Game by creating a special custom method on player class.
         Player will have two different attack methods. First I will create basic one. Which is "shootTop()" method.

         When "shootTop()" method is triggered it will take "this.projectiles" array(on-line:209) and push new Projectile()
         inside using the class which is defined on-line:92.

           */

        shootTop(){
            if (this.game.ammo >0 ){

                this.projectiles.push(new Projectile(this.game , this.x+80, this.y));

                /*// This is for checking the method on-line:238

                console.log(this.projectiles);*/

                this.game.ammo--; // This will reduce the ammo of that the player has when he used 'em each time

            }
        }
    }

    class Enemy {
        // This class will be the main blueprint handling many different enemy types

        /** Enemy class will contain the main blueprint the properties and methods shared between all enemy types.

         We will then extend this class into multiple small subclasses. Each enemy type will have a separate child that
         inherits from this main "Enemy" parent class.

         All enemies will need access to the main "Game" object(game). - "this.game = game;"

         All enemies will also have the same start in horizontal x coordinate. - "this.x = this.game.width;"
         They will go from right to left, starting just behind the right edge of game area.

         Horizontal speed("this.speedX = Math.random()") will be a random number between -1.5 and 0.5 because I want them to
         move in minus direction to left horizontal X axis.

         "markedForDeletion" will be set to false initially.

         "update()" method will adjust horizontal X coordinate by the amount of speedX value for each animation frame.
         Moving enemies from right to left eye check if enemy moved completely off-screen all the way behind the left of
         game area. So if x coordinate of the enemy plus(+) its width is less than zero, we will set its "markedForDeletion"
         property to true.

         */

        constructor(game) {

            this.game = game;

            this.x = this.game.width;

            this.speedX = Math.random() * -1.5 - 0.5;

            this.markedForDeletion = false;
        }

        update(){
            this.x += this.speedX;

            if(this.x + this.width < 0) this.markedForDeletion = true;
        }

        draw(context){

            context.fillStyle = 'red';

            context.fillRect(this.x , this.y , this.width, this.height );

        }
    }

    class Angler1 extends Enemy{

        /** Angler1 is the child of parent enemy class, and it has access to its methods such as "update()" and "draw()"
         as well as other properties. If I call property or a method on angler class and JavaScript can find on angler it will
         automatically travel to the parent enemy class, and it will look for it there.

         Reason why I used Inheritance here to reduce code repetition.

         * */

        constructor(game) {

            /** This class will have it own constructor because some properties be specific only to  this enemy class only.

             If I don't declare "constructor()" of "Angler1" class at all, It will automatically use "constructor" from
             the class it Inherits (from line:307).

             If I just declare constructor on "Angler1" it will completely override class constructor and Parent class
             constructor would be ignored . So I have to use special syntax to kind of merge them.

             I want first to run Parent class "constructor()" and then the others. I do it by calling "super();".
             Which refers to Parent class "constructor()".


             * */

            super(game);

            this.width = 228 * 0.2;

            this.height = 169 * 0.2;

            this.y = Math.random() *(this.game.height * 0.9 - this.height );

        }

    }

    class Layer {
        // This class will handle individual background layers
    }

    class Background {
        // This Class will pull all layers objects together to animate the entire game
    }

    class UI {
        // This class will draw score , timer and other information that needs to be displayed for the user
        constructor(game) {
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Helvetica';
            this.color = 'white';
        }

        draw(context){
            context.fillStyle = this.color;
            for (let i = 0; i < this.game.ammo; i++) {
                context.fillRect(20+6 * i,50,3,20);
            }
        }
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

            /** I want to player has limited ammo */

            this.ammo = 20;

            /** To trigger periodic event in our game I need two helper variables.

                1. One will be timer that go between zero and some kind of predefined limit,
                Each time it reaches that limit, It will trigger some kind of event and ot will reset back to zero to
                count again for the next loop.

                2. Second helper variable will be that limit , interval value that timer needs reach.

             I will also introduce some hard limit. Because I want the ammo to automatically refill only to some value,
             not endlessly.

              */

            this.enemies = []; // This will hold active enemy obejects

            this.enemyTimer = 0;

            this.enemyInterval = 1000;

            this.maxAmmo = 50; // Mentioned hard limit (line:349)

            this.ammoTimer = 0; // 1st helper variable

            this.ammoInterval = 500; // 2nd helper variable

            this.ui = new UI(this);

            this.gameOver = false;


        }
        update(deltaTime){
            this.player.update(); // This will call the update method of Player Class

            /**

             Inside "update()" method of Game class I will use "ammoTimer" and "ammoInterval" helper variables
             and also "deltaTime" trigger the periodic event that refill ammo every 500ms.

             I say if "this.ammoTimer" more than(>) "this.ammoInterval" and inside of it I will also check if "this.ammo" is
             less than(<) only then I will increase "this.ammo" by one(++).

                Then I reset "this.ammoTimer = 0", So that it can count again.

             else - keep increasing "this.ammoTimer" by "deltaTime".

             Lastly, I will pass the calculated "deltaTime"(on-line:431) into "update()" method on Game class(on-line:362).
             The reason of doing that passing to make sure "update()" method expects that value on-line:362 and that "deltaTime"
             value will get passed along on-line:389.
               */

            if(this.ammoTimer > this.ammoInterval){

                if(this.ammo < this.maxAmmo) this.ammo++;

                this.ammoTimer = 0;

            }else{
                this.ammoTimer += deltaTime;
            }

            this.enemies.forEach(enemy =>{

                enemy.update();
            });

            this.enemies = this.enemies.filter( enemy => !enemy.markedForDeletion); // For deletion of enemies

            if(this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }

        }

        draw(context){
            this.player.draw(context); // This will call the draw method of Player Class
            this.ui.draw(context);

            this.enemies.forEach(enemy =>{

                /** I will cycle through all enemies here. And calls their "draw()" and pass the context argument */

                enemy.draw(context);

            });
        }
        /** I will add Special method on the "Game" class called "addEnemy()".

         Everytime this method is called , It will push one new enemy object inside enemies array.
         Instead of calling parent enemy class I'm calling the child "Angler1" here. "Angler1"
         class expects "game" as an argument I passed it by using "this" keyword.

         Then I want call an enemy in a specific interval. Can use same the technique we to recharge ammo.
         I want two helper variables.

                1. "this.enemyTimer" - a timer that will count between zero and an Interval.
                2. "this.enemyInterval" - want to add new enemy into the game every second

         * */
        addEnemy(){
            this.enemies.push(new Angler1(this));
        }
    }

    /** Creating and saving instance of a game class stores in variable.This new keyword triggers Game class Constructor*/

    const game = new Game(canvas.width , canvas.height);

    /** When we use all 30 projectiles, We completely run out of ammo. I want it slowly recharge it over time.
     To do that, I wanted to run a periodic event in our code base, and I want to be able to measure time in milliseconds
     and say, for example , every 500ms automatically recharge one ammo.

     To do that , I have created a variable called "lastTime" on-line: 362 and its job will be to store value of time stamp
     from the previous animation loop. So that we can compare it against the value of timestamp from this animation loop.

     This difference will give us deltaTime ,

     deltaTime - is the difference in ms between the timestamp from this loop and the timestamp from the previous loop.

     Where is this timeStamp comes from?

        "requestAnimationFrame()" - has a special feature. It automatically passes a timeStamp as an argument to the function
        calls. In our case , animate I can use it simply by giving it a variable name here(line:373).

     So, On-Line: 382 we calculated "deltaTime" , As it is we know how many milliseconds it takes for our computer to render
     animation frame to run one animation loop.

     Then, I will pass it to "update()" method (On-Line : 391) and  we can use that value to run periodic events in our
     game or to measure game time.

       */

    let lastTime = 0;

    // Animation Loop - Thi Animation loop tha will run, Update and draw methods over and over 60 times per Second

    /** Creating a custom function called animate() */
    function animate(timeStamp) {

        const deltaTime = timeStamp - lastTime;

        /*console.log(deltaTime);*/

        ctx.clearRect(0,0, canvas.width ,canvas.height); // This will fix that by deleting all kind of drawing between each animation frame

        game.update(deltaTime); /** Taking the instance of game class - Associated update method */

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
    animate(0);
});


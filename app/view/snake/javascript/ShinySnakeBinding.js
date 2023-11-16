/*!
 * Shiny bindings for the Lightweight Snake Game.
 * 
 * Written by Sabrina J. Ward
 * 
 * This was designed to be a small leightweight game to put in `waiter` loading
 * screens to alleviate boredom during long calculation and data loading times.
 *
 */

(function() {
  
  var ShinySnakeBinding = new Shiny.InputBinding();
  
  $.extend(
    ShinySnakeBinding,
    {
      find: function(scope) {
        // find all instances of class SnakeGame
        return $(scope).find(".ShinySnake");
      },
      
      // return the ID of the DOM element
      getId: function(el) {
        return el.id;
      },

      initialize: function(el){
        // Setup the initial game state, attach it to this element as data.
        var game = new SnakeGame(el.id);
        game.loop();
        $(el).data("snake-game", game);
      },

      getValue: function(el) {
        //...
      },

      subscribe: function(el, callback) {

         // $(el).on('...', function(event){
    //
      //      callback();
        //  });
      }
    }
  )
  
  Shiny.inputBindings.register(ShinySnakeBinding);
})();


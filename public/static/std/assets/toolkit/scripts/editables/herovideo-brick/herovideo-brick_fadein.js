/**
 * org-block-hero_fadein.js
 *
 * @author Nirusu | nils hendriks <info@nirusu.me>
 * @version 0.0.1
 * @date 13 Jan 2022 13:47:58
 * @file Manages the fade in effect on Hero Block by setting a class on div
 * @uses this function is run on the page by calling it: setFadeOnHeroBlock.init();
 * @path web/static/std/assets/toolkit/scripts/components/org-block-hero/org-block-hero_fadein.js
 *
 * @todo [check if window object has this function then no need to load script again]
 */

var setFadeOnHeroBlock = {

  init: function() {
    // get the blocks with data-hasfadein attr
    var heroBlocks = document.querySelectorAll(".sh-org-block[data-hasfadein]");
    // number of found blocks
    var numHeroes = heroBlocks.length;
    // console.log(numHeroes);
    if(numHeroes > 0) {
      // do for each block
      heroBlocks.forEach(function(heroBlock) {
        heroBlock.classList.add("--fade-in");
      });
    }
  }
}
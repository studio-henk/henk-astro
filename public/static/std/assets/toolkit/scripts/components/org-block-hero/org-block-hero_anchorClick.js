/**
 * org-block-hero_anchorClick.js
 *
 * Manages the click on Hero Block and scrolling to anchor link of next block.
 *
 * @author Nirusu | nils hendriks <info@nirusu.me>
 * @version 0.0.1
 * @date 31 Aug 2021 11:51:44
 * @update 13 Jan 2022 13:47:58
 *
 * @uses this function is run by onclick="heroClick.init()" handler on hero block
 * @path web/static/std/assets/toolkit/scripts/components/org-block-hero/org-block-hero_anchorClick.js
 *
 * @todo [check if window object has this function then no need to load script again]
 */

const heroClick = {

  init: function() {
      event.preventDefault();
      console.log(event.currentTarget);
      var thisLink = event.currentTarget;
      var thisLinkTarget = thisLink.getAttribute('href');
      var target = document.querySelector(thisLinkTarget);
      // console.log(thisLinkTarget);
      console.log(target);
      $('html, body').animate({
        scrollTop: target.offsetTop
      }, 1000, function() {
        console.log('callback func');
      });

  }

}
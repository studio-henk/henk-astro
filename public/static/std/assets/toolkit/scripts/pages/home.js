$(function() {

    var images = [
        'intro_butterflytablemountainsetting.jpg',
        'intro_butterflytablezwartoval.jpg',
        'intro_butterflytablezwartzwartkitchen.jpg',
        'intro_butterflyzwartkitchen.jpg',
        'intro_coloungechair.jpg',
        'intro_coloungesofa25seater.jpg',
        'intro_coloungesofa35seater.jpg',
        'intro_giuseppesofa35seater.jpg',
        'intro_modularcabinetblackframeblackoak.jpg',
        'intro_modularcabinetblackframenatureloak.jpg',
        'intro_modularcabinetwhiteframenatureloak.jpg',
        'intro_slimcozwartovaal.jpg',
        'intro_slimxtafelwitberg.jpg',
        'intro_slimxtypewitkitchen.jpg',
        'intro_slimxtypezwartkitchen.jpg',
        'intro_slimxzwartberg.jpg'
    ];
    $( "#cta-block__image--src" ).attr( 'src', '/themes/studio-henk-v2/dist/assets/toolkit/images/home/intro/' + images[Math.floor(Math.random() * images.length)] );

});
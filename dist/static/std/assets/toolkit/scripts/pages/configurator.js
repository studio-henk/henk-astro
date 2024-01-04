$(function() {

    "use strict";

    var CHOOSECARD = '.choose-cards__item',
        ACTIVE_CHOOSECARD = 'choose-cards__active',
        SELECTOR_BAR = '.selector__bar';

    // CONFIGURATOR //

    var parts = ["rectangular", "standard", "lak", "butterfly", "black"];

    function setImageSource(imageId, imageSrc) {
        $('#' + imageId).attr('src', imageSrc);
    }

    $( CHOOSECARD ).on('click', onClick);

    function onClick(event) {
        var $configValue = this.getAttribute('data-configurator'),
            $configID = this.getAttribute('data-configuratorid'),
            stripedTargetgroup = this.getAttribute('data-targetgroup').split('_'),
            $cardValue = this.getAttribute('data-value');

        if ( $(event.target).hasClass('icon-info') || $(event.target).parent().hasClass('icon-info') ) {
            return false;
        }

        // CHANGE VALUE FOR ALL THE SELECTOR_BARS WITH SAME CATEGORY
        function stripedTarget( targetgroup, pushedValue ) {
            if(typeof targetgroup !== "undefined")
            {
                $( SELECTOR_BAR + '[data-target=rectangular_' + targetgroup + ']').each(function (index) {
                    $(this).find('.selector__bar--value span:first-of-type').html(pushedValue);
                });
                $( SELECTOR_BAR + '[data-target=oval_' + targetgroup + ']').each(function (index) {
                    $(this).find('.selector__bar--value span:first-of-type').html(pushedValue);
                });
                $( SELECTOR_BAR + '[data-target=round_' + targetgroup + ']').each(function (index) {
                    $(this).find('.selector__bar--value span:first-of-type').html(pushedValue);
                });
            }
        }
        stripedTarget(stripedTargetgroup[1], $cardValue);

        function changeCard(id, configurator, category) {
            $( CHOOSECARD + '[data-configuratorid=' + id + ']').each(function (index) {
                $(this).removeClass(ACTIVE_CHOOSECARD);
            });
            $( CHOOSECARD + '[data-configurator=' + configurator + ']').each(function (index) {
                $cardValue = this.getAttribute('data-value');
                $(this).addClass(ACTIVE_CHOOSECARD);
                return $cardValue;
            });
            stripedTarget(category, $cardValue);
        }

        // CHANGE ACTIVE CHOOSECARD
        $configID = $configID - 1;
        $( CHOOSECARD + '[data-configuratorid=' + this.getAttribute('data-configuratorid') + ']').each(function (index) {
            $(this).removeClass(ACTIVE_CHOOSECARD);
        });

        $( CHOOSECARD + '[data-configurator=' + this.getAttribute('data-configurator') + ']' + '[data-configuratorid=' + this.getAttribute('data-configuratorid') + ']').each(function (index) {
            $(this).addClass(ACTIVE_CHOOSECARD);
        });

        // CHECK IF OPTION IS AVAILBLE IN OTHER SHAPE IF NOT CHANGE TO OTHER OPTION
        if ($configID == 0) {
            // RECTANGULAR CHAMFERED ROUNDED -> OVAL CHAMFERED
            if (parts[0] == 'rectangular' && $configValue == 'oval' && parts[1] == 'chamferedrounded' || parts[0] == 'rectangular' && $configValue == 'round' && parts[1] == 'chamferedrounded') {
                parts[1] = 'chamfered';
                changeCard(2, 'chamfered', 'randafwerking-tafelblad');
            }
            // RECTANGULAR || OVAL -> ROUND
            if (parts[0] == 'rectangular' && $configValue == 'round' || parts[0] == 'oval' && $configValue == 'round') {
                $( CHOOSECARD + '[data-configuratorid=5]').each(function (index) {
                    $(this).hide();
                });
                $( CHOOSECARD + '[data-configuratorid=5][data-configuratorMaterial=steel]').each(function (index) {
                    $(this).show();
                });
                if(parts[4] == 'lak' || parts[4] == 'hardwax') {
                    parts[4] = 'black';
                    changeCard(5, 'black', 'kleur-frame');
                }
                if (parts[3] == 'butterfly') {
                    parts[3] = 'butterflytripod';
                    changeCard(4, 'butterflytripod', 'type-frame');
                }
                if (parts[3] == 'newco') {
                    parts[3] = 'newcotripod';
                    changeCard(4, 'newcotripod', 'type-frame');
                }
                else {
                    parts[3] = 'butterflytripod';
                    changeCard(4, 'butterflytripod', 'type-frame');
                }
            }
            // ROUND -> RECTANGULAR || OVAL
            if (parts[0] == 'round' && $configValue == 'rectangular' || parts[0] == 'round' && $configValue == 'oval') {
                if (parts[3] == 'butterflyquadpod' || parts[3] == 'butterflytripod') {
                    parts[3] = 'butterfly';
                    changeCard(4, 'butterfly', 'type-frame');
                }
                if (parts[3] == 'newcotripod') {
                    parts[3] = 'newco';
                    changeCard(4, 'newco', 'type-frame');
                }
                else {
                    parts[3] = 'butterfly';
                    changeCard(4, 'butterfly', 'type-frame');
                }
            }
            parts[$configID] = $configValue;
            setImageSource('configurator__image', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + $configValue + '_' +  parts[1] + '_' + parts[2] + '_' +  parts[3] + '_' +  parts[4] + '.jpg');
            setImageSource('configurator__image--large', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + $configValue + '_' +  parts[1] + '_' + parts[2] + '_' +  parts[3] + '_' +  parts[4] + '.jpg');
        }
        if ($configID == 1) {
            parts[$configID] = $configValue;
            setImageSource('configurator__image', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  $configValue + '_' +  parts[2] + '_' +  parts[3] + '_' +  parts[4] + '.jpg');
            setImageSource('configurator__image--large', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  $configValue + '_' +  parts[2] + '_' +  parts[3] + '_' +  parts[4] + '.jpg');
        }
        if ($configID == 2) {
            parts[$configID] = $configValue;
            setImageSource('configurator__image', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  parts[1] + '_' + $configValue + '_' +  parts[3] + '_' +  parts[4] + '.jpg');
            setImageSource('configurator__image--large', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  parts[1] + '_' + $configValue + '_' +  parts[3] + '_' +  parts[4] + '.jpg');
        }
        if ($configID == 3) {
            $( CHOOSECARD + '[data-configuratorid=5]').each(function (index) {
                $(this).hide();
            });
            if($configValue == 'legno') {
                $( CHOOSECARD + '[data-configuratorid=5][data-configuratorMaterial=wood]').each(function (index) {
                    $(this).show();
                });
            } else {
                if(parts[4] == 'lak' || parts[4] == 'hardwax') {
                    parts[4] = 'black';
                    changeCard(5, 'black', 'kleur-frame');
                }
                $( CHOOSECARD + '[data-configuratorid=5][data-configuratorMaterial=steel]').each(function (index) {
                    $(this).show();
                });
            }
            parts[$configID] = $configValue;
            setImageSource('configurator__image', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  parts[1] + '_' +  parts[2] + '_' +  $configValue + '_' +  parts[4] + '.jpg');
            setImageSource('configurator__image--large', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  parts[1] + '_' +  parts[2] + '_' +  $configValue + '_' +  parts[4] + '.jpg');
        }
        if ($configID == 4) {
            parts[$configID] = $configValue;
            setImageSource('configurator__image', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  parts[1] + '_' +  parts[2] + '_' +  parts[3] + '_' +  $configValue + '.jpg');
            setImageSource('configurator__image--large', '../assets/toolkit/images/configurator/products/studio_henk_design_tafel_configurator_1_' + parts[0] + '_' +  parts[1] + '_' +  parts[2] + '_' +  parts[3] + '_' +  $configValue + '.jpg');
        }
    }

});
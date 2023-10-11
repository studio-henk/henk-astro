const wcStepperQuantity = {
    init: function() {
        const allInputInstances = document.querySelectorAll(
            ".wc-stepper-quantity .js-quantity"
        );
        // returns nodeList
        for (let instanceInput of allInputInstances) {
            this.checkMin(instanceInput);
            /*this.setWidthOnInput(instanceInput);*/
            instanceInput.previousElementSibling.addEventListener(
                "click",
                this.decrease,
                false
            );

            instanceInput.nextElementSibling.addEventListener(
                "click",
                this.increase,
                false
            );
        }
    },
    checkMin: function(instanceInput) {
        // console.log("checkMin called");
        let minAttr = instanceInput.getAttribute("min");
        let inputValue = instanceInput.valueAsNumber;
        // compare with value
        if (inputValue <= minAttr) {
            // console.log("you have reached the minimum");
            instanceInput.value = minAttr;
            instanceInput.previousElementSibling.setAttribute("disabled", "");
        } else {
            instanceInput.previousElementSibling.removeAttribute("disabled");
        }
    },
    decrease: function(event) {
        // console.log("decrease called");
        // event.target is the button just clicked
        const minBtn = event.currentTarget;
        // prev element is the input we need
        let inputField = minBtn.nextElementSibling;
        //get current value
        let currentValue = inputField.valueAsNumber;
        // only if currentValue is not 1
        if (currentValue === 1) {
            // console.log("you have reached the minimum");
            // disable minBtn
            minBtn.setAttribute("disabled", "");
        } else {
            inputField.stepDown();
            // wcStepperQuantity.setWidthOnInput(inputField);
            wcStepperQuantity.checkMin(inputField);
            setTimeout(wcStepperQuantity.submitForm, 1000);
        }
    },
    increase: function(event) {
        // console.log("increase called");
        const plusBtn = event.currentTarget;
        // svg is fucking up event target again
        // next element is the input we need
        let inputField = plusBtn.previousElementSibling;
        inputField.stepUp();
        // wcStepperQuantity.setWidthOnInput(inputField);
        wcStepperQuantity.checkMin(inputField);
        setTimeout(wcStepperQuantity.submitForm, 1000);
    },
    submitForm: function() {
        $("form#cart_form").trigger("submit");
    }
};
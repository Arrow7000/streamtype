(function() {
    var app = angular.module('flowstate', []);

    app.controller('mainController', function($scope, $interval) {

        var debug = false;

        // Writing app
        $scope.started = false;
        $scope.text = '';


        // Font chooser
        $scope.fonts = ["lustria", "inconsolata", "lato"];
        $scope.fontChoosing = false;
        $scope.chosenFont = $scope.fonts[0];
        $scope.selectFont = function(font) {
            $scope.chosenFont = font;
        }


        // Duration chooser
        $scope.durations = [1, 5, 10, 15, 30, 45, 60, 120, 180];
        $scope.durChoosing = false;
        // $scope.chosenDur = 15;
        $scope.selectDur = function(dur) {
            $scope.chosenDur = dur;
            $scope.timer = $scope.chosenDur * 60 * 1000;
        }


        /// Timing initialisers
        // Deletion timer
        $scope.delTimeInit = 5 * 1000;



        // Stream timer
        $scope.chosenDur = 15;
        $scope.timer = $scope.chosenDur * 60 * 1000;
        $scope.deleteTimer = $scope.delTimeInit;











        $scope.ctn = angular.element(document.querySelector('#container'));
        // $scope.ctn.on('keydown', function(e) {
        //     console.log("Keypress");
        //     if (e.keyCode == 13) {
        //         console.log("Enter");
        //         window.event.cancelBubble = true;
        //         event.returnValue = false;
        //         // insertTextAtCursor('\n');
        //         // $scope.text += '\n';
        //     }
        // });




        $scope.showSplash = true;

        $interval(function() {
            $scope.showSplash = false;
        }, 15000);


        $scope.flash = function() {
            // $scope.text += ' test';
            console.log("Hover!");
        }

        var bible = 'In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.';


        $interval(function() { // 1/100th second interval counter
            if ($scope.showSplash && $scope.text.length < bible.length) {
                $scope.started = true;
                typeEvent();
                // for (var i = 0; i < Things.length; i++) {
                //     Things[i]
                // };
                $scope.text += bible[$scope.text.length];
            }
            if ($scope.started && $scope.deleteTimer > 0) { // Before timer hits 0
                $scope.deleteTimer -= 100; // Makes deletion timer decrement 
            }
            if ($scope.started && $scope.deleteTimer <= 0 * 1000) { // When timer hits zero
                $scope.deleteEverything();
            }
            if (!$scope.started) {
                $scope.timer = $scope.chosenDur * 60 * 1000;
            } else {
                $scope.timer -= 100;
            }


        }, 100);


        document.addEventListener("keyup", keyup, false);
        document.addEventListener("keydown", keydown, false);

        function keyup(e) {
            if (!$scope.showSplash) typeEvent(e);
        }

        function keydown(e) {
            if (!$scope.showSplash) typeEvent(e);
        }





        $scope.deleteEverything = function() {
            // $scope.ctn.empty();
            $scope.text = '';
            $scope.deleteTimer = $scope.delTimeInit;
            $scope.started = false;
            if (debug) console.log("Timer ran out!");
        };




        // Fires on both keydown and keyup events.
        function typeEvent(e) {
            if (debug) {
                console.log("Typing...");
                console.log("$scope.started", $scope.started);
                console.log("$scope.text().length", $scope.text().length);
            }

            $scope.deleteTimer = $scope.delTimeInit;
            if ($scope.text.length > 0) $scope.started = true;
        }



    });



    // Allows 'edit' attr-element to be bound to $scope variable
    app.directive("edit", function() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attrs, ngModel) {

                function read() {
                    ngModel.$setViewValue(element.html());
                }

                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || "");
                };

                element.bind("blur keyup change", function() {
                    scope.$apply(read);
                });
            }
        };
    });








    app.directive("selector", function() {
        return {
            restrict: "E",
            templateUrl: "templates/selector.html"
        }
    })










    // app.directive('caret', function() {

    //     function setCaretPosition(elem, caretPos) {
    //         if (elem !== null) {
    //             if (elem.createTextRange) {
    //                 var range = elem.createTextRange();
    //                 range.move('character', caretPos);
    //                 range.select();
    //             } else {
    //                 if (elem.setSelectionRange) {
    //                     elem.focus();
    //                     elem.setSelectionRange(caretPos, caretPos);
    //                 } else
    //                     elem.focus();
    //             }
    //         }
    //     }

    //     return {
    //         scope: {
    //             value: '=ngModel'
    //         },
    //         link: function(scope, element, attrs) {
    //             var caret = Number(attrs.caret);
    //             scope.$watch('value', function(newValue, oldValue) {
    //                 if (newValue && newValue != oldValue && !isNaN(newValue) && newValue.length > (caret + 1)) {
    //                     setCaretPosition(element[0], caret);
    //                 }
    //             });
    //         }
    //     };
    // });



})()

(function() {
    var app = angular.module('flowstate', []);

    app.controller('mainController', function($scope, $interval) {

        var debug = false;

        // Writing app primary functions
        $scope.mainTimerOn = true;
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





        // Clicking on button to enter app
        $scope.enterTimerStarted = false;
        var promise;
        $scope.startEnterTimer = function() {
            console.log("Mouse down!");
            $scope.enterTimerStarted = true;
            promise = $interval(function() {
                $scope.showSplash = false;
            }, 3);
        }

        $scope.stopEnterTimer = function() {
            console.log("Mouse up!");
            $scope.enterTimerStarted = false;
            $interval.cancel(promise);
        }








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

        // Makes splash screen go away after time interval
        // $interval(function() {
        //     $scope.showSplash = false;
        // }, 5000);


        $scope.flash = function() {
            // $scope.text += ' test';
            console.log("Hover!");
        }

        var bible = 'In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.';


        // Tenth second interval counter - always running
        var mainInterval = $interval(function() {

            if ($scope.mainTimerOn) {
                // When Splash is on and haven't finished printing all Bible text yet
                if ($scope.showSplash && $scope.text.length < bible.length) {
                    // Types automatically when Splash screen is on
                    $scope.started = true;
                    typeEvent();
                    $scope.text += bible[$scope.text.length];
                }

                // Started typing and before timer hits 0
                if ($scope.started && $scope.deleteTimer > 0) {
                    // Makes deletion timer decrement 
                    $scope.deleteTimer -= 100;
                }

                // When deleteTimer hits zero
                if ($scope.started && $scope.deleteTimer <= 0 * 1000) {
                    // Delete ALL text
                    $scope.deleteEverything();
                }

                // Checks if started typing yet
                if (!$scope.started) {
                    // Makes timer stay at initial value
                    $scope.timer = $scope.chosenDur * 60 * 1000;
                } else {
                    // Decrements timer
                    $scope.timer -= 100;
                }

                if ($scope.timer <= 0) {
                    $scope.mainTimerOn = false;
                }
            } else {
                $scope.timer = $scope.chosenDur;
                $scope.deleteTimer = $scope.delTimeInit;
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

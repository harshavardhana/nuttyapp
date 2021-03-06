/*
 * https://nutty.io
 * Copyright (c) 2014 krishna.srinivas@gmail.com All rights reserved.
 * GPLv3 License <http://www.gnu.org/licenses/gpl.txt>
 */

angular.module('nuttyapp')
    .directive('nuttySignin', function() {
        return {
            templateUrl: "templates/signin.html",
            scope: true,
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs, termController) {},
            controller: ['$scope', 'NuttySession', '$modal', '$location',
                function($scope, NuttySession, $modal, $location) {
                    Deps.autorun(function() {
                        Meteor.userId();
                        setTimeout(function() {
                            $scope.$apply();
                        }, 0);
                    });
                    $scope.currentuser = function() {
                        var user = Meteor.user();
                        if (user) {
                            return user.username;
                        } else {
                            return "";
                        }
                    };
                    $scope.signintext = function() {
                        if (Meteor.userId()) {
                            return "Log Out";
                        } else
                            return "Log In";
                    }
                    $scope.signinout = function($event) {
                        // $event.stopPropagation();
                        // $event.preventDefault();
                        if (Meteor.userId()) {
                            NuttySession.userloggedout(function() {
                                Meteor.logout(function(err) {
                                    if (err)
                                        console.log("Error logging out in: " + err);
                                    $scope.$apply();
                                });
                            });
                        } else {
                            if (NuttySession.type) {
                                var port = $location.port();
                                var portstr = (port === 80 || port === 443) ? '' : ':' + port;
                                window.open($location.protocol() + '://' + $location.host() + portstr + '/login');
                                return;
                            } else {
                                $location.path('/login');
                                return;
                            }
                        }
                    };
                }
            ]
        }
    });

angular.module('nuttyapp')
    .directive('focusMe', ['$timeout',
        function($timeout) {
            return {
                link: function(scope, element, attrs, model) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            };
        }
    ]);

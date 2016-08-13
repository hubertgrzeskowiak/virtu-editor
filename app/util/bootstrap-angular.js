angular.module('bootstrap-angular', [])

.directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                $(element).click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                });
            }
        };
    })
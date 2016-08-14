(function Module() {
	'use strict';

	angular.module('ngSweetAlert', []).factory('SweetAlert', ['$window', '$q', function ngSweetAlert($window, $q) {
		// Temporary solution for the tab key error
		// https://github.com/t4t5/sweetalert/issues/127#issuecomment-139042246
		var swalInstance = angular.copy($window.swal);
		$window.swal = function configSwal() {
			var previousWindowKeyDown = $window.onkeydown;
			swalInstance.apply(this, Array.prototype.slice.call(arguments, 0));
			$window.onkeydown = previousWindowKeyDown;

			configSwal.close = swalInstance.close;
		};
		// End temporary solution

		var swal = $window.swal,

			self = {
				swal: function templateMethod(options) {
					var defer = $q.defer();
					swal(options, function swalCallback(response) {
						// @var response bool|object
						if (!response) {
							defer.reject(response);
							return;
						}
						defer.resolve(response);
					});
					return defer.promise;
				},
				close: function close() {
					if (typeof swal.close !== 'undefined') {
						swal.close();
					}
				},
				success: function success(options) {
					options.type = 'success';
					return self.swal(options);
				},
				error: function error(options) {
					options.type = 'error';
					return self.swal(options);
				},
				warning: function warning(options) {
					options.type = 'warning';
					return self.swal(options);
				},
				info: function info(options) {
					options.type = 'info';
					return self.swal(options);
				},
				input: function input(options) {
					options.type = 'input';
					return self.swal(options);
				},
			};

		return self;
	}, ]);
})();

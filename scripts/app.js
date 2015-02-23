(function(){

	var app = angular.module('mrk', [
		'students-module',
		'catalog-module',
		'record-module',
		'record-service',
		'catalog-service',
		'students-service'
		]);

	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//		STATE CONTROLLER
	app.controller('ModeController', ['$rootScope', '$log', function($rootScope, $log){
		_this = this;
		_this.modes = [
					"record",
					"plan",
					"calendar"
				]

		_this.mode = _this.modes[0];

		_this.selectMode = function(i) {
			$log.log(_this.modes[i]);
			_this.mode = _this.modes[i];

		}

		_this.isMode = function(checkMode){
			return _this.mode === checkMode;
		}
	}]);

})();


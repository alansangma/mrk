(function(){
	var app = angular.module('record-module', []);
	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//		MAIN CONTROLLER
	app.controller('RecordController', ['$log', '$rootScope', 'RecordService', function($log, $rootScope, RecordService){
		var _this = this;
		_this.students = [];
		_this.lessons = [];
		//_this.postStudents = undefined;
		//_this.postLessons = undefined;
		_this.canRecord = false;

		$rootScope.$on('studentStaged', function(event, stagedStudents){
			_this.students = stagedStudents;

		});

		$rootScope.$on('lessonStaged', function(event, stagedLessons){
			_this.lessons = stagedLessons;
		});

		_this.canRecord = function() {
			return _this.students.length > 0 && _this.lessons.length > 0;
		}
		
		_this.makeRecord = function(type) {

			RecordService.postRecord(type, _this.students, _this.lessons, function(success){
				$log.log('callback()  success:'+success);
				//if(type=="record") {
					_this.clearStage();
				//}
			});	

		}

		_this.clearStage = function() {
			$log.log('clearStage');
			$rootScope.$broadcast('clearStage', {});
			_this.students = [];
			_this.lessons = [];
		}

	}]);
})();
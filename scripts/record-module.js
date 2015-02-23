(function(){
	var app = angular.module('record-module', []);
	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//		MAIN CONTROLLER
	app.controller('RecordController', ['$http', '$log', '$rootScope', function($http, $log, $rootScope){
		var _this = this;
		_this.students = [];
		_this.lessons = [];

		$rootScope.$on('studentClicked', function(event, clickedStudent){
			if(clickedStudent.staged) {
				_this.students.push(clickedStudent);
			} else {
				_this.students = jQuery.map(_this.students, function(student, index) {
					if(student.id !== clickedStudent.id) return student;
				});
			}

			_this.setStageMode();
		});

		$rootScope.$on('lessonClicked', function(event, clickedLesson){
			$log.log(clickedLesson.disabled);
			if(clickedLesson.staged) {
				_this.lessons.push(clickedLesson);
			} else {
				_this.lessons = jQuery.map(_this.lessons, function(lesson, index) {
					if(lesson.id !== clickedLesson.id) return lesson;
				});
			}

			//_this.setStageMode();
		});

		_this.startRecord = function(type) {
			//jQuery('#myModal').modal();
		}
		_this.makeRecord = function(type) {
			jQuery('#myModal').modal();
		}

		_this.clearStage = function() {
			$log.log('clearStage');
			$rootScope.$broadcast('clearStage', {});
			_this.students = {};
			_this.lessons = {};
		}

	}]);
})();
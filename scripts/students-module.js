(function(){
	var app = angular.module('students-module', []);
	

	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//		STUDENT CONTROLLER
	app.controller('StudentController', ['$http', '$log', '$rootScope', function($http, $log, $rootScope){
		var _this = this;
		_this.students = undefined;
		_this.lessonsSelected = {};
		//_this.studentsRepo = undefined;

		$http.get('./data/students.json').success(function(data){
			_this.students = data;
			//_this.studentsRepo = data;
		});

		_this.stageStudent = function(student) {
			student.staged = (student.staged !== undefined) ? !student.staged : true;
			$rootScope.$broadcast('studentClicked', student)
			
		}

		/*$rootScope.$on('lessonClicked', function(event, lesson){
			if()
		});*/

		$rootScope.$on('singleLessonSelected', function(event, lesson){
			// show students who've had this lesson
			$log.log('from StudentController: ' + lesson.title);
			for(var s in _this.students) {
				var student = _this.students[s];
				if(student.lessons.indexOf(lesson.id) >= 0) student.disabled = true;
				else student.disabled = false;
			}
			/*_this.students = jQuery.map(_this.students, function(student, index) {
				if(jQuery.inArray(lesson.id, student.lessons) !== -1) return student;
			});*/
		});

		$rootScope.$on('multipleItemsSelected', function(event, data){
			//_this.students = _this.studentsRepo;
		});

	}]);

})();
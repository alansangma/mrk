(function(){
var app = angular.module('students-module', []);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//		STUDENT CONTROLLER 	<< CATALOG
app.controller('StudentController', ['$log', '$rootScope', 'StudentsService', function($log, $rootScope, StudentsService){
	var _this = this;
	_this.students = undefined,
	_this.stagedStudents = [];

	StudentsService.getStudents('./data/students.json', function(data){
		_this.students = data;
		StudentsService.conditionStudents();
	});
	
	$rootScope.$on('lessonStaged', function(event, stagedLessons){
		StudentsService.updateStudents(_this.students, stagedLessons);
	});

	_this.stageStudent = function(student) {
		StudentsService.stageStudent(student, this.stagedStudents);
		$rootScope.$broadcast('studentStaged', _this.stagedStudents);
	}

	$rootScope.$on('clearStage', function(event, data){
		StudentsService.resetStudents(_this.students);
		StudentsService.unstageStudents(_this.students);
		_this.stagedStudents = [];
	});

}]);

})();
(function(){
	var app = angular.module('students-service', []);

	app.factory('StudentsService', ['$http', '$log', function($http, $log){
		return {
			getStudents		:function(urlStr, callback) {
				$http.get(urlStr).success(function(data){
					callback(data);
				});
			},

			conditionStudents	:function(students) {
				for(var s in students) {
					var student = students[s];
					student.staged = false;
					student.currCount = 0;
				}
			},

			stageStudent		:function(student, stagedStudents) {
				student.staged = !student.staged;
				if(student.staged) {
					stagedStudents.unshift(student);
				} else {
					for(var i in stagedStudents) {
						var stagedStudent = stagedStudents[i];
						if(stagedStudent.id == student.id) stagedStudents.splice(i, 1);
					}
				}
			},

			updateStudents		:function(students, stagedLessons) {
				this.resetStudents(students);
				this.earmarkStudentsRecieved(students, stagedLessons);

				if(stagedLessons.length == 1) {
					/*	//////////////////////////
						SINGLE LESSON SELECTED
						A student may receive a lesson multiple times so
						increment student.currCount each time it appears in student.lessons array
					*/
					for(var s in students) {
						var student =students[s]; 
						for(var l in student.lessons) {
							if(!student.lessons[l].planned && student.lessons[l].lessonID == stagedLessons[0].id) student.currCount++;
						}
					}
				}
			},

			earmarkStudentsRecieved	:function(students, stagedLessons) {
				for(var s in students) {
					var student = students[s];
					var studentLessons = student.lessons;
					for (var sl in studentLessons) {
						var studentLessonID = studentLessons[sl].lessonID;
						for(var l in stagedLessons) {
							if(stagedLessons[l].id == studentLessonID) student.disabled = true;
						}
					}
				}
			},

			resetStudents		:function(students) {
				for (var s in students) {
					students[s].currCount = 0;
					students[s].disabled = false;
				}
			},

			unstageStudents		:function(students) {
				for (var s in students) {
					students[s].staged = false;
				}
			}
		}
	}]);

})();
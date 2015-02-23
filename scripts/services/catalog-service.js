(function(){
	var app = angular.module('catalog-service', []);

	app.factory('CatalogService', ['$log', '$http', function($log, $http){
		return {
			getCatalog		:function(urlStr, callback) {
				$http.get(urlStr).success(function(data){
					callback(data);
				});
			},

			getLessonsFlat	:function(data) {
				var obj = {};
				for (var sj in data) {
					var subject = data[sj];
					for(var srs in subject.series) {
						var lessons = subject.series[srs].lessons;
						for(l in lessons) {
							var lesson = lessons[l];
							lesson.staged = false;
							lesson.currCount = 0;
							obj[lesson.id] = lesson;
						}
					}
				}
				return obj;	
			},

			stageLesson		:function(lesson, stagedLessons) {
				lesson.staged = !lesson.staged;
				if(lesson.staged) {
					stagedLessons.unshift(lesson);
				} else {
					for(var i in stagedLessons) {
						if(stagedLessons[i].id == lesson.id) stagedLessons.splice(i, 1);
					}
				}
			},

			earmarkReceivedLessons	:function(stagedStudents, lessonsFlat) {
				for(var s in stagedStudents) {
					var lessons = stagedStudents[s].lessons;
					for(var l in lessons) {
						var lessonID = lessons[l].lessonID;
						lessonsFlat[lessonID].disabled = true;
					}
				}
			},

			updateLessons	:function(stagedStudents, lessonsFlat) {
				this.resetLessons(lessonsFlat);
				this.earmarkReceivedLessons(stagedStudents, lessonsFlat);

				if(stagedStudents.length == 1) {
					/*	//////////////////////////
						SINGLE STUDENT SELECTED
						A student may receive a lesson multiple times so
						increment lessson.currCount each time it appears in student.lessons array
					*/
					for(var l in stagedStudents[0].lessons) {
						var lessonID = stagedStudents[0].lessons[l].lessonID;
						if(!stagedStudents[0].lessons[l].planned) lessonsFlat[lessonID].currCount++;
					}
				}
			},

			resetLessons	:function(lessonsFlat) {
				for(var l in lessonsFlat) {
					lessonsFlat[l].currCount = 0;
					lessonsFlat[l].disabled = false
				}
			},

			unstageLessons	:function(lessonsFlat) {
				for(var l in lessonsFlat) {
					var lesson = lessonsFlat[l];
					lesson.staged = false;
				}
			}
		};
	}]);
})();
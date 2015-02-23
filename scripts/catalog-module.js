(function(){
	var app = angular.module('catalog-module', []);
	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//		COURSE CATALOG CONTROLLER << LESSONS
	app.controller('CatalogController', ['$http', '$log', '$rootScope', function($http, $log, $rootScope){
		var _this = this;

		//_this.students = {};
		_this.subjects = undefined;
		//_this.lessonsFlat = undefined;

		_this.currSubject = undefined;

		_this.currRecievedLessons = {};
		


		$http.get('./data/catalog.json').success(function(data){
			_this.subjects = data;
			//_this.lessonsFlat = getLessonsFlat(data);
			_this.currSubject = _this.subjects[0]
		});

		_this.stageLesson = function(lesson) {
			lesson.staged = (lesson.staged !== undefined) ? !lesson.staged : true;
			$rootScope.$broadcast('lessonClicked', lesson);
		}

		/*function getLessonsFlat(obj) {
			var returnAry = [];
			jQuery.each(obj, function(i, subject) {
				 jQuery.each(subject.series, function(j, series) {
				 	 jQuery.each(series.lessons, function(k, lesson) {
				 		returnAry.push(lesson);
				 	 });
				 });
			});
			return returnAry;
		}*/

		
		//	1) RECORD LESSONS RECEIVED BY SELECTED STUDENTS
		//	2) INCREMENT / DECREMENT COUNT 
		//	3) DISABLE LESSONS THAT HAVE A > 0 COUNT
		$rootScope.$on('studentClicked', function(event, clickedStudent){
			for(var l in clickedStudent.lessons) {
				var lessonID = clickedStudent.lessons[l];
				if(_this.currRecievedLessons[lessonID] == undefined) _this.currRecievedLessons[lessonID] = 0;

				if(clickedStudent.staged) _this.currRecievedLessons[lessonID]++;
				else if(_this.currRecievedLessons[lessonID] >= 1) _this.currRecievedLessons[lessonID]--;
				else _this.currRecievedLessons[lessonID] = undefined;
			}
			$log.log(_this.currRecievedLessons);

			for(var s in _this.currSubject.series) {
				var lessons = _this.currSubject.series[s].lessons;
				//$log.log(series.title);
				for(l in lessons) {
					var lesson = lessons[l];
					//$log.log(lesson.title);
					if(_this.currRecievedLessons[lesson.id] !== undefined) lesson.disabled = true;
					else lesson.disabled = false;
				}
			}
		});

		
		/*$rootScope.$on('singleStudentSelected', function(event, student){
			// show lessons that this student has recieved.
			$log.log('from CatalogController: ' + student.nameFirst);
			for(var s in _this.currSubject.series) {
				var lessons = _this.currSubject.series[s].lessons;
				//$log.log(series.title);
				for(l in lessons) {
					var lesson = lessons[l];
					$log.log(lesson.title);
					if(student.lessons.indexOf(lesson.id) >= 0) lesson.disabled = true;
					else lesson.disabled = false;
				}
			}
		});*/

		$rootScope.$on('multipleItemsSelected', function(event, data){
		});
	}]);
})();
(function(){
	var app = angular.module('catalog-module', []);

	//////////////////////////////////////////////////
	//////////////////////////////////////////////////
	//		COURSE CATALOG CONTROLLER << LESSONS
	app.controller('CatalogController', ['$log', '$rootScope', 'CatalogService', function($log, $rootScope, CatalogService){
		var _this = this;

		_this.subjects,
		_this.lessonsFlat,
		_this.currSubject,

		_this.stagedLessons = [];

		CatalogService.getCatalog('./data/catalog.json', function(data){
			_this.subjects = data;
			_this.currSubject = _this.subjects[0];
			_this.lessonsFlat = CatalogService.getLessonsFlat(data);
		});

		$rootScope.$on('studentStaged', function(event, stagedStudents){
			CatalogService.updateLessons(stagedStudents, _this.lessonsFlat);
		});

		_this.stageLesson = function(lesson) {
			CatalogService.stageLesson(lesson, _this.stagedLessons);
			$rootScope.$broadcast('lessonStaged', _this.stagedLessons);
		}


		$rootScope.$on('clearStage', function(event, data){
			CatalogService.resetLessons(_this.lessonsFlat);
			CatalogService.unstageLessons(_this.lessonsFlat);
			_this.stagedLessons = [];
		});
	}]);
})();
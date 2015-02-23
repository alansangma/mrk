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

	app.directive('catalogList', function(){
		return {
			restrict		:'E',
			templateUrl		:'./templates/catalog.tmpl.html'
		}
	});

	app.directive('allPanelToggle', function(){
		var collapseAll, expandAll;

		collapseAll = function() {
			$('.series-panel-collapse.in').collapse('hide');
			$('.expand-all-catalog').show();
			$('.collapse-all-catalog').hide();
		};

		expandAll = function() {
			$('.series-panel-collapse:not(".in")').collapse('show');
			$('.expand-all-catalog').hide();
			$('.collapse-all-catalog').show();
		}
		return {
			restrict		:'A',
			link			:function(scope, element, attrs) {
				$('.collapse-all-catalog').hide();
				$('.collapse-all-catalog').on('click', collapseAll);
				$('.expand-all-catalog').on('click', expandAll);
			}
		}
	});

	app.directive('catalogHeight', function(){
		var handleResizeCatalog = function(element){
			$(element).height($(window).height()*.6 - 60);
		}
		return {
			restrict		:'A',
			link			:function(scope, element, attrs) {
				handleResizeCatalog(element);
				$(window).on('resize', function(e){handleResizeCatalog(element)});
			}
		}
	});
})();
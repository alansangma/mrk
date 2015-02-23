(function(){
	var app = angular.module('record-service', []);

	app.factory('RecordService', ['$log', '$http', function($log, $http){
		return {
			postRecord		:function(type, students, lessons, callback) {
				var date = new Date();
				var date_str = date.toISOString().substring(0, 10);
				//var students = _students;//.slice(0);
				//var lessons = _lessons;//.slice(0);
				
				for(var s in students) {
					var oldLessons = students[s].lessons;
					
					for(var l in lessons) {
						var lesson = lessons[l];
						oldLessons.push({
							"lessonID"		:lesson.id,
							"date"			:date_str,
							"planned"		:(type=="plan")
						});
					}
				}
				var success = false;
				//	CALL OUT TO DATABASE
				success = true;

				//	CALL callback

				callback(success);
			}
		};
	}]);
})();
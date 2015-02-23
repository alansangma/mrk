<!DOCTYPE html>
<html ng-app="mrk">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>MRK - Montesorri Record Keeper</title>
		
		<link rel="stylesheet" href="css/font-awesome.min.css">
		<!-- <link rel="stylesheet" href="css/bootstrap.min.css"> -->
		<!-- <link rel="stylesheet" href="css/bootstrap-theme.min.css"> -->
		<link rel="stylesheet" href="css/slate/bootstrap.min.css">
		<link rel="stylesheet" href="css/screen.css">
		<link rel="stylesheet" href="css/responsive-calendar.css">
		<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="scripts/angular.min.js"></script>
		<script type="text/javascript" src="scripts/bootstrap.min.js"></script>
		<script type="text/javascript" src="scripts/responsive-calendar.min.js"></script>
		<!--<script type="text/javascript" src="scripts/ui-bootstrap-tpls-0.12.0.min.js"></script>-->
		<script type="text/javascript" src="scripts/app.js"></script>
		<script type="text/javascript" src="scripts/modules/students-module.js"></script>
		<script type="text/javascript" src="scripts/modules/catalog-module.js"></script>
		<script type="text/javascript" src="scripts/modules/record-module.js"></script>
		<script type="text/javascript" src="scripts/services/record-service.js"></script>
		<script type="text/javascript" src="scripts/services/catalog-service.js"></script>
		<script type="text/javascript" src="scripts/services/students-service.js"></script>
		<script type="text/javascript">
		jQuery( document ).ready( function() {
		jQuery('.responsive-calendar').responsiveCalendar();
		jQuery(window).resize(function(event) {
			jQuery('#students-tray').height(jQuery(window).height()*.6);
			jQuery('#catalog-tray').height(jQuery(window).height()*.6 - 60);
			jQuery('#staged-students-well').height(jQuery(window).height()*.25 - 50);
			jQuery('#staged-lessons-well').height(jQuery(window).height()*.25 - 50);
			
		});
		jQuery(window).trigger('resize');
		
		jQuery('.collapse-all-catalog').hide();
		jQuery('.expand-all-catalog').click(function(event) {
			jQuery('.series-panel-collapse:not(".in")').collapse('show');
			jQuery('.expand-all-catalog').hide();
			jQuery('.collapse-all-catalog').show();
		});
		jQuery('.collapse-all-catalog').click(function(event) {
			jQuery('.series-panel-collapse.in').collapse('hide');
			jQuery('.expand-all-catalog').show();
			jQuery('.collapse-all-catalog').hide();
		});
		
		});
		</script>
	</head>
	<body ng-controller="ModeController as modeCtrl">
		
		<div class="navbar navbar-default">
			<div class="container">
				<div class="col-xs-8 brand-wrap">
					<h5>MRK - Montessori Record Keeper</h5>
				</div>
				<div class="col-xs-4 user-wrap">
					<h5 class="username"><i class="fa fa-user"></i> Kelly Teacher</h5>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<section>
				<ul class="nav nav-tabs nav-justified">
					<li ng-class="{active : modeCtrl.isMode(mode)}" ng-repeat="mode in modeCtrl.modes">
						<a href="" ng-click="modeCtrl.selectMode($index)">{{mode | uppercase}}</a>
					</li>
				</ul>
			</section>
			<div class="mode_tray panel panel-default" >
				
				<div class="panel-body panel-default animated-show-hide"  ng-hide="modeCtrl.isMode('calendar')">
					<div class="row">
						<!-- STUDENT CONTROLLER -->
						<div class="col-sm-3" id="students" ng-controller="StudentController as studentCtrl">
							<h4>Students</h4>
							<div id="students-tray">
								<ul class="list-group">
									<a class="list-group-item list-group-item-default"
									ng-class="{active : student.staged, disabled :student.disabled}"
									ng-repeat="student in studentCtrl.students | orderBy:'nameFirst'"
									ng-click="studentCtrl.stageStudent(student)">
										{{student.nameFirst}} {{student.nameLast}}
										<span class="badge" ng-show="student.currCount > 0">{{student.currCount}}</span>
									</a>
								</ul>
							</div>
						</div>
						<!-- /  STUDENT CONTROLLER -->
						<!-- STAGE -->
						<div class="col-sm-6" id="stage" ng-controller="RecordController as recordCtrl">
							<h4 style="text-align:center;" ng-show="modeCtrl.isMode('record')">Record</h4>
							<h4 style="text-align:center;" ng-show="modeCtrl.isMode('plan')">Plan</h4>
							<div class=" well well-sm" id="staged-students-well">
								<h3 ng-show="recordCtrl.students.length == 0" style="text-align:center;"><i class="fa fa-arrow-left"></i> ADD A STUDENT</h3>
								
								<ul class="list-group">
									<li class="list-group-item" ng-repeat="student in recordCtrl.students">
										{{student.nameFirst}} {{student.nameLast}}
									</li>
								</ul>
							</div>
							<p style="text-align:center;" ng-show="modeCtrl.isMode('record')">RECEIVED<br/><i class="fa fa-arrow-down"></i></p>
							<p style="text-align:center;" ng-show="modeCtrl.isMode('plan')">WILL RECEIVE<br/><i class="fa fa-arrow-down"></i></p>
							<div class=" well well-sm" id="staged-lessons-well">
								<h3 ng-show="recordCtrl.lessons.length == 0" style="text-align:center;">ADD A LESSON <i class="fa fa-arrow-right"></i></h3>
								<div id="record-tray">
									<ul class="list-group">
										<li class="list-group-item" ng-repeat="lesson in recordCtrl.lessons | orderBy: lesson.id" >
											{{lesson.title}}
										</li>
									</ul>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6">
									<button type="button" class="btn btn-warning mrk-btn" ng-click="recordCtrl.clearStage()">CLEAR</button>
								</div>
								<div class="col-sm-6" >
									<button type="button"
										data-toggle="modal"
										data-target="#record-modal"
										class="btn btn-success mrk-btn"
										ng-disabled="!recordCtrl.canRecord()"
										ng-show="modeCtrl.isMode('record')">RECORD
									</button>
									<button type="button"
										data-toggle="modal"
										data-target="#record-modal"
										class="btn btn-info mrk-btn"
										ng-disabled="!recordCtrl.canRecord()"
										ng-show="modeCtrl.isMode('plan')">PLAN
									</button>
								</div>
							</div>
							<!-- MODAL -->
							<div class="modal fade" id="record-modal" role="dialog">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
											<h4 class="modal-title" ng-show="modeCtrl.isMode('record')">RECORD</h4>
											<h4 class="modal-title" ng-show="modeCtrl.isMode('plan')">PLAN</h4>
										</div>
										<div class="modal-body">
											<ul class="list-group">
												<li class="list-group-item list-group-item" ng-repeat="student in recordCtrl.students">
													{{student.nameFirst}} {{student.nameLast}}
												</li>
											</ul>
											<p style="text-align:center;" ng-show="modeCtrl.isMode('record')">RECEIVED<br/><i class="fa fa-arrow-down"></i></p>
											<p style="text-align:center;" ng-show="modeCtrl.isMode('plan')">WILL RECEIVE<br/><i class="fa fa-arrow-down"></i></p>
											<ul class="list-group">
												<li class="list-group-item list-group-item" ng-repeat="lesson in recordCtrl.lessons">
													{{lesson.title}}
												</li>
											</ul>
											<hr>
											[ DATE PICKER GOES HERE ]
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
											<button type="button" class="btn btn-primary" data-dismiss="modal"
											ng-show="modeCtrl.isMode('record')"
											ng-click="recordCtrl.makeRecord('record');">RECORD</button>
											<button type="button" class="btn btn-primary" data-dismiss="modal"
											ng-show="modeCtrl.isMode('plan')"
											ng-click="recordCtrl.makeRecord('plan');">PLAN</button>
										</div>
									</div>
								</div>
							</div>
							<!-- /MODAL -->
						</div>
						<!-- /  STAGE -->
						<!-- CATALOG CONTROLLER -->
						<div class="col-sm-3" id="lessons" ng-controller="CatalogController as catalogCtrl">
							<h4>Lessons</h4>
						<select class="form-control subject-select"
						ng-options="subject as subject.title for subject in catalogCtrl.subjects"
						ng-model="catalogCtrl.currSubject"></select>
						<div id="catalog-tray">
							<div class="panel-group" id="subject-accordion" role="tablist" aria-multiselectable="true">
								<!-- /////////////////////////// -->
								<!-- NG REPEAT subject > series -->
								<div class="panel-group" id="series-accordion" role="tablist" aria-multiselectable="true">
									<div class="panel panel-default" id="series-panel" ng-repeat="series in catalogCtrl.currSubject.series">
										<div class="panel-heading" id="series-heading{{series.id}}">
											<!-- <a href="#series-{{series.id}}" data-toggle="collapse" data-parent="#series-accordion"> -->
											<a href="#series-{{series.id}}" data-toggle="collapse" >
												{{series.title}}
											</a>
										</div>
										<div id="series-{{series.id}}" class="panel-collapse collapse series-panel-collapse">
											<div class="panel-body">
												<div class="list-group">
													<a class="list-group-item"
													ng-class="{active :lesson.staged, disabled :lesson.disabled}"
													ng-repeat="lesson in series.lessons"
													ng-click="catalogCtrl.stageLesson(lesson)">
														{{lesson.title}}
														<span class="badge" ng-show="lesson.currCount > 0">{{lesson.currCount}}</span>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- NG REPEAT subject > series -->
								<!-- /////////////////////////// -->
							</div>
						</div>
						<a href="" class="expand-all-catalog">EXPAND ALL</a>
						<a href="" class="collapse-all-catalog">COLLAPSE ALL</a>
					</div>
					<!-- / CATALOG CONTROLLER -->
				</div>
			</div>
			<div class="panel-body animated-show-hide" ng-show="modeCtrl.isMode('calendar')">
				<!-- Responsive calendar - START -->
				<div class="responsive-calendar">
					<div class="controls">
						<a class="pull-left" data-go="prev"><div class="btn"><i class="fa fa-chevron-left"></i></div></a>
						<h4><span data-head-year></span> <span data-head-month></span></h4>
						<a class="pull-right" data-go="next"><div class="btn"><i class="fa fa-chevron-right"></i></div></a>
					</div><hr/>
					<div class="day-headers">
						<div class="day header">Mon</div>
						<div class="day header">Tue</div>
						<div class="day header">Wed</div>
						<div class="day header">Thu</div>
						<div class="day header">Fri</div>
						<div class="day header">Sat</div>
						<div class="day header">Sun</div>
					</div>
					<div class="days" data-group="days">
						<!-- the place where days will be generated -->
					</div>
				</div>
				<!-- Responsive calendar - END -->
			</div>
			<div class="panel-heading footer-panel">
				<h3 class="panel-title" ng-show="modeCtrl.isMode('record')"><i class="fa fa-floppy-o"></i> Record</h3>
				<h3 class="panel-title" ng-show="modeCtrl.isMode('plan')"><i class="fa fa-calendar-o"></i> Plan</h3>
				<h3 class="panel-title" ng-show="modeCtrl.isMode('calendar')"><i class="fa fa-calendar"></i> Calendar</h3>
			</div>
		</div>
	</div>
</body>
</html>
var config = {
  "date" : "13 February 2016",
  "cover" : "http://images4.alphacoders.com/741/74166.jpg",
  "pageTitle" : "HackFest'16",
  "logo" : "lib/tesco.png"
}
;

var app = angular.module('countdownApp', []);
app.controller('CountdownCtrl', ['$interval', '$http', function($interval, $http) {

  var countdown = this;

  countdown.columns = [];

  countdown.cover = config.cover;

  countdown.pageTitle = config.pageTitle;

  countdown.timeText = config.date;

  countdown.logo = config.logo;

  countdown.init = function() {
    countdown.updateTimePoll();
  }

  countdown.updateTime = function() {
    var time = new Date(countdown.timeText).getTime();
    var now = new Date();

    var secondsAbs = Math.abs(Math.floor((now - time) / 1000));
    var minutesAbs = secondsAbs / 60;
    var hoursAbs = minutesAbs / 60;

    var days = Math.floor(hoursAbs / 24);
    var hours = Math.floor(hoursAbs % 24);
    var minutes = Math.floor(minutesAbs % 60);
    var seconds = Math.floor(secondsAbs % 60);

    countdown.columns = [];
    if (hoursAbs > 24) {
      countdown.columns.push(pluralizeValue(days, 'day', 0));
    }
    countdown.columns.push(pluralizeValue(hours, 'hour', 24));
    countdown.columns.push(pluralizeValue(minutes, 'minute', 60));
    if (hoursAbs <= 24) {
      countdown.columns.push(pluralizeValue(seconds, 'second', 60));
    }
  };

  countdown.updateTimePoll = function() {
    $interval(countdown.updateTime, 1000);
  };
}]);

function pluralizeValue(value, unit, maxValue) {
  var pluralValue = unit + 's';
  var newUnit = null;
  switch (value) {
    case 1: newUnit = unit; break;
    default: newUnit = pluralValue;
  }
  return { 'unitOrig': pluralValue, 'unit': newUnit, 'value': value, 'maxValue': maxValue };
}

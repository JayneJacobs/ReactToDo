var moment = require("moment");

console.log(moment().format());

// January 1st 1970 @ 12:00am = 0
// January 1st 1970 @ 12:01am = 0


var now = moment();

console.log('Current timestamp', now.unix());

var timestamp =  2622535074;

var pts =  0;
var ats = 2622535074;

var presentationTime = (pts + ats);
console.log("Presentation Time is", ats)

var currentMoment = moment.unix(now);

console.log('Ad Play Time', currentMoment.format('MMM DD, YYYY @ h:mm a'));

//January 3rd, 2016 @12:13 AM
//console.log('presentationTime', presentationTime.format('MMMM Do, YYYY @ hh:mm A'));
//timestamp = (January 34d, 2016 @12:13 am).format(unix());

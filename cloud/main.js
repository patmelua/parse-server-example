
Parse.Cloud.define("children", function(request, response) {
	var query = new Parse.Query("AYOKFamilyLinks");
	var user = new Parse.User({id:request.params.userID});
	query.equalTo("userID",user);
	query.find({
		success: function(results){
			for (var i=0;i<results.length;i++) {
			response.success(results[i].get("children"));
			}
		},
		error: function(){
			response.error("No children");
		}
	});
});

Parse.Cloud.define("message", function(request,response){
	console.log("Enter Cloud function message");
	var pushquery = new Parse.Query(Parse.Installation);
	pushquery.containedIn("deviceToken",request.params.deviceToken);

	Parse.Push.send({
		where: pushquery,
		data:{
			alert: request.params.alert,
			data: {
				"position":request.params.position,
				"from":request.params.from,
				"fromUsername":request.params.fromUsername,
				"date":request.params.date,
				"fromId":request.params.fromId}
		}
	},{
	success: function(){
		response.success("Message succesfully sent");
		console.log("Message succesfully sent");
	},
	error : function(){
		response.error("Error sending message");
		console.log("Error sending message");
	},
	  useMasterKey: true
	});
	});
	
Parse.Cloud.define("deletion", function(request,response){
	console.log("Enter Cloud function deletion");
	var pushquery = new Parse.Query(Parse.Installation);
	pushquery.equalTo("deviceToken",request.params.deviceToken);

	Parse.Push.send({
		where: pushquery,
		data:{
			deletion: request.params.deletion,
			data: {
				"date":request.params.date,
				"from":request.params.from,
				"fromUsername":request.params.fromUsername,}
		}
	},{
	success: function(){
		response.success("Request deletion sent");
		console.log("Request deletion sent");
	},
	error : function(){
		response.error("Error sending deletion request");
		console.log("Error sending deletion request");
	},
	  useMasterKey: true
	});
	});
	
Parse.Cloud.define("request", function(request,response){
	console.log("Enter Cloud function request");
	var pushquery = new Parse.Query(Parse.Installation);
	pushquery.equalTo("deviceToken",request.params.deviceToken);

	Parse.Push.send({
		where: pushquery,
		data:{
			request: request.params.request,
			data: {
				"date":request.params.date,
				"from":request.params.from,
				"fromUsername":request.params.fromUsername,}
		}
	},{
	success: function(){
		response.success("Request sent");
		console.log("Request sent");
	},
	error : function(){
		response.error("Error sending request");
		console.log("Error sending request");
	},
	  useMasterKey: true
	});
	});

Parse.Cloud.beforeSave("AYOKFamilyLinks", function (request,response){
	if (request.object.id != null)
		request.object.id=null;
	response.success();
}
);

Parse.Cloud.beforeSave("AYOKRequest", function (request,response){
	if (request.object.id != null)
		request.object.id=null;
	response.success();
}
);

Parse.Cloud.beforeSave("AYOKMessages", function (request,response){
	if (request.object.id != null)
		request.object.id=null;
	response.success();
}
);

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
	if (request.object.id != null)
		request.object.id=null;
	response.success();
});	
/*
*  Licensed Materials - Property of IBM
*  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

var singleStepAuthRealmChallengeHandler = WL.Client.createChallengeHandler("SingleStepAuthRealm");

singleStepAuthRealmChallengeHandler.isCustomResponse = function(response) {
	if (!response || !response.responseJSON	|| response.responseText === null) {
		return false;
	}
	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
		return true;
	} else {
		return false;
	}
};

singleStepAuthRealmChallengeHandler.handleChallenge = function(response){
	var authRequired = response.responseJSON.authRequired;

	if (authRequired == true){
		$("#AppDiv").hide();
		$("#AuthDiv").show();
		$("#AuthPassword").empty();
		$("#AuthInfo").empty();

		if (response.responseJSON.errorMessage)
	    	$("#AuthInfo").html(response.responseJSON.errorMessage);
		
	} else if (authRequired == false){
		$("#AppDiv").show();
		$("#AuthDiv").hide();
		singleStepAuthRealmChallengeHandler.submitSuccess();
	}
};


$("#AuthSubmitButton").bind('click', function () {
	var username = $("#AuthUsername").val();
	var password = $("#AuthPassword").val();

	var invocationData = {
		adapter : "SingleStepAuthAdapter",
		procedure : "submitAuthentication",
		parameters : [ username, password ]
	};

	singleStepAuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
});

$("#AuthCancelButton").bind('click', function () {
	$("#AppDiv").show();
	$("#AuthDiv").hide();
	singleStepAuthRealmChallengeHandler.submitFailure();
});

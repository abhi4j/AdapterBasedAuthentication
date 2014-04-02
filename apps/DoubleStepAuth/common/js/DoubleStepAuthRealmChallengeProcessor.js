/*
*  Licensed Materials - Property of IBM
*  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

var doubleStepAuthRealmChallengeHandler = WL.Client.createChallengeHandler("DoubleStepAuthRealm");

doubleStepAuthRealmChallengeHandler.isCustomResponse = function(response) {
	if (!response || !response.responseJSON	|| response.responseText === null) {
		return false;
	}
	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
		return true;
	} else {
		return false;
	}
};

doubleStepAuthRealmChallengeHandler.handleChallenge = function(response){
	var authRequired = response.responseJSON.authRequired;

	if (authRequired == true){
		$("#AppDiv").hide();
		$("#AuthDiv").show();
		$("#AuthInfo").empty();
		
		$("#AuthStep1Div").hide();
		$("#AuthStep2Div").hide();
		switch (response.responseJSON.authStep) {
			case 1:
				$("#AuthStep1Div").show();
				$("#AuthPassword").val('');
				break;
			case 2:
				$("#AuthStep2Div").show();
				$("#AuthAnswer").val('');
				$("#AuthQuestion").html(response.responseJSON.question);
				break;
		}

		if (response.responseJSON.errorMessage)
			$("#AuthInfo").html(response.responseJSON.errorMessage);
		
	} else if (authRequired == false){
		$("#AppDiv").show();
		$("#AuthDiv").hide();
		doubleStepAuthRealmChallengeHandler.submitSuccess();
	}
};


$("#AuthStep1Submit").bind('click', function () {
	var username = $("#AuthUsername").val();
	var password = $("#AuthPassword").val();

	var invocationData = {
		adapter : "DoubleStepAuthAdapter",
		procedure : "submitAuthStep1",
		parameters : [ username, password ]
	};

	doubleStepAuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
});

$("#AuthStep2Submit").bind('click', function () {
	var answer = $("#AuthAnswer").val();

	var invocationData = {
		adapter : "DoubleStepAuthAdapter",
		procedure : "submitAuthStep2",
		parameters : [ answer ]
	};

	doubleStepAuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});
});

$(".AuthCancelButton").bind('click', function () {
	$("#AppDiv").show();
	$("#AuthDiv").hide();
	doubleStepAuthRealmChallengeHandler.submitFailure();
});



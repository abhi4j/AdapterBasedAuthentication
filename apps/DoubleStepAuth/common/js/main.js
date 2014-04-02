/*
*  Licensed Materials - Property of IBM
*  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

function wlCommonInit(){

}

function getSecretData(){
	var invocationData = {
			adapter : "DoubleStepAuthAdapter",
			procedure: "getSecretData",
			parameters: []
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: getSecretDataOK, 
		onFailure: getSecretDataFAIL
	});
}

function getSecretDataOK(response){
	$("#ResponseDiv").html(JSON.stringify(response.invocationResult));
}

function getSecretDataFAIL(response){
	$("#ResponseDiv").html(JSON.stringify(response.invocationResult));
}


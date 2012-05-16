/*
 * Activity indicator
 * https://github.com/appcelerator/Codestrong/blob/master/Resources/windows/ModalActivityIndicatorWindow.js
 */

Uit.ui.activityIndicator = (function() {
	
	Titanium.include('/styles/styles.js');
	
	var activityIndicator;
	var isShowing = false;
	var myTimeout = undefined;

	var activityIndicator = Ti.UI.createWindow({
		modal : false,
		navBarHidden : true,
		touchEnabled : true
	});
	activityIndicator.orientationModes = [Ti.UI.PORTRAIT];
	
	var view = Ti.UI.createView(style.backgroundView);
	var ai = Ti.UI.createActivityIndicator(style.activityIndicator);
	
	activityIndicator.ai = ai;
	activityIndicator.add(view);
	activityIndicator.add(ai);

	activityIndicator.showModal = function(message, timeout, timeoutMessage) {
		if(isShowing) {
			return;
		}
		isShowing = true;

		activityIndicator.ai.message = message;
		activityIndicator.ai.show();
		activityIndicator.open({
			animated : false
		});

		if(timeout) {
			myTimeout = setTimeout(function() {
				activityIndicator.hideModal();
				if(timeoutMessage) {
					var alertDialog = Ti.UI.createAlertDialog({
						title : 'Alert',
						message : timeoutMessage,
						buttonNames : ['OK']
					});
					alertDialog.show();
				}
			}, timeout);
		}
	};

	activityIndicator.hideModal = function() {
		if(myTimeout !== undefined) {
			clearTimeout(myTimeout);
			myTimeout = undefined;
		}
		if(isShowing) {
			isShowing = false;

			activityIndicator.ai.hide();
			activityIndicator.close({
				animated : false
			});

		}
	}
	return activityIndicator;
})();

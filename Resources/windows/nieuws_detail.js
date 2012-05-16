/*
 * Detail window
 */

(function() {
	Uit.ui.createNieuwsDetailWindow = function() {
		
		var detailWin = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : 'img/header_nieuws.png'
		}));

		// LEFT NAVBAR BACK BUTTON
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Titanium.App.navTab2.close(detailWin, {
				animated : false
			});
		});
		detailWin.leftNavButton = backButton;

		detailWin.addEventListener('blur', function(e) {
			Titanium.App.navTab2.close(detailWin, {
				animated : false
			});
		});
		detailWin.addEventListener('close', function(e) {
			Titanium.App.navTab2.close(detailWin, {
				animated : false
			});
		});
		var navActInd = Titanium.UI.createActivityIndicator();

		detailWin.addEventListener('open', function(e) {
			detailWin.setRightNavButton(navActInd);
			navActInd.show();
		});
		
		/*var prev = Titanium.UI.createButton(style.prevButton);
		
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		var next = Titanium.UI.createButton(style.nextButton);
		
		var toolbarView = Titanium.UI.createView(style.toolBar);
		
		toolbarView.add(prev);
		toolbarView.add(next);
		detailWin.add(toolbarView);
		*/
		
		/*
		flexSpace = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var toolbar = Titanium.UI.iOS.createToolbar({
			items : [prev, flexSpace, next],
			top : 0,
			translucent:true,
			borderTop : false,
			borderBottom : true
		});
		detailWin.add(toolbar);
		*/

		var webview = Titanium.UI.createWebView(Uit.combine(style.webViewFeed,{
			url : Titanium.App.selectedItemNieuws
		}));
		webview.addEventListener('load', function() {
			navActInd.hide();
		});
		//Navigeren in webview
		/*var goBackBtnWindow = Titanium.UI.createButton(style.backButton);
		 goBackBtnWindow.addEventListener('click', function() {
		 webview.goBack();
		 });
		 windowLink.rightNavButton = goBackBtnWindow;
		 */
		detailWin.add(webview);

		return detailWin;
	};
})();

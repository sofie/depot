/*
 * Detail window
 */

(function() {
	Uit.ui.createNieuwsDetailWindow = function() {

		var detailWin = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : 'img/header_nieuws.png'
		}));
		if(Ti.Platform.osname === 'android') {
			detailWin.title = 'Nieuws';
			detailWin.barColor = '#D64027';
		}

		if(Ti.Platform.osname !== 'android') {
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
		}
		if(Ti.Platform.osname === 'android') {
			var navActInd = Titanium.UI.createActivityIndicator({
				message : ' Loading...'
			});
			detailWin.add(navActInd);
		} else {
			var navActInd = Titanium.UI.createActivityIndicator();
			detailWin.setRightNavButton(navActInd);
		}

		detailWin.addEventListener('open', function(e) {
			navActInd.show();
		});

		var webview;
		if(Ti.Platform.osname === 'iphone') {
			webview = Titanium.UI.createWebView(Uit.combine(style.webViewFeed, {
				url : Titanium.App.selectedItemNieuws
			}));
		} else {
			webview = Titanium.UI.createWebView(Uit.combine(style.webViewFeedAndroid, {
				url : Titanium.App.selectedItemNieuws
			}));
		}

		webview.addEventListener('load', function() {
			navActInd.hide();
		});

		detailWin.add(webview);

		return detailWin;
	};
})();

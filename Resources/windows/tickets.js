/*
 * Detail window
 */

(function() {
	Uit.ui.createTicketsWindow = function() {

		var ticketsWin = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : '/img/header_tickets.png'
		}));
		if(Ti.Platform.osname === 'android') {
			ticketsWin.title = 'Bestel tickets';
			ticketsWin.barColor = '#D64027';
		}

		if(Ti.Platform.osname !== 'android') {
			// LEFT NAVBAR BACK BUTTON
			var backButton = Titanium.UI.createButton(style.backButton);
			backButton.addEventListener('click', function() {
				Titanium.App.navTab1.close(ticketsWin, {
					animated : false
				});
				Titanium.App.navTab1.open(Uit.ui.createConcertDetailWindow(), {
					animated : false
				});
			});

			ticketsWin.leftNavButton = backButton;

			ticketsWin.addEventListener('blur', function(e) {
				Titanium.App.navTab2.close(ticketsWin, {
					animated : false
				});
			});
			ticketsWin.addEventListener('close', function(e) {
				Titanium.App.navTab2.close(ticketsWin, {
					animated : false
				});
			});
		}
		if(Ti.Platform.osname === 'android') {
			var navActInd = Titanium.UI.createActivityIndicator({
				message : ' Loading...'
			});
			ticketsWin.add(navActInd);
			
		} else {
			var navActInd = Titanium.UI.createActivityIndicator();
			ticketsWin.setRightNavButton(navActInd);
		}

		ticketsWin.addEventListener('open', function(e) {
			navActInd.show();
		});

		var webview;
		if(Ti.Platform.osname === 'iphone') {
			webview = Titanium.UI.createWebView(Uit.combine(style.webViewFeed, {
				url : Uit.app_site
			}));
		} else {
			webview = Titanium.UI.createWebView(Uit.combine(style.webViewFeedAndroid, {
				url : Uit.app_site
			}));
		}

		webview.addEventListener('load', function() {
			navActInd.hide();
		});

		ticketsWin.add(webview);

		return ticketsWin;
	};
})();

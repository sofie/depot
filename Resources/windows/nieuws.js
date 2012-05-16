/*
 * Tweede tab, rss/nieuws
 */

Ti.include('/windows/nieuws_detail.js');

(function() {
	Uit.ui.createNieuwsWindow = function() {

		Titanium.App.tabgroup.setActiveTab(Titanium.App.navTab2);
		var nieuwsWindow = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : 'img/header.png'
		}));
		
		var lblTitle = Titanium.UI.createLabel(Uit.combine(style.titleBar, {
			text : Uit.tab2_name
		}));
		nieuwsWindow.setTitleControl(lblTitle);

		// load the feed
		nieuwsWindow.addEventListener('open', function(e) {
			//loadRSSFeed(url);
		});
		
		// RIGHT NAVBAR REFRESH BUTTON
		var refreshButton = Titanium.UI.createButton(style.refreshButton);
		refreshButton.addEventListener('click', function() {
			Uit.ui.activityIndicator.showModal('Loading...', 6000, 'Kan nieuws items niet ophalen. Controleer uw internetverbinding.');
			i = 0;
			url = Uit.url_news_feed;
			loadRSSFeed(url);
		});
		nieuwsWindow.rightNavButton = refreshButton;

		if(!Titanium.Network.online) {
			var lblNoInternet = Ti.UI.createLabel(Uit.combine(style.textError, {
				text : 'Kan geen connectie maken met internet. Refresh of controleer uw verbinding.',
				left:20,
				right:20
			}));
			nieuwsWindow.add(lblNoInternet);
		} else {

			Titanium.include('/config/strip_tags.js');
			var url = Uit.url_news_feed;

			var data;
			var i = 0;

			loadRSSFeed(url);
		};

		function displayNieuws(itemList) {

			if(!Titanium.Network.online) {
				alert("You must be connected to the internet to retrieve "+Uit.app_name+" information");
			}

			for(var c = 0; c < itemList.length; c++) {

				var title = itemList.item(c).getElementsByTagName("title").item(0).text;
				var desc = itemList.item(c).getElementsByTagName("description").item(0).text;
				var date = itemList.item(c).getElementsByTagName("pubDate").item(0).text;
				date = date.substr(5, 11);
				var link = itemList.item(c).getElementsByTagName("link").item(0).text;

				//Clean up characters
				title = title.replace(/\n/gi, " ");
				title = title.replace(/<br \/>/gi, "");
				title = title.replace(/&eacute;/gi, "é");
				title = title.replace(/&amp;/gi, "&");
				title = title.replace(/&egrave;/gi, "è");
				title = title.replace(/&euml;/gi, "ë");
				desc = desc.replace(/\n/gi, " ");
				desc = desc.replace(/<br \/>/gi, "");
				desc = desc.replace(/&amp;/gi, "&");
				desc = desc.replace(/&eacute;/gi, "é");
				desc = desc.replace(/&egrave;/gi, "è");
				desc = desc.replace(/&euml;/gi, "ë");

				// Create a table row for this item
				var row = Ti.UI.createTableViewRow(Uit.combine(style.tableViewRow,{
					height:'auto'
				}));

				var post_title = Ti.UI.createLabel(Uit.combine(style.titleFeeds,{
					text : title
				}));
				row.add(post_title);

				var post_desc = Ti.UI.createLabel(Uit.combine(style.textFeed,{
					text : desc
				}));
				row.add(post_desc);

				var post_date = Ti.UI.createLabel(Uit.combine(style.feedDate,{
					text : date
				}));
				row.add(post_date);

				// Add some rowData for when it is clicked
				row.thisTitle = title;
				row.thisLink = link;
				row.thisDesc = desc;

				// Add the row to the data
				data[i] = row;
				i++;

			};

			// create the table
			var feedTableView = Titanium.UI.createTableView(Uit.combine(style.TableView,{
				data : data
			}));
			nieuwsWindow.add(feedTableView);

			//WEBVIEW OPENEN VAN NIEUWSITEM
			feedTableView.addEventListener('click', function(e) {
				Titanium.App.selectedItemNieuws = e.rowData.thisLink;
				Titanium.App.navTab2.open(Uit.ui.createNieuwsDetailWindow(), {
					animated : false
				});

			});
		};

		function loadRSSFeed(url) {
			data = [];
			xhr = Titanium.Network.createHTTPClient();
			xhr.open('GET', url);
			xhr.onload = function() {
				try {
					// Now parse the feed XML
					var xml = this.responseXML;

					// Find the channel element
					var channel = xml.documentElement.getElementsByTagName("channel");
					feedTitle = channel.item(0).getElementsByTagName("title").item(0).text;

					// Find the RSS feed 'items'
					var itemList = xml.documentElement.getElementsByTagName("item");

					// Now add the items to a tableView
					displayNieuws(itemList);
					Uit.ui.activityIndicator.hideModal();

				} catch(e) {
					alert(e);
				}
			};

			xhr.send();
		};

		return nieuwsWindow;
	};
})();

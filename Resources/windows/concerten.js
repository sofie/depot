/*
 * Eerste tab, alle concerten in tableview
 */

Ti.include(
	'/windows/concert_detail.js',
	'/windows/zoeken.js'
);

(function() {
	Uit.ui.createConcertenWindow = function() {

		Titanium.App.tabgroup.setActiveTab(Titanium.App.navTab1);

		var mainWin = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : 'img/header.png'
		}));
		
		var lblTitle = Titanium.UI.createLabel(Uit.combine(style.titleBar, {
			text : Uit.tab1_name
		}));
		mainWin.setTitleControl(lblTitle);
		
		if(!Titanium.Network.online) {
			var lblNoInternet = Ti.UI.createLabel(Uit.combine(style.textError, {
				text : 'Kan geen connectie maken met internet. Refresh of controleer uw verbinding.',
				left:20,
				right:20
			}));
			mainWin.add(lblNoInternet);
		} else {
			var url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;
			getData();	
		}

		// RIGHT NAVBAR: REFRESH BUTTON
		var refreshButton = Titanium.UI.createButton(style.refreshButton);
		refreshButton.addEventListener('click', function() {
			url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;
			Uit.ui.activityIndicator.showModal('Loading...', 6000, 'Kan concerten niet ophalen. Controleer uw internetverbinding.');
			getData();
		});
		mainWin.rightNavButton = refreshButton;

		//
		// HTTP CLIENT GETCONCERTS
		//
		function getData() {
			// LEFT NAVBAR: SEARCH BUTTON
			var searchButton = Titanium.UI.createButton(style.searchButton);
			searchButton.addEventListener('click', function() {
				var searchWin = Uit.ui.createSearchWindow();
				Titanium.App.navTab1.open(searchWin, {
					animated : false
				});
			});

			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
	
			getReq.onload = function() {
				try {
					mainWin.leftNavButton = searchButton;
					var list = JSON.parse(this.responseText);

					for(var i = 0, j = list.length; i < j; i++) {

						var cdbId = list[i].cdbid;
						var cdbNaam = list[i].title;
						var cdbDescription = list[i].shortdescription;

						var cdbImg = list[i].thumbnail;
						var strImg = cdbImg.substr(0, 77);
						
						var row = Ti.UI.createTableViewRow(style.tableViewRow);
						
						//
						//Als retina display grote thumbnails
						//
						/*if (Ti.Platform.displayCaps.density === 'high') {
						     var imgThumb = strImg + '?width=180&height=180&crop=auto';
						}else{
							imgThumb = strImg + '?width=90&height=90&crop=auto';
						};*/
						 var imgThumb = strImg + '?width=90&height=90&crop=auto';
						if(cdbImg === '') {
							imgThumb = 'img/no_thumb.jpg';
						}

						var image = Titanium.UI.createImageView(Uit.combine(style.Img90,{
							//backgroundImage : imgThumb,
							image:imgThumb,
							defaultImage:'img/default_img.png'
						}));

						var name = Ti.UI.createLabel(Uit.combine(style.titleNaam,{
							text : cdbNaam
						}));
						
						var descr = Ti.UI.createLabel(Uit.combine(style.textDescription,{
							text : cdbDescription
						}));

						row.add(image);
						row.add(name);
						row.add(descr);

						data.push(row);
					};

					var tableView = Titanium.UI.createTableView(Uit.combine(style.TableView,{
						data : data
					}));
					mainWin.add(tableView);

					//Open detail window
					tableView.addEventListener('click', function(e) {
						Titanium.App.selectedIndex = list[e.index].cdbid;
						Ti.API.info(Titanium.App.selectedIndex);
						Titanium.App.rowIndex = e.index;

						Titanium.App.navTab1.open(Uit.ui.createConcertDetailWindow(), {
							animated : false
						});
					});
					

					Uit.ui.activityIndicator.hideModal();

				} catch(e) {
					alert(e);
				}
			};

			getReq.open("GET", url);
			getReq.send();
		};

		return mainWin;
	};
})();

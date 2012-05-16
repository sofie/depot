/*
 * Search window
 */

(function() {
	Uit.ui.createSearchWindow = function() {
		var searchWin = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : 'img/header_zoeken.png'
		}));

		//LEFT NAVBAR BACK BUTTON
		var backButton = Titanium.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Titanium.App.navTab1.close(searchWin, {
				animated : false
			});
		});
		searchWin.leftNavButton = backButton;

		var searchBg = Titanium.UI.createView(style.searchBar);
		searchWin.add(searchBg);

		var searchBar = Titanium.UI.createTextField(Uit.combine(style.SearchField, {
			hintText : 'Zoek op naam...'
		}));
		searchWin.add(searchBar);

		searchBar.addEventListener('change', function() {
			getConcertsByName();
			lblTap.hide();
		});
		var lblTap = Titanium.UI.createLabel(Uit.combine(style.textInstruction, {
			text : 'Tik in het zoekveld om te zoeken.',
		}));
		searchWin.add(lblTap);

		searchBar.addEventListener('return', function() {
			if(Titanium.App.datalist === 0) {
				var lblNo = Titanium.UI.createLabel(Uit.combine(style.textError, {
					text : 'Geen optredens gevonden.',
				}));
				searchWin.add(lblNo);
			}
			if(!Titanium.Network.online) {
				var lblNoInternet = Ti.UI.createLabel(Uit.combine(style.textError, {
					text : 'Kan geen connectie maken met internet. Controleer uw verbinding.',
					left : 20,
					right : 20
				}));
				searchWin.add(lblNoInternet);
			}
		});

		Titanium.App.addEventListener('app:reloadSearch', function(e) {
			searchBar.setValue(Titanium.App.searchValue);
		});
		searchWin.addEventListener('close', function() {
			Ti.App.removeEventListener('app:reloadSearch', function(e) {
				searchBar.setValue(Titanium.App.searchValue);
			});
		});

		//
		// HTTP CLIENT GETCONCERTBYNAME
		//
		function getConcertsByName() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer + '&q=' + searchBar.value;

			if(url === 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer + '&q=') {
				url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;
			} else {
				url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer + '&q=' + searchBar.value;
			}

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var list = JSON.parse(this.responseText);
					Titanium.App.datalist = list.length;

					for(var i = 0, j = list.length; i < j; i++) {
						Titanium.App.evNaam1 = list[i].title;

						var cdbId = list[i].cdbid;
						var cdbNaam = list[i].title;
						var cdbDescription = list[i].shortdescription;

						var cdbImg = list[i].thumbnail;
						var strImg = cdbImg.substr(0, 77);
						var imgThumb = strImg + '?width=90&height=90&crop=auto';

						var row = Ti.UI.createTableViewRow(style.tableViewRow);

						if(cdbImg === '') {
							imgThumb = 'img/no_thumb.jpg';
						}

						var image = Titanium.UI.createImageView(Uit.combine(style.Img90, {
							//backgroundImage : imgThumb,
							image:imgThumb,
							defaultImage:'img/default_img.png'
						}));

						var name = Ti.UI.createLabel(Uit.combine(style.titleNaam, {
							text : cdbNaam
						}));

						var descr = Ti.UI.createLabel(Uit.combine(style.textDescription, {
							text : cdbDescription
						}));

						row.add(image);
						row.add(name);
						row.add(descr);

						data.push(row);
					};
					var tableView = Titanium.UI.createTableView(Uit.combine(style.TableViewSearch, {
						data : data
					}));
					searchWin.add(tableView);

					searchBar.addEventListener('return', function(e) {
						tableView.setData(data);
						tableView.setBottom(0);
					});
					//Open detail van window
					tableView.addEventListener('click', function(e) {
						Titanium.App.searchValue = searchBar.value;

						Titanium.App.selectedIndex = list[e.index].cdbid;
						Titanium.API.info(Titanium.App.selectedIndex);

						Titanium.App.navTab1.open(Uit.ui.createConcertDetailWindow(), {
							animated : false
						});

					});
				} catch(e) {
					alert(e);
				}
			}
			/*getReq.onerror = function(e) {
			 Ti.API.info("TEXT onerror:   " + this.responseText);
			 alert('Er is iets mis met de databank.');
			 }*/
			getReq.open("GET", url);

			getReq.send();
		}


		searchWin.open();
		return searchWin;
	};
})();

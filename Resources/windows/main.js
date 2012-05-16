/*
 * Main window met tabgroup en navgroup
 */
Ti.include(
	'/windows/concerten.js', 
	'/windows/nieuws.js',
	
	'/config/config.js', 
	'/config/activityIndicator.js', 
	'/styles/styles.js');

(function() {

	Uit.ui.createApplicationMainWin = function() {

		var tabGroup = Titanium.UI.createTabGroup(style.tabGroup);
		Titanium.App.tabgroup = tabGroup;

		// EERSTE TAB
		var mainWinTab1 = Uit.ui.createConcertenWindow();
		var navTab1 = Titanium.UI.iPhone.createNavigationGroup({
			window : mainWinTab1
		});
		Titanium.App.navTab1 = navTab1;
		var baseWinTab1 = Titanium.UI.createWindow({
			navBarHidden : true,
			tabBarHidden : true
		});
		baseWinTab1.add(navTab1);

		// TWEEDE TAB
		var mainWinTab2 = Uit.ui.createNieuwsWindow();

		var navTab2 = Titanium.UI.iPhone.createNavigationGroup({
			window : mainWinTab2
		});
		Titanium.App.navTab2 = navTab2;

		var baseWinTab2 = Titanium.UI.createWindow({
			navBarHidden : true,
			tabBarHidden : true
		});
		baseWinTab2.add(navTab2);

		//TAB GROUP
		var tab1 = Titanium.UI.createTab({
			window : baseWinTab1
		});

		var tab2 = Titanium.UI.createTab({
			window : baseWinTab2
		});

		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);

		tabGroup.open();

		//CUSTOM TAB
		//Tutorial: Custom iPhone tabbar using Appcelerator Titanium
		//http://www.samjordan.co.uk/2011/02/tutorial-custom-iphone-tabbar-using-appcelerator-titanium/
		Ti.include("/config/customTabBar.js");

		var myCustomTabBar = new CustomTabBar({
			tabBar : tabGroup,
			imagePath : '/img/customTabBar/',
			width : 160,
			height : 50,
			items : [{
				image : Uit.customTab1,
				selected : Uit.customTab1_selected
			}, {
				image : Uit.customTab2,
				selected : Uit.customTab2_selected
			}]
		});

		return tabGroup;
	}
})();

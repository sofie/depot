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

		var tabGroup = Titanium.UI.createTabGroup(Uit.combine(style.tabGroup,{
			barColor:'#D64027'
		}));
		Titanium.App.tabgroup = tabGroup;
		
		var navWindow1;
	    var mainWindow1= Uit.ui.createConcertenWindow();
	    var navWindow2;
	    var mainWindow2= Uit.ui.createNieuwsWindow();
	    
	    if (Ti.Platform.osname === 'android') {
	    	navWindow1 = Ti.UI.createWindow({
				navBarHidden : false,
				tabBarHidden : false
			});
			Ti.App.navWin1 = navWindow1;
			navWindow2 = Ti.UI.createWindow({
				navBarHidden : false,
				tabBarHidden : false
			});
			navGroup = {
	            open: function (win, obj) {
	                win.open(obj);
	            },
	            close: function (win, obj) {
	                win.close(obj);
	            }
	        };
	        navWindow1 = mainWindow1;
	        navWindow2 = mainWindow2;
	     
	    } else {
	    	//TAB 1
	        navWindow1 = Ti.UI.createWindow({
				navBarHidden : true,
				tabBarHidden : true
			});
	        navTab1 = Ti.UI.iPhone.createNavigationGroup({
	            window: mainWindow1
	        });
	        Titanium.App.navTab1 = navTab1;
	        navWindow1.add(navTab1);
	        
	        //TAB 2
	        navWindow2 = Ti.UI.createWindow({
				navBarHidden : true,
				tabBarHidden : true
			});
	        navTab2 = Ti.UI.iPhone.createNavigationGroup({
	            window: mainWindow2
	        });
	        Titanium.App.navTab2 = navTab2;
	        navWindow2.add(navTab2);
	        
	        
	        //CUSTOM TAB
			//Tutorial: Custom iPhone tabbar using Appcelerator Titanium
			//http://www.samjordan.co.uk/2011/02/tutorial-custom-iphone-tabbar-using-appcelerator-titanium/
			Ti.include("config/customTabBar.js");
	
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

	    }
   		
	    if (Ti.Platform.osname !== 'android') {
	        Ti.UI.orientation = Ti.UI.PORTRAIT;
	    }
	   
		
		//TAB GROUP
		var tab1 = Titanium.UI.createTab({
			window : navWindow1,
			title: Uit.tab1_name
		});
		navWindow1.containingTab = tab1;
		Ti.App.tab1 = tab1;
		
		var tab2 = Titanium.UI.createTab({
			window : navWindow2,
			title: Uit.tab2_name,
			backgroundColor:'#D64027',
			barColor:'#D64027'
		});
		navWindow2.containingTab = tab2;
		Ti.App.tab2 = tab2;

		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);

		tabGroup.open();

		return tabGroup;
	}
})();

Cars = new Meteor.Collection("cars");


OgnoAdmin.config({
    auto : true,
    prefix: '/admin',
    isAllowed : function () {
        var user = Meteor.user();
		if(user) return true; // just allow all users for this app.. not really recommended obviously :)
    },
    homeScreenTemplate : 'manage',
    homeScreenTemplateGuest : 'manage'
});


if (Meteor.isClient) {
	Router.configure({
	    layoutTemplate: 'layout',
	    notFoundTemplate: 'notFound',
	    loadingTemplate: 'loading'		
	});
	Router.map(function() {
	  this.route('home', {
		path: '/',
		data: function() {
			return Cars.find().fetch();
		},
		waitOn: function() {
			return Meteor.subscribe('cars');
		}
		
	  })
	});
}
if (Meteor.isServer) {
	Meteor.publish('cars', function() { return Cars.find() });

	Meteor.startup(function() {
		(function(collection) {
			if(Cars.find().fetch().length === 0) {
			  var cars = [
				{name: "2014 Volkswagen Jetta"},
				{name: "2014 Nissan Sentra" },
				{name: "2014 Dodge Dart" }
			  ];

			  cars.forEach(function(v,i) {
				collection.insert(v);
			  });

			}
		})(Cars)
	});
}

import Vue from 'vue';
import HelloWorld from './HelloWorld.vue';


function getDictionary() {
	function success()
	{
		//TODO: In the future will fix this path so it is not hard-coded
		let jsonfile = require('/home/Lorenzo Gomez/openmct/src/plugins/simpleVuePlugin/test.json');
		
		let json  = "";
		
		// console.log("success:", jsonfile);
	    return jsonfile;
	}
	
	function failure()
	{
		console.log("Failure callback");
	}
	return Promise.resolve("Success!").then(success, failure);
	
}

var objectProvider = {
	   get: function (identifier) {
       	// console.log("identifier:", identifier);
       	// console.log("dictionary func:", getDictionary() )
	        return getDictionary().then(function (dictionary) {
                // console.log("identifier:", identifier);
                
                // console.log("dictionary:", dictionary);
	            if (identifier.key === 'spacecraft') {
	            	// console.log("match...");
	                return {
	                    identifier: identifier,
	                    name: dictionary.name,
	                    type: 'folder',
	                    location: 'ROOT'
	                };
                }
                
                 else {
                console.log("dictionary from ELSE:", dictionary);
                        var measurement = dictionary.measurements.filter(function (m) {
                        return m.key === identifier.key;
                })[0];
                return {
                    identifier: identifier,
                    name: measurement.name,
                    type: 'example.telemetry',
                    telemetry: {
                        values: measurement.values
                    },
                    location: 'example.taxonomy:spacecraft'
                };
            }
	        });
	    }
}

var compositionProvider = {
    appliesTo: function (domainObject) {
        // console.log("comp provider domain object:", domainObject);
        return domainObject.identifier.namespace === 'example.taxonomy' &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary()
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: 'example.taxonomy',
                        key: m.key
                    };
                });
            });
    }
};

function SimpleVuePlugin() {
    return function install(openmct) {

            openmct.objects.addRoot({
        namespace: 'example.taxonomy',
        key: 'spacecraft'
    });
    openmct.types.addType('example.telemetry', {
    name: 'Example Telemetry Point',
    description: 'Example telemetry point from our happy tutorial.',
    cssClass: 'icon-telemetry'
});
    
        openmct.types.addType('hello-world', {
            name: 'Hello World',
            description: 'An introduction object',
            
            creatable: true
        });
        openmct.objectViews.addProvider({
            name: "demo-provider",
            key: "hello-world",
            cssClass: "icon-packet",
            canView: function (d) {
                console.log("d param value:", d);

                return d.type === 'hello-world';
            },
            view: function (domainObject) {
                var vm;

                return {
                    show: function (container) {
                        vm = new Vue(HelloWorld);
                        console.log("vue obj:", vm);
                        container.appendChild(vm.$mount().$el);
                    },
                    destroy: function (container) {
                        vm.$destroy();
                    }
                };
            }
        });
        
    openmct.objects.addProvider('example.taxonomy', objectProvider);

    openmct.composition.addProvider(compositionProvider);

    };
}

export default SimpleVuePlugin;

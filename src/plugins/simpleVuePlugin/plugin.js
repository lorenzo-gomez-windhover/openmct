import Vue from 'vue';
import HelloWorld from './HelloWorld.vue';


function getDictionary() {
	
	function success()
	{
		let jsonfile = require('/home/vagrant/github/openmct/src/plugins/simpleVuePlugin/test.json');
		
		console.log("success:", jsonfile);
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
       	console.log("identifier:", identifier);
       	console.log("dictionary func:", getDictionary() )
	        return getDictionary().then(function (dictionary) {
	        	console.log("identifier:", identifier);
	            if (identifier.key === 'spacecraft') {
	            	console.log("match...");
	                return {
	                    identifier: identifier,
	                    name: dictionary.name,
	                    type: 'folder',
	                    location: 'ROOT'
	                };
	            }
	        });
	    }
}

function SimpleVuePlugin() {
    return function install(openmct) {
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
                return d.type === 'hello-world';
            },
            view: function (domainObject) {
                var vm;

                return {
                    show: function (container) {
                        vm = new Vue(HelloWorld);
                        container.appendChild(vm.$mount().$el);
                    },
                    destroy: function (container) {
                        vm.$destroy();
                    }
                };
            }
        });
        
    openmct.objects.addRoot({
        namespace: 'example.taxonomy',
        key: 'spacecraft'
    });
    
    openmct.objects.addProvider('example.taxonomy', objectProvider);
    let jsonfile = require('/home/vagrant/github/openmct/src/plugins/simpleVuePlugin/test.json');
//    console.log("process cwd", process.cwd());
    console.log("json:", jsonfile);
        
    };
}

export default SimpleVuePlugin;

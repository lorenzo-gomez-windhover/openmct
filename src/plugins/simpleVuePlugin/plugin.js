import Vue from 'vue';
import HelloWorld from './HelloWorld.vue';

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
                console.log("d param value:", d);

                return d.type === 'example.telemetry';
            },
            view: function (domainObject) {
                var vm;

                return {
                    show: function (container) {
                        vm = new Vue(HelloWorld);
                        console.log("vue obj:", vm);

                        var tlmUpdate = function(tlmValue) {vm.tlm  = tlmValue};
                        openmct.telemetry.subscribe(domainObject, tlmUpdate, {});   


                        // openmct.telemetry[0]
                        container.appendChild(vm.$mount().$el);
                    },
                    destroy: function (container) {
                        vm.$destroy();
                    }
                };
            },
            
        });
        


    };
}

export default SimpleVuePlugin;

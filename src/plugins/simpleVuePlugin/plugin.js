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

                return d.type === 'yamcs.telemetry';
            },
            view: function (domainObject) {
                var vm;

                return {
                    show: function (container) {
                        vm = new Vue(HelloWorld);
                        console.log("vue obj:", vm);
						
						console.log("domainObject:");
						
						var commandCounterDomainObj = {};
						var framesCounterDomainObj = {};
						
						commandCounterDomainObj.key = '~ocpoc~sch~SCH_HkPacket_t_param.CmdCounter';
						commandCounterDomainObj.namespace = 'taxonomy';
						
						framesCounterDomainObj.key = '~ocpoc~sch~SCH_HkPacket_t_param.MissedMajorFrameCount';
						framesCounterDomainObj.namespace = 'taxonomy';
						
                        var commandCounterUpdate = function(tlmValue) {vm.commandCounter  = tlmValue;};
						var framesCountUpdate = function(tlmValue){vm.framesCounter = tlmValue};

                        openmct.telemetry.subscribe(commandCounterDomainObj, commandCounterUpdate, {});
						openmct.telemetry.subscribe(framesCounterDomainObj, framesCountUpdatem, {} );   

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

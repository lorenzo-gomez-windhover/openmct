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
						
						console.log("domainObject:", domainObject);
						
						var commandCounterDomainObjId = {};
						var framesCounterDomainObjId = {};
						
						var commandCounterDomainObj = {};
						var framesCounterDomainObj = {};
						
						commandCounterDomainObjId.namespace = 'taxonomy';
						commandCounterDomainObjId.key = '~ocpoc~sch~SCH_HkPacket_t_param.CmdCounter';
						
						framesCounterDomainObjId.namespace = 'taxonomy';
						framesCounterDomainObjId.key = '~ocpoc~sch~SCH_HkPacket_t_param.MissedMajorFrameCount';
						
						openmct.objects.get(commandCounterDomainObjId).then(function(d){commandCounterDomainObj = d});
						openmct.objects.get(framesCounterDomainObjId).then(function(d){framesCounterDomainObj = d});
						
                        var commandCounterUpdate = function(tlmValue) {vm.commandCounter  = tlmValue;};
						var framesCountUpdate = function(tlmValue){vm.framesCounter = tlmValue};
						
						console.log("commandCounterDomainObj:", commandCounterDomainObj);
						console.log("framesCounterDomainObj:", framesCounterDomainObj);

                        openmct.telemetry.subscribe(commandCounterDomainObj, commandCounterUpdate, {});
						openmct.telemetry.subscribe(framesCounterDomainObj, framesCountUpdate, {} );   

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

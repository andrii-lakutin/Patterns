var Events = (function (){
	var cache = {},
		publish = function (topic, args, scope) {
			if (cache[topic]) {
				var thisTopic = cache[topic],
					i = thisTopic.length - 1;

				for (i; i >= 0; i -= 1) {
					thisTopic[i].apply( scope || this, args || []);
				}
			}
		},
		subscribe = function (topic, callback) {
			if (!cache[topic]) {
				cache[topic] = [];
			}
			cache[topic].push(callback);
			return [topic, callback];
		},
		unsubscribe = function (handle, completly) {
			var t = handle[0],
				i = cache[t].length - 1;

			if (cache[t]) {
				for (i; i >= 0; i -= 1) {
					if (cache[t][i] === handle[1]) {
						cache[t].splice(cache[t][i], 1);
						if(completly){ delete cache[t]; }
					}
				}
			}
		};

	return {
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}());


var subscriber1 = Events.subscribe('someEvent', function(num1, num2) {
	console.log(num1, num2);
});

var subscriber2 = Events.subscribe('someEvent', function(num1, num2) {
	console.log('some data');
});

Events.publish("someEvent", ['1', '2']);
// some data
// 1 2

Events.publish("someEvent", ['1']);
// some data
// 1 undefined

Events.unsubscribe(subscriber1);
Events.publish("someEvent", ['1', '2']);
// some data 
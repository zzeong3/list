/**
 * 
 */
$(document).ready(function(){
	console.log('1___checked');
 
	
});

const PincruxCtrl = (function(){
	return{
	
		call: function(obj) {
			
			var callUlr ="https://api.pincrux.com/postback.pin";
			var CallParm = "?pinkey="+pincrux.pinkey +"&appkey="+ pincrux.appkey+"&method=text";
			console.log(callUlr+CallParm);

			$.ajax({
				url: callUlr+CallParm
				,type: 'GET'
				//,contentType: "text/html; charset=UTF-8"
                , success: function (res) {
                	console.log('success');
                	console.log(res);
                	    	
                }, error: function (res) {
					console.log('error');
                	console.log(res);
					
                } ,complete :function (res){
					console.log('complete');
					console.log(res);
                }
				
			}); //[E] PincruxCtrl call
		}
	}//return	
})();	
const urlParams = new URLSearchParams(window.location.search);
var channel = urlParams.get('c');
var XMLHTTP = new XMLHttpRequest();

setTimeout(function(){
    if (channel !== null) {
		var ch = document.getElementById("ch");
		var vv = document.getElementById("viewvideos");
		ch.style.display = "block";
		vv.style.display = "block";

		XMLHTTP.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var ch = document.getElementById("ch");
				ch.style.display = "block";
				vv.style.display = "block";
	     	}else{
				var e = document.getElementById("erm");
	    		e.style.display = "flex";
			}
		}
	}
}, 500);
	
XMLHTTP.open("GET" ,"https://api.socialcounts.org/youtube-live-subscriber-count/"+channel, true);
XMLHTTP.send()

XMLHTTP.onreadystatechange = function(){
	if(this.status == 200){
		var output = this.responseText;
		output = JSON.parse(output);
		var channel_name = output.items[0].snippet.title;
		var channel_handle = output.items[0].snippet.customUrl;
		var channel_pfp = output.items[0].snippet.thumbnails.high.url;
		var channel_banner = output.items[0].brandingSettings.image.bannerExternalUrl;
		if (channel_name == "") {
			document.getElementById("channel_name").innerHTML = channel;
		}else{
			document.getElementById("channel_name").innerHTML = channel_name;
		}
		if (channel_handle == undefined) {
			document.getElementById("channel_handle").innerHTML = "@" + channel;
		}else{
			document.getElementById("channel_handle").innerHTML = channel_handle;
		}
		document.getElementById("channel_pfp").src = channel_pfp;
		document.getElementById("channel_banner").style.backgroundImage = "url("+channel_banner+")";
	}
	if(this.status == 404){
		ch.style.display = "none";
		e.style.display = "flex";
		clearInterval(sn);
	}
}

XMLHTTP.open("GET" ,"https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&id="+channel+"&key=AIzaSyBFEdIwNNsZ8GfX4PlIWxy06ObULpzwDgs", true);
XMLHTTP.send()

if (channel !== null) {
var sn = setInterval(function(){

	const urlParams = new URLSearchParams(window.location.search);
	var e = document.getElementById("red");
	var channel = urlParams.get('c');
	var vv = document.getElementById("viewvideos");
	var ch = document.getElementById("ch");
	var XMLHTTP = new XMLHttpRequest();
	
	XMLHTTP.onreadystatechange = function(){
		if(this.status == 200){
			var output = this.responseText;
			output = JSON.parse(output);
			var sub_number = output.est_sub;
			var view_number = output.table[0].count;
			var video_number = output.table[1].count;
			document.getElementById("sub_count").innerHTML = sub_number;
			document.getElementById("view_count").innerHTML = view_number;
			document.getElementById("video_count").innerHTML = video_number;
			ch.style.display = "block";
			vv.style.display = "block";
			e.style.display = "none";
		}
		if(this.status == 404){
			ch.style.display = "none";
			vv.style.display = "none";
			e.style.display = "flex";
			clearInterval(sn);
		}
	}
	
	XMLHTTP.open("GET" ,"https://api.socialcounts.org/youtube-live-subscriber-count/"+channel, true);
	XMLHTTP.send()
}, 1500
)}

function search() {

	var sch = document.getElementById("chn_id").value;

	XMLHTTP.onreadystatechange = function(){
		if(this.status == 200){
			var output = this.responseText;
			output = JSON.parse(output);
			var channel = output.items[0].id;
			window.location.assign("https://ytcount.github.io/?c="+channel);
		}
		if(this.status == 404){
			ch.style.display = "none";
			e.style.display = "flex";
			clearInterval(sn);
		}
	}

	XMLHTTP.open("GET" ,"https://api.socialcounts.org/youtube-live-subscriber-count/search/"+sch, true);
	XMLHTTP.send()
}

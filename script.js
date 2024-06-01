const urlParams = new URLSearchParams(window.location.search);
var channel = urlParams.get('c');
var XMLHTTP = new XMLHttpRequest();
const form = document.querySelector('form');

form.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});

setTimeout(function(){
    if (channel !== null) {
	        var ch = document.getElementById("ch");
	        var vv = document.getElementById("vv");
	        ch.style.display = "block";
	        vv.style.display = "flex";

		XMLHTTP.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				ch.style.display = "block";
				vv.style.display = "flex";
	     	}else{
				var e = document.getElementById("red");
				ch.style.display = "none";
				vv.style.display = "none";
				e.style.display = "flex";
				document.getElementById("errtxt").innerHTML = "Channel either failed to load or doesn't exist. Please try again later."
			}
		}
	}
}, 500);
	
XMLHTTP.open("GET" ,"https://mixerno.space/api/youtube-channel-counter/user/"+channel, true);
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
			var sub_number = output.counts[0].count;
			var view_number = output.counts[3].count;
			var video_number = output.counts[5].count;
			var channel_name = output.user[0].count;
			var channel_pfp = output.user[1].count;
			try{
				var channel_banner = output.user[2].count;
			}catch{
				var channel_banner = output.user[1].count;
			}
			if (channel_name == "") {
				document.getElementById("channel_name").innerHTML = channel;
			}else{
				document.getElementById("channel_name").innerHTML = channel_name;
			}
			document.getElementById("channel_handle").innerHTML = "@" + channel;
			if (channel_name == null || channel_name == "") {
				document.querySelector('title').textContent = "Trackcount";
			}else{
				document.querySelector('title').textContent = "Trackcount - " + channel_name;
			}
			document.getElementById("channel_pfp").src = channel_pfp;
			document.getElementById("channel_banner").style.backgroundImage = "url("+channel_banner+")";
			document.getElementById("sub_count").innerHTML = sub_number;
			document.getElementById("view_count").innerHTML = view_number;
			document.getElementById("video_count").innerHTML = video_number;
			ch.style.display = "block";
			vv.style.display = "flex";
			e.style.display = "none";
		}
		if(this.status == 404){
			var ch = document.getElementById("ch");
			var vv = document.getElementById("vv");
			var e = document.getElementById("red");
			ch.style.display = "none";
			vv.style.display = "none";
			e.style.display = "flex";
			document.getElementById("errtxt").innerHTML = "Channel either failed to load or doesn't exist. Please try again later."
			clearInterval(sn);
		}
	}
	
	XMLHTTP.open("GET" ,"https://mixerno.space/api/youtube-channel-counter/user/"+channel, true);
	XMLHTTP.send()
}, 1500
)}

function search() {

	var sch = document.getElementById("chn_id").value;

	XMLHTTP.onreadystatechange = function(){
		if(this.status == 200){
			var output = this.responseText;
			output = JSON.parse(output);
			var channel = output.list[0].[2];
			window.location.assign("https://trackcount.github.io/?c="+channel);
		}
		if(this.status == 404){
			var e = document.getElementById("red");
			ch.style.display = "none";
			document.getElementById("errtxt").innerHTML = "No channels found! Please try again later."
			e.style.display = "flex";
			vv.style.display = "none";
			clearInterval(sn);
		}
	}

	XMLHTTP.open("GET" ,"https://mixerno.space/api/youtube-channel-counter/search/"+sch, true);
	XMLHTTP.send()
}

function redirect() {
	window.open("https://www.youtube.com/channel/" + channel)
}

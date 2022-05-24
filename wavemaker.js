let xs = [];

// i range is length of wave pattern
for(var i=0; i<=500; i++){
	xs.push(i);
}

let t = 0;

// let amp2 = 10.0, wavenumber2 = Math.PI/50, freq2 = 0.002;

function animate(){
	
	let points = xs.map(x => {
		// displacement + amplitude * wave((x+phase)/freq)
// 		let y = 200.0+amp*Math.sin((x+t)*freq);
		let y1 = 200 + amp * Math.cos( phase + wavenumber * (x - freq * t) );
		let y2 =  amp2 * Math.cos( phase2 + wavenumber2 * (x - freq2 * t) );
		let y = y1 + y2;
		return [x,y]
		});
	
	let path = "M" + points.map(p => {
		return p[0] + "," + p[1]
		}).join("L");
	
	document.querySelector("path").setAttribute("d",path);
	
	// Wave speed
	t += speed;
	
	requestAnimationFrame(animate);

}

let freq = 0.005;
const freqControl = document.querySelector('#freq');
freqControl.addEventListener('input', function(){
	freq = Number(this.value);
	changeSound();
	wavelength = 1/freq;
	wavenumber = 2*Math.PI / wavelength;
	document.getElementById("wavelength").value = wavelength;
}, false);

let speed = 500.0;
const speedControl = document.querySelector('#speed');
speedControl.addEventListener('input', function(){
	speed = Number(this.value);
}, false);

let amp = 50.0;
const ampControl = document.querySelector('#amplitude');
ampControl.addEventListener('input', function(){
	amp = Number(this.value);
	changeSound();
}, false);


let wavelength = 1 / freq;
const wavelengthControl = document.querySelector('#wavelength');
wavelengthControl.addEventListener('input', function(){
	wavelength = Number(this.value);
	freq = speed / wavelength;
	document.getElementById("freq").value = freq;
	wavenumber = 2*Math.PI / wavelength;
}, false);

let phase = 0;
const phaseControl = document.querySelector('#phase');
phaseControl.addEventListener('input', function(){
	phase = Number(this.value);
}, false);

let wavenumber = 2*Math.PI / wavelength;


let freq2 = 0.01;
const freqControl2 = document.querySelector('#freq2');
freqControl2.addEventListener('input', function(){
	freq2 = Number(this.value);
	changeSound();
	wavelength2 = 1/freq2;
	wavenumber2 = 2*Math.PI / wavelength2;
	document.getElementById("wavelength2").value = wavelength2;
}, false);

let amp2 = 10.0;
const ampControl2 = document.querySelector('#amplitude2');
ampControl2.addEventListener('input', function(){
	amp2 = Number(this.value);
	changeSound();
}, false);

let wavelength2 = 1 / freq2;
const wavelengthControl2 = document.querySelector('#wavelength2');
wavelengthControl2.addEventListener('input', function(){
	wavelength2 = Number(this.value);
	freq2 = speed / wavelength2;
	document.getElementById("freq2").value = freq2;
	wavenumber2 = 2*Math.PI / wavelength2;
}, false);

let wavenumber2 = 2*Math.PI / wavelength2;

let phase2 = 0;
const phaseControl2 = document.querySelector('#phase2');
phaseControl2.addEventListener('input', function(){
	phase2 = Number(this.value);
}, false);


let width = 3.0;
let path = document.getElementById("thePath");
const widthControl = document.querySelector('#width');
widthControl.addEventListener('input', function(){
	width = String(Number(this.value)) + "px";
	path.style.strokeWidth = width;
}, false);

animate();



//*********************************** Audio *********************************************

// Create Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var sounding = false, started=false;
var osc = ctx.createOscillator();
var osc2 = ctx.createOscillator();
var masterGainNode = ctx.createGain();
var osc1GainNode = ctx.createGain();
var osc2GainNode = ctx.createGain();
osc1GainNode.connect(masterGainNode);
osc2GainNode.connect(masterGainNode);
masterGainNode.connect(ctx.destination);
masterGainNode.gain.value = 0.5;


function makeSound(){
	if(!sounding){
	sounding = true;
	osc.frequency.value = freq*50000;
	osc2.frequency.value = freq2*50000;
	osc1GainNode.gain.value=amp/250;
	osc2GainNode.gain.value=amp2/250;
	if(!started){
		osc.connect(osc1GainNode);
		osc2.connect(osc2GainNode);
		osc.start();
		osc2.start();
		started = true;
		}
	} else {
	sounding = false;
	osc1GainNode.gain.value=0;
	osc2GainNode.gain.value=0;
	}

}

function changeSound(){
	if(sounding){
	osc1GainNode.gain.value=amp/250;
	osc2GainNode.gain.value=amp2/250;
	osc.frequency.value = freq*50000;
	osc2.frequency.value = freq2*50000;
	}
}

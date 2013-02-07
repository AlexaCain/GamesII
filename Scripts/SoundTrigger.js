#pragma strict

// player is automatically found if not given
// periods 

// IMPORTANT: Unity random values are from 0.0 (inclusive) to 1.0 (inclusive),
// so chances of 0.0 are not exactly 0, but just very, very rare.
// (note: probably need a better solution for things like footsteps)

var player:Collider = null;
var audioSource:AudioSource = null;

var soundsOnEnter:AudioClip[];
var chanceOnEnter:float = 0.0;
var enterPeriod:float = 5.0;
var enterMinVolume:float = 0.0;
var enterMaxVolume:float = 1.0;

var soundsOnExit:AudioClip[];
var chanceOnExit:float = 0.0;
var exitPeriod:float = 5.0;
var exitMinVolume:float = 0.0;
var exitMaxVolume:float = 1.0;

var soundsOnStay:AudioClip[];
var chanceOnStay:float = 0.0;
var stayPeriod:float = 1.0;
var stayMinVolume:float = 0.0;
var stayMaxVolume:float = 1.0;

private var nextEnterTime:float = 0.0;
private var nextExitTime:float = 0.0;
private var nextStayTime:float = 0.0;

function Start() {
	if (player == null) {
		// if there's no specific player object set, find one
		player = GameObject.FindWithTag("Player").collider;
		if (player == null) {
			player = GameObject.Find("First Person Controller").collider;
			if (player == null) {
				// if that didn't work, try again!
				player = GameObject.Find("Player").collider;
				if (player == null) {
					// if that STILL didn't work, report the problem
					Debug.LogError("DoorScript (on " + gameObject + "): Could not find player. Either name the player \"First Person Controller\" or \"Player\", tag it with the \"Player\" tag, or set" + gameObject + "'s DoorScript var player to the working player object.");
				}
			}
		}
	}
	if (audioSource == null) {
		audioSource = gameObject.audio;
	}
}

function OnTriggerEnter(other:Collider) {
	if (soundsOnEnter.Length != 0 && other == player) {
		if (Time.time >= nextEnterTime && audioSource.isPlaying == false) {
			nextEnterTime = Time.time;
			if (Random.value < chanceOnEnter) {
				var sound:int = Random.Range(0, soundsOnEnter.Length);
				audioSource.PlayOneShot(soundsOnEnter[sound], Random.Range(enterMinVolume, enterMaxVolume));
				nextEnterTime += soundsOnEnter[sound].length;
			}
			nextEnterTime += enterPeriod;
		}
	}
}
function OnTriggerExit(other:Collider) {
	if (soundsOnExit.Length != 0 && other == player) {
		if (Time.time >= nextExitTime && audioSource.isPlaying == false) {
			nextExitTime = Time.time;
			if (Random.value < chanceOnExit) {
				var sound:int = Random.Range(0, soundsOnExit.Length);
				audioSource.PlayOneShot(soundsOnExit[sound], Random.Range(enterMinVolume, enterMaxVolume));
				nextExitTime += soundsOnExit[sound].length;
			}
			nextExitTime += exitPeriod;
		}
	}
}
function OnTriggerStay(other:Collider) {
	if (soundsOnStay.Length != 0 && other == player) {
		if (Time.time >= nextStayTime && audioSource.isPlaying == false) {
			nextStayTime = Time.time;
			if (Random.value < chanceOnStay) {
				var sound:int = Random.Range(0, soundsOnStay.Length);
				audioSource.PlayOneShot(soundsOnStay[sound], Random.Range(enterMinVolume, enterMaxVolume));
				nextStayTime += soundsOnStay[sound].length;
			}
			nextStayTime += stayPeriod;
		}
	}
}
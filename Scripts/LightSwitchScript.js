#pragma strict

// To be attached to the object with a Mesh Collider
// anim needs to be set if the object doesn't have an animation attached to it
// player needs to be set if the player is called anything other than "First Person Controller" or "Player"
// lights are all the lights affected by this light switch.
// individual lights are just toggled, so there can be multiple lightswitches affecting multiple lights
// (however, since lights are toggled, note that they'll all be toggled at once when the lightswitch is clicked, so they're not all initially in the same state, they won't all end up in the same state either. Possible future puzzle where you have to turn all the lights off in a room?!)

var anim:Animation = null;
var isOn:boolean;
var animationStringOn:String = "On";
var animationStringOff:String = "Off";
var player:Transform = null;
var maxDistance:float = 4.5;
var lights:Light[];

function Start () {
	if (player == null) {
		// if there's no specific player object set, find one
		player = GameObject.FindWithTag("Player").transform;
		if (player == null) {
			player = GameObject.Find("First Person Controller").transform;
			if (player == null) {
				// if that didn't work, try again!
				player = GameObject.Find("Player").transform;
				if (player == null) {
					// if that STILL didn't work, report the problem
					Debug.LogError("DoorScript (on " + gameObject + "): Could not find player. Either name the player \"First Person Controller\" or \"Player\", tag it with the \"Player\" tag, or set" + gameObject + "'s DoorScript var player to the working player object.");
				}
			}
		}
	}
	if (anim == null) {
		// if we don't have an explicitly defined animation
		if (animation == null) {
			// and our game object doesn't either
			Debug.LogError("DoorScript: " + gameObject + " does not have an Animation component, and var anim has not been set.");
			Debug.Break();
		}
		else {
			// otherwise
			anim = animation;
		}
	}
	// then skip to the appropriate animation frame
	if (isOn) {
		anim.Play(animationStringOn);
		anim[animationStringOn].normalizedTime = 1;
	}
	else {
		anim.Play(animationStringOff);
		anim[animationStringOff].normalizedTime = 1;
	}
}

function OnMouseDown() {
	if (!(anim.isPlaying) && Vector3.Distance(player.position, transform.position) < maxDistance) {
		// if we're in a certain distance, and the animation isn't already going, toggle the door
		Toggle();
	}
}

function Toggle() {
	isOn = !isOn;
	if (isOn) {
		anim.Play(animationStringOn);
	}
	else {
		anim.Play(animationStringOff);
	}
	for (var light:Light in lights) {
		// toggle all attached lights as well
		light.enabled = !light.enabled;
	}
}
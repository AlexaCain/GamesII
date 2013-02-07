#pragma strict

// To be attached to the object with a Mesh Collider
// anim needs to be set if the object doesn't have an animation attached to it
// player needs to be set if the player is called anything other than "First Person Controller" or "Player"

var anim:Animation = null;
var isOpen:boolean;
var animationStringOpen:String = "Open";
var animationStringClose:String = "Close";
var player:Transform = null;
var maxDistance:float = 4.5;

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
		if (animation == null) {
			Debug.LogError("DoorScript: " + gameObject + " does not have an Animation component, and var anim has not been set.");
			Debug.Break();
		}
		else {
			anim = animation;
		}
	}
	if (isOpen) {
		anim.Play(animationStringOpen);
		anim[animationStringOpen].normalizedTime = 1;
	}
	else {
		anim.Play(animationStringClose);
		anim[animationStringClose].normalizedTime = 1;
	}
}

function OnMouseDown() {
	if (!(anim.isPlaying) && Vector3.Distance(player.position, transform.position) < maxDistance) {
		// if we're in a certain distance, and the animation isn't already going, toggle the door
		Toggle();
	}
}

function Toggle() {
	isOpen = !isOpen;
	if (isOpen) {
		anim.Play(animationStringOpen);
	}
	else {
		anim.Play(animationStringClose);
	}
}
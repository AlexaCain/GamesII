#pragma strict

// MapButton.js
// Makes a map appear on the screen when the "m" key is pressed. (if buttonName is set, it uses that instead)
// Programattically creates a GUITexture if only a Texture is given, though a GUITexture can be given instead if more control is desired

var texture:Texture;
var mapTexture:GUITexture;
var buttonName:String = "";
var initialState:boolean = false;
private var buttonHeld:boolean = false;

function Start () {
	if (texture != null && mapTexture != null) {
		// this is okay, but report the fact
		Debug.LogWarning("MapButton script on " + gameObject + " has a Texture and a GUITexture, and only needs one.");
	}
	else if (texture == null && mapTexture == null) {
		// this is NOT OK
		Debug.Break();
		Debug.LogError("MapButton script on " + gameObject + " has neither a Texture more a GUITexture, and needs one.");
		
	}
	else if (mapTexture == null) {
		// make a GUITexture if we aren't given one
		var textureObject:GameObject = new GameObject("MapButtonMap");
		mapTexture = textureObject.AddComponent("GUITexture");
		mapTexture.texture = texture;
		textureObject.transform.position = Vector3(0.5, 0.5, 0);
		textureObject.transform.localScale = Vector3(1, 1, 1);
	}
	// otherwise, we'll just use the GUITexture we're given
	if (mapTexture != null) {
		// set the initial state of our mapTexture (if we have one)
		mapTexture.enabled = initialState;
	}
}

function Update () {
	if (buttonName == "") {
		// If a virtual button isn't given, default to "m"
		if (!buttonHeld && Input.GetKeyDown("m")) {
			buttonHeld = true;
			Toggle();
		}
		else if (buttonHeld && Input.GetKeyUp("m")) {
			buttonHeld = false;
		}
	}
	else {
		// otherwise, use the virtual button
		if (!buttonHeld && Input.GetButtonDown(buttonName)) {
			buttonHeld = true;
			Toggle();
		}
		else if (buttonHeld && Input.GetButtonUp(buttonName)) {
			buttonHeld = false;
		}
	}
}

function Toggle () {
	Set(!(mapTexture.enabled));
}

function Set (state:boolean) {
	mapTexture.enabled = state;
}
/**
 * The EventSystem is used to communicate between client packages and to the server.
 */
declare interface EventSystem {
    /**
     * Adds an event handler
     * @param {string} name
     * @param {(...parameters: any[]) => any} handler
     *
     * @example jcmp.events.Add('MyEvent', () => {
     *   console.log('hello world!');
     * });
     * 
     */
    Add(name: string, handler: (...parameters: any[]) => any): EventInstance
    
    /**
     * Calls an Event.
     * >
     * > This function always returns an array with all return values from all event handlers for that name.
     * 
     * @param {string} name
     * @param {any} args
     *
     * @example jcmp.events.Add('MyEvent', (x = 1) => {
     *   console.log(`the value of x is ${x}`);
     *   return x;
     * });
     * jcmp.events.Call('MyEvent'); // the value of x is 1
     * jcmp.events.Call('MyEvent', 5); // the value of x is 5
     * 
     * var ret = jcmp.events.Call('MyEvent');
     * // ret = [1]
     * 
     */
    Call(name: string, ...args: Array<any>): Array<any>
    
    /**
     * @param {EventInstance} p1
     *
     */
    Remove(p1: EventInstance): any
    
    /**
     * @param {string} p1
     *
     */
    RemoveAll(p1: string): any
    
    /**
     * Adds an event that can be called from the server.
     * @param {string} name
     * @param {(...parameters: any[]) => any} handler
     *
     * @example jcmp.events.AddRemoteCallable('MyEvent', () => {
     *   print(`the server called MyEvent!`);
     * });
     * 
     */
    AddRemoteCallable(name: string, handler: (...parameters: any[]) => any): any
    
    /**
     * Calls an Event on the server scripts. Other than the normal `Call` function, this function does not return anything.
     * @param {string} name
     * @param {any} args
     *
     * @example // see the serverside documentation of EventSystem#AddRemoteCallable
     * jcmp.events.CallRemote('MyEvent');
     * 
     */
    CallRemote(name: string, ...args: Array<any>): any
    
    /**
     * Called when a {Player} enters a {Checkpoint}
     */
    Add(name: 'CheckpointEnter', handler: (checkpoint: Checkpoint) => any): void;
    
    /**
     * Called when a {Player} leaves a {Checkpoint}
     */
    Add(name: 'CheckpointLeave', handler: (checkpoint: Checkpoint) => any): void;
    
    /**
     * This event is called when a teleport has been requested.
     */
    Add(name: 'GameTeleportInitiated', handler: () => any): void;
    
    /**
     * This event is called when the map is fully loaded after teleporting.
     */
    Add(name: 'GameTeleportCompleted', handler: () => any): void;
    
    /**
     * This event is called when the game 2D rendering has started. This is the perfect place to render to the screen.
     */
    Add(name: 'GameUpdateRender', handler: (scriptingRenderer: Renderer) => any): void;
    
    /**
     * Called every frame (please ask Alex for more details please, we'll appreciate it a lot)
     */
    Add(name: 'GameRender', handler: (scriptingRenderer: Renderer) => any): void;
    
    /**
     * This event is called when the game 2D rendering has started. This is the perfect place to render to the screen.
     */
    Add(name: 'Render', handler: (scriptingRenderer: Renderer) => any): void;
    
    Add(name: 'PackageLoaded', handler: (package: Package) => any): void;
    
    Add(name: 'ScriptError', handler: (file: string, line: number, error: any, stringtrace: any) => any): void;
    
    /**
     * Called when the client approved the requested websites (referenced in package.json)
     */
    Add(name: 'WebsitesApproved', handler: (websites: Array<string>) => any): void;
    
}

declare interface Renderer {
    readonly viewportSize: Vector2f;
    
    readonly dtf: number;
    
    /**
     * @param {boolean} enabled
     *
     */
    EnableCulling(enabled: boolean): any
    
    /**
     * Sets the matrix that describes the coordinate system the renderer is drawing to.
     * @param {Matrix} matrix
     *
     */
    SetTransform(matrix: Matrix): any
    
    /**
     * Draws a text to the screen or world.
     * @param {string} text
     * @param {Vector3f} position
     * @param {Vector2f} maxSize
     * @param {RGBA} color
     * @param {number} fontSize
     * @param {string} fontName
     *
     */
    DrawText(text: string, position: Vector3f, maxSize: Vector2f, color: RGBA, fontSize: number, fontName: string): any
    
    /**
     * Returns the physical dimensions of a text.
     * @param {string} text
     * @param {number} fontSize
     * @param {string} fontName
     *
     */
    MeasureText(text: string, fontSize: number, fontName: string): Vector2f
    
    /**
     * Draws a rectangle (behaves similarly to DrawText).
     * @param {Vector3f | Vector2f} position
     * @param {Vector2f} size
     * @param {RGBA} color
     *
     */
    DrawRect(position: Vector3f | Vector2f, size: Vector2f, color: RGBA): any
    
    /**
     * Draws a rectangle (behaves similarly to DrawText).
     * @param {Vector3f | Vector2f} start
     * @param {Vector3f | Vector2f} end
     * @param {RGBA} color
     *
     */
    DrawLine(start: Vector3f | Vector2f, end: Vector3f | Vector2f, color: RGBA): any
    
    /**
     * Draws a texture object.
     * @param {Texture} texture
     * @param {Vector3f | Vector2f} position
     * @param {Vector2f} size
     *
     */
    DrawTexture(texture: Texture, position: Vector3f | Vector2f, size: Vector2f): any
    
    /**
     * @param {Vector3f} p1
     *
     */
    WorldToScreen(p1: Vector3f): Vector2f
    
}

declare interface Checkpoint {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    /**
     * model hash of the Checkpoint _(TODO: reference to all hashes)_
     */
    readonly modelHash: number;
    
    readonly type: number;
    
    /**
     * the Checkpoint's position in the game world
     */
    position: Vector3f;
    
    /**
     * the Checkpoint's rotation in the game world
     */
    rotation: Vector3f;
    
    radius: number;
    
    /**
     * whether the Checkpoint is visible to all Players.
     */
    visible: boolean;
    
    /**
     * Destroys the Checkpoint
     */
    Destroy(): any
    
}

declare interface Vector3f {
    /**
     * X value
     */
    x: number;
    
    /**
     * Y value
     */
    y: number;
    
    /**
     * Z value
     */
    z: number;
    
    /**
     * length of the Vector3f
     */
    readonly length: number;
    
    constructor(x?: number, y?: number, z?: number): Vector3f;
    
    /**
     * @param {Vector3f} vec
     *
     */
    mul(vec: Vector3f): Vector3f
    
    /**
     * @param {Vector3f} vec
     *
     */
    div(vec: Vector3f): Vector3f
    
    /**
     * @param {Vector3f} vec
     *
     */
    sub(vec: Vector3f): Vector3f
    
    /**
     * @param {Vector3f} vec
     *
     */
    add(vec: Vector3f): Vector3f
    
}

declare interface WebUIWindow {
    /**
     * the size of the CEF UI window
     */
    size: Vector2;
    
    /**
     * the location of the page which CEF should load
     */
    location: string;
    
    /**
     * whether the UI should be hidden or not
     */
    hidden: boolean;
    
    /**
     * the WebUIWindow's position in the game world
     */
    position: Vector2;
    
    /**
     * whether the CEF UI should resize itself when the game resolution is changed or not
     */
    autoResize: boolean;
    
    /**
     * whether mouse input should be captured by the CEF UI or not
     */
    captureMouseInput: boolean;
    
    /**
     * the CEF UI texture
     */
    readonly texture: Texture;
    
    /**
     * whether the texture is automatically drawn by the renderer or not
     */
    autoRenderTexture: boolean;
    
    constructor(name: string, location: string, size: Vector2): WebUIWindow;
    
    /**
     * Brings the CEF UI to the front
     * @example function createMyUI() {
     *   var firstUI = new WebUIWindow("myFirstUI", "package://my_client_package/index1.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
     *   var secondUI = new WebUIWindow("mySecondUI", "package://my_client_package/index2.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
     * 
     *   //Brings "myFirstUI" to the front so it is visible
     *   //Without this, we would see the second created UI on top and not the first one
     *   firstUI.BringToFront();
     * }
     * createMyUI();           
     * 
     */
    BringToFront(): any
    
    /**
     * Reload a certain CEF UI
     * @param {boolean} ignoreCache
     *
     * @example function createMyUI() {
     *   var myUI = new WebUIWindow("myUI", "package://my_client_package/index1.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
     * 
     *   //Change the location property and force the UI to reload
     *   myUI.location = "package://my_client_package/index2.html";
     *   myUI.Reload(true);
     * }
     * createMyUI();
     * 
     */
    Reload(ignoreCache: boolean): any
    
    /**
     * Calls an Event on the UI that has been added using `jcmp.AddEvent`
     * @param {string} name
     * @param {any} args
     *
     */
    CallEvent(name: string, ...args: Array<any>): undefined
    
    /**
     * Adds an Event Handler so the UI can call it using `jcmp.CallLocalEvent`
     * @param {string} name
     * @param {(...parameters: any[]) => any} handler
     *
     */
    AddEvent(name: string, handler: (...parameters: any[]) => any): undefined
    
    /**
     * Destroys the WebUIWindow
     */
    Destroy(): any
    
}

declare interface RGB {
    /**
     * red channel value (0-255)
     */
    r: number;
    
    /**
     * green channel value (0-255)
     */
    g: number;
    
    /**
     * blue channel value (0-255)
     */
    b: number;
    
    constructor(r?: number, g?: number, b?: number): RGB;
    
}

declare interface EventInstance {
    oneShot: boolean;
    
}

declare interface Texture {
    baseColor: RGBA;
    
    size: Vector2f;
    
    constructor(file: string): Texture;
    
}

/**
 * Global JCMP class. Use {jcmp} in your script.
 */
declare interface JCMPNamespace {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    /**
     * all loaded packages
     */
    readonly packages: Array<Package>;
    
    /**
     * event system
     */
    readonly events: EventSystem;
    
    /**
     * the current network version of the server
     */
    readonly networkVersion: number;
    
    readonly version: string;
    
    readonly approvedWebsites: Array<any>;
    
    readonly ui: JCMPUINamespace;
    
    readonly viewportSize: Vector2f;
    
    readonly localPlayer: LocalPlayer;
    
    /**
     * all players
     */
    readonly players: Array<NetworkPlayer>;
    
    readonly world: World;
    
    readonly settings: Settings;
    
    readonly vehicles: Array<any>;
    
    /**
     * Prints a message to scripting.log.
     * @param {string} message
     *
     */
    print(message: string): any
    
    /**
     * Outputs message to a specified file.
     * @param {string} filename
     * @param {string} message
     *
     */
    printLog(filename: string, message: string): any
    
}

/**
 * A scripting package that is available or running already
 */
declare interface Package {
    /**
     * the Package's name
     */
    readonly name: string;
    
    /**
     * the path to the package
     */
    readonly dir: string;
    
    /**
     * whether the configuration of the package is valid
     */
    readonly valid: boolean;
    
    /**
     * JSON-encoded string of the package.json
     */
    readonly config: string;
    
    /**
     * Starts the package
     * @example //Start all the packages
     * function main(){
     *   jcmp.packages.forEach(p => {
     *     p.Start()
     *   });
     * }
     * main();   
     * 
     */
    Start(): boolean
    
    /**
     * Stops the package
     * @example //Stop all the packages
     * function main(){
     *   jcmp.packages.forEach(p => {
     *     p.Stop()
     *   });
     * }
     * main(); 
     * 
     */
    Stop(): any
    
}

declare interface Vector2 {
    /**
     * X value
     */
    x: number;
    
    /**
     * Y value
     */
    y: number;
    
    /**
     * length of the Vector2
     */
    readonly length: number;
    
    constructor(x?: number, y?: number): Vector2;
    
}

declare interface JCMPUINamespace {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    /**
     * @param {string} p1
     * @param {(...parameters: any[]) => any} p2
     *
     */
    AddEvent(p1: string, p2: (...parameters: any[]) => any): any
    
    /**
     * @param {string} p1
     * @param {Array<any>} p2
     *
     */
    CallEvent(p1: string, p2: Array<any>): any
    
    ShowHud(): any
    
    HideHud(): any
    
    IsHudVisible(): boolean
    
}

declare interface RGBA {
    /**
     * red channel value (0-255)
     */
    readonly r: number;
    
    /**
     * green channel value (0-255)
     */
    readonly g: number;
    
    /**
     * blue channel value (0-255)
     */
    readonly b: number;
    
    /**
     * alpha channel value (0-255)
     */
    readonly a: number;
    
    constructor(r?: number, g?: number, b?: number, a?: number): RGBA;
    
}

declare interface Vector4 {
    /**
     * X value
     */
    x: number;
    
    /**
     * Y value
     */
    y: number;
    
    /**
     * Z value
     */
    z: number;
    
    /**
     * W value
     */
    w: number;
    
    /**
     * length of the Vector4
     */
    readonly length: number;
    
    constructor(x?: number, y?: number, z?: number, w?: number): Vector4;
    
}

declare interface Vector2f {
    /**
     * X value
     */
    x: number;
    
    /**
     * Y value
     */
    y: number;
    
    /**
     * length of the Vector2f
     */
    readonly length: number;
    
    constructor(x?: number, y?: number): Vector2f;
    
    /**
     * @param {Vector2f} vec
     *
     */
    mul(vec: Vector2f): Vector2f
    
    /**
     * @param {Vector2f} vec
     *
     */
    div(vec: Vector2f): Vector2f
    
    /**
     * @param {Vector2f} vec
     *
     */
    sub(vec: Vector2f): Vector2f
    
    /**
     * @param {Vector2f} vec
     *
     */
    add(vec: Vector2f): Vector2f
    
}

declare interface Vector3 {
    /**
     * X value
     */
    x: number;
    
    /**
     * Y value
     */
    y: number;
    
    /**
     * Z value
     */
    z: number;
    
    /**
     * length of the Vector3
     */
    readonly length: number;
    
    constructor(x?: number, y?: number, z?: number): Vector3;
    
}

declare interface Matrix {
    /**
     * the Matrix's position in the game world
     */
    readonly position: Vector3f;
    
    constructor(): Matrix;
    
    Transpose(): Matrix
    
    /**
     * @param {Vector3f} scale
     *
     */
    Scale(scale: Vector3f): Matrix
    
    /**
     * @param {number} factor
     * @param {Vector3f} rotation
     *
     */
    Rotate(factor: number, rotation: Vector3f): Matrix
    
    /**
     * @param {Vector3f} translation
     *
     */
    Translate(translation: Vector3f): Matrix
    
    /**
     * @param {Vector3f} p1
     * @param {Vector3f} p2
     * @param {Vector3f} p3
     *
     */
    LookAt(p1: Vector3f, p2: Vector3f, p3: Vector3f): Matrix
    
    /**
     * @param {Matrix} p1
     *
     */
    mul(p1: Matrix): Matrix
    
    /**
     * @param {Matrix} p1
     *
     */
    div(p1: Matrix): Matrix
    
    /**
     * @param {Matrix} p1
     *
     */
    sub(p1: Matrix): Matrix
    
    /**
     * @param {Matrix} p1
     *
     */
    add(p1: Matrix): Matrix
    
}

declare interface Vector4f {
    /**
     * X value
     */
    x: number;
    
    /**
     * Y value
     */
    y: number;
    
    /**
     * Z value
     */
    z: number;
    
    /**
     * W value
     */
    w: number;
    
    /**
     * length of the Vector4f
     */
    readonly length: number;
    
    constructor(x?: number, y?: number, z?: number, w?: number): Vector4f;
    
    /**
     * @param {Vector4f} vec
     *
     */
    mul(vec: Vector4f): Vector4f
    
    /**
     * @param {Vector4f} vec
     *
     */
    div(vec: Vector4f): Vector4f
    
    /**
     * @param {Vector4f} vec
     *
     */
    sub(vec: Vector4f): Vector4f
    
    /**
     * @param {Vector4f} vec
     *
     */
    add(vec: Vector4f): Vector4f
    
}

declare interface LocalPlayer {
    /**
     * the LocalPlayer's position in the game world
     */
    position: Vector3f;
    
    /**
     * the LocalPlayer's rotation in the game world
     */
    rotation: Vector3f;
    
    readonly lookAt: Vector3f;
    
    /**
     * the players camera object
     */
    readonly camera: Camera;
    
    /**
     * Whether the players character is frozen or not
     */
    frozen: boolean;
    
    /**
     * Whether the player can control his character or not
     */
    controlsEnabled: boolean;
    
    baseState: number;
    
    /**
     * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
     */
    readonly networkId: number;
    
    /**
     * world dimension of the LocalPlayer.
     */
    readonly dimension: number;
    
    readonly playerStateBits1: number;
    
    readonly playerStateBits2: number;
    
    readonly wingsuit: Wingsuit;
    
    readonly healthEffects: HealthEffect;
    
    /**
     * Enable the local player to use certain ingame abilities
     * 
     * #### Available abilities
     * | Name | Value |
     * |:-----|:------|
     * |GRAPPLING_HOOK|0xCB836D80|
     * |PARACHUTE|0xCEEFA27A|
     * |WINGSUIT|0xE060F641|
     * 
     * @param {number} ability
     * @param {boolean} enabled
     *
     * @example function disableAllAbilities(){
     *   jcmp.localPlayer.SetAbilityEnabled(0xCB836D80, false); //Disable grappling
     *   jcmp.localPlayer.SetAbilityEnabled(0xCEEFA27A, false); //Disable parachute
     *   jcmp.localPlayer.SetAbilityEnabled(0xE060F641, false); //Disable wingsuit
     * }
     * disableAllAbilities();           
     * 
     */
    SetAbilityEnabled(ability: number, enabled: boolean): void
    
    /**
     * Check if a certain ingame ability has been enabled for the local player or not
     * @param {number} ability
     *
     * @example function isWingsuitEnabled(){
     *   if(jcmp.localPlayer.IsAbilityEnabled(0xE060F641) == true){
     *     //The Wingsuit is enabled, execute code here
     *   }
     * }
     * isWingsuitEnabled();          
     * 
     */
    IsAbilityEnabled(ability: number): boolean
    
    /**
     * returns the render position
     * @param {number} dtf
     *
     */
    GetRenderPosition(dtf: number): Vector3f
    
    /**
     * returns the render transform matrix
     * @param {number} dtf
     *
     */
    GetRenderTransform(dtf: number): Matrix
    
    /**
     * returns the bone transform matrix
     * 
     * #### Available bones
     * | Name | Value |
     * |:-----|:------|  
     * |REFERENCE|0x8EB2FD7C|
     * |OFFSET|0x4AAA87DB|
     * |HIPS|0x68C6A89F|
     * |SPINE|0xE28C84B|
     * |SPINE_2|0xE4DBE36F|
     * |SPINE_3|0x6FE84908|
     * |STERNUM|0x9DCAB8BF|
     * |NECK|0xA1C96158|
     * |HEAD|0xA877D9CC|
     * |JAW|0x92F8D847|
     * |MID_LOWER_LIP|0xEA3E047C|
     * |LEFT_MOUTH_CORNER|0xE9F7F4C9|
     * |RIGHT_MOUTH_CORNER|0xF8C71902|
     * |NOSE|0x4495EABA|
     * |MID_UPPER_LIP|0x87AE44CB|
     * |UPPER_LIDS|0xC851BC59|
     * |LOWER_LIDS|0x9ED86F9E|
     * |LEFT_EYEBROW_MID|0xD3FBF46E|
     * |RIGHT_EYEBROW_MID|0xE75361A8|
     * |LEFT_EYE|0x96A32E27|
     * |RIGHT_EYE|0x24FA932B|
     * |LEFT_SHOULDER|0x8735207D|
     * |LEFT_ARM|0x4DF0A2B1|
     * |LEFT_FORE_ARM|0xDEB7751B|
     * |LEFT_HAND|0x57C83F95|
     * |LEFT_HAND_ATTACH|0x4190BFF7|
     * |LEFT_HAND_THUMB|0x3C7AC14F|
     * |LEFT_HAND_THUMB_2|0xEF65A0C0|
     * |LEFT_HAND_THUMB_3|0x2EF7C25D|
     * |LEFT_HAND_INDEX|0xFC8B8AE8|
     * |LEFT_HAND_INDEX_2|0xB275E0DC|
     * |LEFT_HAND_INDEX_3|0xA02A2C09|
     * |LEFT_HAND_MIDDLE|0x9B641407|
     * |LEFT_HAND_MIDDLE_2|0xBB9B9265|
     * |LEFT_HAND_MIDDLE_3|0x40553E55|
     * |LEFT_IN_HAND_RING|0xF64929C5|
     * |LEFT_HAND_RING|0xDF6E85D2|
     * |LEFT_HAND_RING_2|0xADD7F8D8|
     * |LEFT_HAND_RING_3|0x37EDFBE6|
     * |LEFT_IN_HAND_PINKY|0x142B3DFF|
     * |LEFT_HAND_PINKY|0xC104DEE3|
     * |LEFT_HAND_PINKY_2|0x869AB17|
     * |LEFT_HAND_PINKY_3|0xE3BBD91D|
     * |LEFT_HAND_ATTACH_2|0x7DC90FBE|
     * |LEFT_FORE_ARM_ROLL|0x9C12B794|
     * |RIGHT_SHOULDER|0x302EEE80|
     * |RIGHT_ARM|0x19D4B6CF|
     * |RIGHT_FORE_ARM|0xBD2F01EA|
     * |RIGHT_HAND|0x69E77FA6|
     * |RIGHT_HAND_ATTACH|0x65C5D2EB|
     * |RIGHT_HAND_THUMB|0x8F745C4E|
     * |RIGHT_HAND_THUMB_2|0xFADC7D09|
     * |RIGHT_HAND_THUMB_3|0xACA0D4E6|
     * |RIGHT_HAND_INDEX|0xB26EE68B|
     * |RIGHT_HAND_INDEX_2|0xE64CD51C|
     * |RIGHT_HAND_INDEX_3|0x3D143817|
     * |RIGHT_HAND_MIDDLE|0x3EF00B1A|
     * |RIGHT_HAND_MIDDLE_2|0x4DD19349|
     * |RIGHT_HAND_MIDDLE_3|0x92662F93|
     * |RIGHT_IN_HAND_RING|0x422FF300|
     * |RIGHT_HAND_RING|0xC4351CB|
     * |RIGHT_HAND_RING_2|0x7165D1D3|
     * |RIGHT_HAND_RING_3|0x2EE173DF|
     * |RIGHT_IN_HAND_PINKY|0x153AD952|
     * |RIGHT_HAND_PINKY|0x477CE2E|
     * |RIGHT_HAND_PINKY_2|0x197F6405|
     * |RIGHT_HAND_PINKY_3|0x7A36193E|
     * |RIGHT_HAND_ATTACH_2|0x8A9856CD|
     * |RIGHT_FORE_ARM_ROLL|0xC9FC0323|
     * |BACK_ATTACH|0x204A8793|
     * |BACK_ATTACH_2|0xB7D0AD64|
     * |LEFT_UP_LEG|0x26392BC2|
     * |LEFT_LEG|0x782BF8F9|
     * |LEFT_FOOT|0x661134AC|
     * |LEFT_TOE_BASE|0xB31EE9AA|
     * |LEFT_LEG_ROLL|0x84D5F65C|
     * |LEFT_HOLSTER_ATTACH|0x63ABE53F|
     * |LEFT_UP_LEG_ROLL|0x7CA59BC0|
     * |RIGHT_UP_LEG|0x8F232B15|
     * |RIGHT_LEG|0xA89A815D|
     * |RIGHT_FOOT|0xFF3E004B|
     * |RIGHT_TOE_BASE|0xDD2D6F75|
     * |RIGHT_LEG_ROLL|0xCFA333AA|
     * |RIGHT_HOLSTER_ATTACH|0x7BD7F313|
     * |RIGHT_UP_LEG_ROLL|0x272175A5|
     * |LEFT_HAND_IK_TARGET|0xA73E08C1|
     * |RIGHT_HAND_IK_TARGET|0xF7EEABA9|
     * 
     * @param {number} boneid
     * @param {number} dtf
     *
     */
    GetBoneTransform(boneid: number, dtf: number): Matrix
    
}

/**
 * Network Player
 */
declare interface NetworkPlayer {
    /**
     * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
     */
    readonly networkId: number;
    
    /**
     * the NetworkPlayer's name
     */
    readonly name: string;
    
    /**
     * the NetworkPlayer's current health
     */
    readonly health: number;
    
    /**
     * the NetworkPlayer's max health
     */
    readonly maxHealth: number;
    
    readonly localPlayer: boolean;
    
    /**
     * the NetworkPlayer's position in the game world
     */
    readonly position: Vector3f;
    
    /**
     * the NetworkPlayer's rotation in the game world
     */
    readonly rotation: Vector3f;
    
    readonly playerStateBits1: number;
    
    readonly playerStateBits2: number;
    
    /**
     * @param {number} p1
     * @param {number} p2
     *
     */
    GetBoneTransform(p1: number, p2: number): Matrix
    
    /**
     * @param {number} p1
     *
     */
    GetRenderTransform(p1: number): Matrix
    
}

declare interface TimeOfDay {
    readonly hour: number;
    
    readonly minute: number;
    
    readonly second: number;
    
}

/**
 * Class to manipulate the game world.
 */
declare interface World {
    /**
     * weather id __(TODO: link weather types)__
     */
    weather: number;
    
    weatherVisible: boolean;
    
    /**
     * RGBA color of the moon
     */
    moonColor: RGBA;
    
    /**
     * 2D position of the sun
     */
    sunPosition: Vector2f;
    
    sunHDRScale: number;
    
    /**
     * RGBA color of the sun
     */
    sunColor: RGBA;
    
    readonly time: TimeOfDay;
    
    /**
     * Sets the local world time
     * @param {number} hour
     * @param {number} minute
     * @param {number} p3
     *
     */
    SetTime(hour: number, minute: number, p3: number): any
    
    /**
     * resets the suns position
     */
    ResetSunPosition(): any
    
}

declare interface Camera {
    /**
     * the Camera's position in the game world
     */
    position: Vector3f;
    
    /**
     * the Camera's rotation in the game world
     */
    rotation: Vector3f;
    
    /**
     * the cameras field of view
     */
    fieldOfView: number;
    
    /**
     * Whether the camera is attached to the local player or it can be set somewhere else
     */
    attachedToPlayer: boolean;
    
}

/**
 * Just don't use it for now.
 */
declare interface Settings {
    /**
     * @param {string} p1
     * @param {any} p2
     *
     */
    Set(p1: string, p2: any): any
    
    /**
     * @param {string} p1
     *
     */
    Get(p1: string): any
    
    /**
     * @param {string} p1
     *
     */
    Exists(p1: string): boolean
    
    /**
     * @param {string} p1
     *
     */
    Delete(p1: string): boolean
    
    /**
     * Destroys the Settings
     */
    Destroy(): any
    
}

/**
 * Local Player Wingsuit
 */
declare interface Wingsuit {
    boostEnabled: boolean;
    
    /**
     * Boost Cooldown, _the game might reset the values if they are above 7, so the property might return a wrong value_
     */
    boostCooldown: number;
    
    /**
     * Boost Duration, _the game might reset the values if they are above 7, so the property might return a wrong value_
     */
    boostDuration: number;
    
    /**
     * Boost Power, _the game might reset the values if they are above 7, so the property might return a wrong value_
     */
    boostPower: number;
    
    /**
     * Destroys the Wingsuit
     */
    Destroy(): any
    
}

declare interface HealthEffect {
    regenRate: number;
    
    regenCooldown: number;
    
    /**
     * Destroys the HealthEffect
     */
    Destroy(): any
    
}

declare interface POI {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    type: number;
    
    progress: number;
    
    progressMax: number;
    
    /**
     * the POI's position in the game world
     */
    position: Vector3f;
    
    minDistance: number;
    
    maxDistance: number;
    
    text: string;
    
    /**
     * whether the POI is visible to all Players.
     */
    visible: boolean;
    
    flashing: boolean;
    
    clampedToScreen: boolean;
    
    /**
     * Destroys the POI
     */
    Destroy(): any
    
}

declare interface NetworkVehicle {
    /**
     * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
     */
    readonly networkId: number;
    
    /**
     * the NetworkVehicle's current health
     */
    readonly health: number;
    
    /**
     * the NetworkVehicle's max health
     */
    readonly maxHealth: number;
    
    readonly aabb: Array<any>;
    
    /**
     * the NetworkVehicle's position in the game world
     */
    readonly position: Vector3f;
    
    /**
     * the NetworkVehicle's rotation in the game world
     */
    readonly rotation: Vector3f;
    
    readonly angularVelocity: Vector3f;
    
    readonly linearVelocity: Vector3f;
    
    readonly aimPosition: Vector3f;
    
    readonly engineRPM: number;
    
    readonly type: number;
    
    /**
     * model hash of the NetworkVehicle _(TODO: reference to all hashes)_
     */
    readonly modelHash: number;
    
    readonly gear: any;
    
    readonly nitroEnabled: boolean;
    
    readonly turboJumpEnabled: boolean;
    
    readonly speedKph: number;
    
    /**
     * @param {number} p1
     *
     */
    GetRenderTransform(p1: number): Matrix
    
}

/**
 * Global instance of {JCMPNamespace}.
 */
declare const jcmp: JCMPNamespace


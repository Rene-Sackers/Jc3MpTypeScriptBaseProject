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

declare interface CarHandlingEngineTransmission {
    gears: number;
    
    nitrousGears: number;
    
    sequential: number;
    
    manualClutch: number;
    
    manualClutchBlendRpm: number;
    
    manualClutchBlendTime: number;
    
    forwardRatioPercentage: number;
    
    lowGearForwardRatioPct: number;
    
    topSpeed: number;
    
    lowGearsFinalDrive: number;
    
    finalDrive: number;
    
    reverseUsesForwardGears: number;
    
    reverseGearRatio: number;
    
    clutchDelay: number;
    
    decayTimeToCruiseRpm: number;
    
    targetCruiseRpm: number;
    
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
     * the server instance
     */
    readonly server: Server;
    
    /**
     * the current network version of the server
     */
    readonly networkVersion: number;
    
    readonly version: string;
    
    /**
     * all connected players
     */
    readonly players: Array<Player>;
    
    /**
     * all spawned vehicles
     */
    readonly vehicles: Array<Vehicle>;
    
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

/**
 * The EventSystem is used to communicate between server packages and to clients.
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
     * Adds an event that can be called from client scripts.
     * >
     * > The first argument in the handler is the Player from where the event is being called.
     * 
     * @param {string} name
     * @param {(...parameters: any[]) => any} handler
     *
     * @example jcmp.events.AddRemoteCallable('MyEvent', player => {
     *   console.log(`${player.name} called MyEvent!`);
     * });
     * 
     */
    AddRemoteCallable(name: string, handler: (...parameters: any[]) => any): any
    
    /**
     * Calls an Event on the client side to one or all Players. Other than the normal `Call` function, this function does not return anything.
     * @param {string} name
     * @param {Player | null} target
     * @param {any} args
     *
     * @example // see the clientside documentation of EventSystem#AddRemoteCallable
     * jcmp.events.Add('PlayerReady', player => {
     *   jcmp.events.CallRemote('MyEvent', player);
     * });
     * 
     */
    CallRemote(name: string, target: Player | null, ...args: Array<any>): any
    
    Add(name: 'PlayerReady', handler: (player: Player) => any): void;
    
    Add(name: 'PlayerRespawn', handler: (player_scripting_component: Player) => any): void;
    
    Add(name: 'PlayerDeath', handler: (player_scripting_component: Player, killer_scripting_component: any, reason: number) => any): void;
    
    /**
     * called when a {Player} enters a {Vehicle}.
     */
    Add(name: 'PlayerVehicleEntered', handler: (player: any, vehicle: Vehicle, seatIndex: number) => any): void;
    
    Add(name: 'PlayerVehicleSeatChange', handler: (this: any, vehicle: Vehicle, seatIndex: number, seat_index: Player) => any): void;
    
    Add(name: 'PlayerVehicleExited', handler: (this: any, old_vehicle: Vehicle, seat_index: Player) => any): void;
    
    Add(name: 'PlayerHijackVehicle', handler: (occupant: Player, entity: Vehicle, current_player_scripting: Player) => any): void;
    
    Add(name: 'VehicleDestroyed', handler: (vehicle: Vehicle) => any): void;
    
    Add(name: 'VehicleCreated', handler: (vehicle: Vehicle) => any): void;
    
    /**
     * called when a {Vehicle} is exploded.
     */
    Add(name: 'VehicleExploded', handler: (vehicle: Vehicle) => any): void;
    
    Add(name: 'PlayerCreated', handler: (player: Player) => any): void;
    
    Add(name: 'PlayerDestroyed', handler: (player: Player) => any): void;
    
    /**
     * Called when a {RemoteClient} tries to connect to the {Server}
     */
    Add(name: 'ClientConnectRequest', handler: (playerName: string, ipAddress: string) => any): void;
    
    /**
     * Called when a {RemoteClient} connected to the {Server}
     */
    Add(name: 'ClientConnected', handler: (client: RemoteClient) => any): void;
    
    /**
     * Called when a {RemoteClient} disconnected from the {Server}
     */
    Add(name: 'ClientDisconnected', handler: (client: RemoteClient, reason: number) => any): void;
    
    Add(name: 'PackageLoaded', handler: (package: Package) => any): void;
    
    Add(name: 'ScriptError', handler: (file: string, line: number, error: any, stringtrace: any) => any): void;
    
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

declare interface BoatHandlingSteeringSteeringFilter {
    tToFullInputMinSpeedS: number;
    
    tToFullInputMaxSpeedS: number;
    
    inputStartSpeedKmph: number;
    
    inputMaxSpeedKmph: number;
    
    counterinputSpeedFactor: number;
    
    zeroinputSpeedFactor: number;
    
    inputSpeedcurveFalloff: number;
    
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

declare interface BoatHandlingPropellers {
    maxThrust: number;
    
    maxRpm: number;
    
    maxReverseRpm: number;
    
    diameter: number;
    
    pitch: number;
    
    dockingControls: BoatHandlingPropellersDockingControls;
    
}

declare interface CarHandlingLandGlobal {
    linearDampingX: number;
    
    linearDampingY: number;
    
    linearDampingZ: number;
    
    gravityMultiplierGrounded: number;
    
    gravityMultiplierInAirUp: number;
    
    gravityMultiplierInAirDown: number;
    
    takeoffPitchDamping: number;
    
    frontWheelsDamage: CarHandlingLandGlobalWheelDamage;
    
    rearWheelsDamage: CarHandlingLandGlobalWheelDamage;
    
    drift: CarHandlingLandGlobalDrift;
    
    arcade: CarHandlingLandGlobalArcade;
    
}

/**
 * Represents an argument(_flag_) that has been passed to the server (`-name=value`)
 */
declare interface Argument {
    /**
     * Argument name
     */
    key: string;
    
    /**
     * Argument value
     */
    value: string;
    
    constructor(key?: string, value?: string): Argument;
    
}

declare interface VehicleHandling {
    readonly car: CarHandling;
    
    readonly boat: BoatHandling;
    
    readonly helicopter: HelicopterHandling;
    
    readonly plane: PlaneHandling;
    
    readonly bike: BikeHandling;
    
    Apply(): any
    
}

/**
 * Information about the Server
 */
declare interface Server {
    /**
     * Server Arguments (flags)
     */
    readonly args: Array<Argument>;
    
    /**
     * JSON-encoded string of the config.json
     */
    readonly config: string;
    
    /**
     * server fps
     */
    readonly currentTickRate: number;
    
    /**
     * connected clients
     */
    readonly clients: Array<RemoteClient>;
    
    /**
     * Stops the Server
     * @example jcmp.server.Stop();
     * 
     */
    Stop(): any
    
    /**
     * Restarts the Server
     * @example jcmp.server.Restart();
     * 
     */
    Restart(): any
    
    /**
     * Adds a handler for the server input (console input)
     * @param {(...parameters: any[]) => any} handler
     *
     * @example jcmp.server.AddInputHandler(text => {
     *   console.log(`input: ${text}`);
     * });
     * 
     */
    AddInputHandler(handler: (...parameters: any[]) => any): any
    
    /**
     * @param {string} p1
     *
     */
    UpdateClientPackage(p1: string): any
    
}

/**
 * Game Objects (`Props`)
 */
declare interface GameObject {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    /**
     * the GameObject's position in the game world
     */
    position: Vector3f;
    
    /**
     * the GameObject's rotation in the game world
     */
    rotation: Vector3f;
    
    /**
     * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
     */
    readonly networkId: number;
    
    /**
     * model hash of the GameObject _(TODO: reference to all hashes)_
     */
    readonly modelHash: string;
    
    /**
     * world dimension of the GameObject.
     */
    dimension: number;
    
    constructor(model: string, position: Vector3f, rotation?: Vector3f): GameObject;
    
    /**
     * Applies a 3d-force to the GameObject
     * @param {Vector3f} direction
     * @param {number} deltaTime
     *
     * @example var object = new GameObject('glowstick_yellow');
     * object.ApplyForce(new Vector3f(100, 0, 0), 1);
     * 
     */
    ApplyForce(direction: Vector3f, deltaTime: number): any
    
    /**
     * Destroys the GameObject
     */
    Destroy(): any
    
}

declare interface PlaneHandling {
    airSteering: PlaneHandlingAirSteering;
    
    engine: PlaneHandlingEngine;
    
}

declare interface BoatHandlingFins {
    referenceSpeedMs: number;
    
    pressureDrag: number;
    
    pressureDrag2: number;
    
}

/**
 * represents a Client connected to the server.
 */
declare interface RemoteClient {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    /**
     * the RemoteClient's name
     */
    readonly name: string;
    
    /**
     * the ip address of the client
     */
    readonly ipAddress: string;
    
    /**
     * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
     */
    readonly networkId: number;
    
    /**
     * the client's ping
     */
    readonly ping: number;
    
    /**
     * the Steam64ID of the client
     */
    readonly steamId: string;
    
    /**
     * whether the client is authenticated via Steam
     */
    readonly steamAuthenticated: boolean;
    
    /**
     * Immediately kicks the Client from the Server.
     * @param {string} reason
     *
     * @example jcmp.events.Add('ClientConnected', client => {
     *   client.Kick('meow!');
     * });
     * 
     */
    Kick(reason: string): any
    
    /**
     * Checks whether the client owns the DLC
     *  
     *  #### Available DLCs
     * | Name | Value |
     * |:-----|:------|
     * |SKY_FORTRESS|400551|
     * |MECH_LAND_ASSAULT|400490|
     * |BAVARIUM_SEA_HEIST|442051|
     * |AIR_LAND_SEA|401850|
     * |FIRESTARTER_SKINS|348880|
     * |CAPSTONE_BLOODHOUND_RPG|388294|
     * |KOUSAVA_RIFLE|442050|
     * |FINAL_ARGUMENT_SNIPER|488293|
     * |COMBAT_BUGGY|388290|
     * |MINIGUN_RACING_BOAT|388291|
     * |ROCKET_LAUNCHER_SPORTS_CAR|388292|
     * |REAPER_MISSILE_MECH|442052|
     * 
     * @param {number} dlc
     *
     * @example jcmp.events.Add('ClientConnected', client => {
     *   if (!client.DoesOwnDLC(400551)) {
     *     console.log(`${client.name} does not own Sky Fortress.`);
     *   }
     * });
     * 
     */
    DoesOwnDLC(dlc: number): boolean
    
}

declare interface Player {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    /**
     * the players current vehicle
     */
    readonly vehicle: Vehicle | undefined;
    
    /**
     * the associated RemoteClient of the player
     */
    readonly client: RemoteClient;
    
    /**
     * the Player's name
     */
    readonly name: string;
    
    /**
     * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
     */
    readonly networkId: number;
    
    /**
     * the players current health
     */
    health: number;
    
    /**
     * whether the player is invulnerable to damage
     */
    invulnerable: boolean;
    
    /**
     * the Player's position in the game world
     */
    position: Vector3f;
    
    /**
     * the position where the player respawns upon calling `Player#Respawn`
     */
    respawnPosition: Vector3f;
    
    /**
     * the Player's rotation in the game world
     */
    rotation: Vector3f;
    
    /**
     * the position the player aims at
     */
    aimPosition: Vector3f;
    
    /**
     * the currently selected(equipped) weapon
     */
    readonly selectedWeapon: PlayerWeapon;
    
    /**
     * weapons in the inventory
     */
    readonly weapons: Array<PlayerWeapon> | undefined;
    
    /**
     * world dimension of the Player.
     */
    dimension: number;
    
    /**
     * Immediately kicks the Player from the Server.
     * @param {string} reason
     *
     * @example jcmp.events.Add('PlayerReady', player => {
     *   player.Kick('meow!');
     * });
     * 
     */
    Kick(reason: string): any
    
    /**
     * Respawns the Player. The position is stored in `Player.respawnPosition`
     * @example jcmp.events.Add('PlayerDeath', player => {
     *   player.respawnPosition = player.position
     *   player.Respawn();
     * });
     * 
     */
    Respawn(): any
    
    /**
     * Gives the Player a weapon.
     * @param {number} weaponHash
     * @param {number} ammo
     * @param {boolean} equipNow
     *
     * @example jcmp.events.Add('PlayerReady', player => {
     *   player.GiveWeapon(2307691279, 100, true);
     * });
     * 
     */
    GiveWeapon(weaponHash: number, ammo: number, equipNow: boolean): PlayerWeapon
    
    /**
     * @param {number} p1
     *
     */
    RemoveWeapon(p1: number): boolean
    
}

/**
 * A Weapon that is currently in a {Player}s inventory
 */
declare interface PlayerWeapon {
    /**
     * model hash of the PlayerWeapon _(TODO: reference to all hashes)_
     */
    readonly modelHash: number;
    
    /**
     * the weapon slot in the Players inventory
     */
    readonly slotIndex: number;
    
    /**
     * the ammunition left in the magazine
     */
    magazineAmmo: number;
    
    /**
     * the ammunition left as reserve in the inventory
     */
    reserveAmmo: number;
    
}

declare interface CarHandling {
    topSpeedKph: number;
    
    topSpeed: number;
    
    dragCoefficient: number;
    
    pmMass: number;
    
    pmLinearDamping: number;
    
    pmAngularDamping: number;
    
    pmGravityFactor: number;
    
    landGlobal: CarHandlingLandGlobal;
    
    engine: CarHandlingEngine;
    
    engineTransmission: CarHandlingEngineTransmission;
    
    brakes: CarHandlingBrakes;
    
    steering: CarHandlingSteering;
    
}

declare interface CarHandlingLandGlobalWheelDamage {
    skewHealth: number;
    
    brokenWheelFrictionFraction: number;
    
    brokenWheelRadiusFraction: number;
    
}

declare interface CarHandlingLandGlobalDrift {
    driftEntrySlipAngle: number;
    
    driftExitSlipAngle: number;
    
    maxDriftAngleDeg: number;
    
    driftLimitSpreadAngleDeg: number;
    
    constantDriftTorque: number;
    
    maxDriftTorque: number;
    
    counterSteerTorque: number;
    
    counterSteerTorqueHandbrake: number;
    
    counterSteerTorqueBrake: number;
    
    driftYawVelDamp: number;
    
    overdriftYawVelDamp: number;
    
    exitDriftYawVelDamp: number;
    
    velocityRotationStartAngle: number;
    
    velocityRotationEndAngle: number;
    
    velocityRotationAmount: number;
    
    velocityRotationAngleExp: number;
    
    counterSteerRotFactor: number;
    
    steeringSensitivity: number;
    
    minSpeedToDriftKmph: number;
    
    keepVelocityStrength: number;
    
    maxKeepVelocityAccelerationG: number;
    
}

declare interface BikeHandlingSteering {
    landSteering: CarHandlingSteering;
    
    wheelie: BikeHandlingSteeringWheelie;
    
}

declare interface HelicopterHandlingModel {
    centerOfTorquesX: number;
    
    centerOfTorquesY: number;
    
    centerOfTorquesZ: number;
    
    altitudeInputPower: number;
    
    yawInputPower: number;
    
    pitchInputPower: number;
    
    rollInputPower: number;
    
    pitchInputDeadZone: number;
    
    tToFullYawS: number;
    
    maxSpeedTToFullYawS: number;
    
    bankStartVelocityKmph: number;
    
    bankMaxVelocityKmph: number;
    
    minSpeedDiveKmph: number;
    
    maxSpeedDiveKmph: number;
    
    addDivePitchDeg: number;
    
    addClimbPitchDeg: number;
    
    maxRollInputForClimb: number;
    
    climbSpeedLowSpeedKmph: number;
    
    diveSpeedLowSpeedKmph: number;
    
    minAltitudeInput: number;
    
    unsettledAltitudeGainClimb: number;
    
    unsettledAltitudeGainDive: number;
    
    maxDivingGs: number;
    
    maxClimbingGs: number;
    
    addForceForwardPower: number;
    
    addForceLateralPower: number;
    
    trimInputGain: number;
    
    forwardDrag: number;
    
    lateralDrag: number;
    
    verticalDrag: number;
    
    tailLateralDrag: number;
    
    tailVerticalDrag: number;
    
    angularDrag: number;
    
    lowSpeedMaxDragYawSpeed: number;
    
    highSpeedMaxDragYawSpeed: number;
    
    yawDragNoInput: number;
    
    forwardDragNoInput: number;
    
    lateralDragNoInput: number;
    
    verticalDragNoInput: number;
    
    tailDistanceToComM: number;
    
    addForwardForce: number;
    
    addRightForce: number;
    
    addLateralFactorPullUp: number;
    
    maxRollDeg: number;
    
    addBankRollDeg: number;
    
    addBankRollPullUpDeg: number;
    
    maxPitchLowSpeedDeg: number;
    
    maxPitchHighSpeedDeg: number;
    
    counterPitchAngleDeg: number;
    
    counterPitchSpeedKmph: number;
    
    rollP: number;
    
    rollI: number;
    
    rollD: number;
    
    rollMaxAmplitude: number;
    
    pitchP: number;
    
    pitchI: number;
    
    pitchD: number;
    
    pitchMaxAmplitude: number;
    
    yawP: number;
    
    yawI: number;
    
    yawD: number;
    
    yawMaxAmplitude: number;
    
    lowSpeedAltitudeP: number;
    
    lowSpeedAltitudeI: number;
    
    lowSpeedAltitudeD: number;
    
    highSpeedAltitudeP: number;
    
    highSpeedAltitudeI: number;
    
    highSpeedAltitudeD: number;
    
    altitudeLimitThresholdLow: number;
    
    altitudeLimitThresholdHigh: number;
    
}

declare interface CarHandlingLandGlobalArcade {
    heatBoost: CarHandlingLandGlobalArcadePerformanceBoost;
    
    nitroBoost: CarHandlingLandGlobalArcadePerformanceBoost;
    
    nitroBoostUpgraded: CarHandlingLandGlobalArcadePerformanceBoost;
    
    turboJump: CarHandlingLandGlobalArcadeTurboJump;
    
    turboJumpUpgraded: CarHandlingLandGlobalArcadeTurboJump;
    
}

declare interface CarHandlingLandGlobalArcadePerformanceBoost {
    torqueMultiplier: number;
    
    gripMultiplier: number;
    
    pushForce: number;
    
    boostBlendTime: number;
    
    extraTopSpeed: number;
    
}

declare interface CarHandlingEngine {
    topSpeedJumpMultiplier: number;
    
    resistanceAtMinRpm: number;
    
    resistanceAtMaxRpm: number;
    
    resistanceAtOptimalRpm: number;
    
    revLimiterRpmDrop: number;
    
    maxRpm: number;
    
    minRpm: number;
    
    optimalRpm: number;
    
    torqueFactorAtMaxRpm: number;
    
    torqueFactorAtMinRpm: number;
    
    torqueFactorAtOptimalRpm: number;
    
    clutchSlipRpm: number;
    
    engineMinNoise: number;
    
    engineDamageNoiseScale: number;
    
    engineMaxDamageTorque: number;
    
}

declare interface CarHandlingLandGlobalArcadeTurboJump {
    fMultiplier: number;
    
    rMultiplier: number;
    
    punchDelayTime: number;
    
    punchSpeedKph: number;
    
    topSpeedKph: number;
    
    topSpeedJumpMultiplier: number;
    
}

declare interface InputAxisTiming {
    timeToMaxInputAtMinSpeedS: number;
    
    timeToMaxInputAtMaxSpeedS: number;
    
    centeringInputTimeFactor: number;
    
    counterInputTimeFactor: number;
    
}

declare interface CarHandlingBrakes {
    front: CarHandlingBrakesBrakeAxis;
    
    rear: CarHandlingBrakesBrakeAxis;
    
    handbrakeFrictionFactor: number;
    
}

declare interface CarHandlingBrakesBrakeAxis {
    handbrake: number;
    
    maxBrakeTorque: number;
    
    minTimeToBlock: number;
    
}

declare interface CarHandlingSteering {
    deadZone: number;
    
    saturationZone: number;
    
    tToFullSteerS: number;
    
    maxSpeedTToFullSteerS: number;
    
    minSpeedKmph: number;
    
    maxSpeedKmph: number;
    
    steerAngleMinSpeedDeg: number;
    
    steerAngleMaxSpeedDeg: number;
    
    steerCurveFalloff: number;
    
    countersteerSpeedFactor: number;
    
    steerInSpeedFactor: number;
    
    steerInputPowerPc: number;
    
    steerInputPowerDurango: number;
    
    steerInputPowerOrbis: number;
    
    wheelDriftAligningStrength: number;
    
}

declare interface BoatHandling {
    propellers: BoatHandlingPropellers;
    
    fins: BoatHandlingFins;
    
    steering: BoatHandlingSteering;
    
}

declare interface HelicopterHandling {
    model: HelicopterHandlingModel;
    
    steering: HelicopterHandlingSteering;
    
}

declare interface BoatHandlingPropellersDockingControls {
    maxThrust: number;
    
    maxDockingSpeedMs: number;
    
    maxDockingControlThrottle: number;
    
    dockingYawThrottleLimit: number;
    
}

declare interface BoatHandlingSteering {
    accelerationSmoothing: number;
    
    steeringfilter: BoatHandlingSteeringSteeringFilter;
    
}

declare interface PlaneHandlingAirSteering {
    maxSteeringAngle: number;
    
    accelerationSmoothing: number;
    
    rollReturn: number;
    
    pitchReturn: number;
    
    referenceMinSpeedKPH: number;
    
    referenceMaxSpeedKPH: number;
    
    rollAxisTiming: InputAxisTiming;
    
    pitchAxisTiming: InputAxisTiming;
    
    yawAxisTiming: InputAxisTiming;
    
}

declare interface PlaneHandlingEngine {
    minThrust: number;
    
    maxThrust: number;
    
    runThrust: number;
    
    maxThrustAcceleration: number;
    
    taxiingMaxThrust: number;
    
    taxiingInputThreshold: number;
    
    taxiingTopSpeed: number;
    
}

declare interface HelicopterHandlingSteering {
    returnPitchLimit: number;
    
    returnRollLimit: number;
    
    airSteering: PlaneHandlingAirSteering;
    
}

declare interface BikeHandling {
    topSpeedKph: number;
    
    topSpeed: number;
    
    dragCoefficient: number;
    
    pmMass: number;
    
    pmLinearDamping: number;
    
    pmAngularDamping: number;
    
    pmGravityFactor: number;
    
    landGlobal: CarHandlingLandGlobal;
    
    engine: CarHandlingEngine;
    
    engineTransmission: CarHandlingEngineTransmission;
    
    brakes: CarHandlingBrakes;
    
    steering: BikeHandlingSteering;
    
}

declare interface BikeHandlingSteeringWheelie {
    maxLeanAngleDeg: number;
    
    inputReactiveness: number;
    
    deadZone: number;
    
    minSpeed: number;
    
    wheelieAngleDeg: number;
    
    wheelieTorque: number;
    
    nosieAngleDeg: number;
    
    nosieTorque: number;
    
}

/**
 * Vehicle
 */
declare interface Vehicle {
    [customProperty: string]: any;
    [customProperty: number]: any;
    
    /**
     * the player driving the vehicle
     */
    driver: Player;
    
    /**
     * the Vehicle's position in the game world
     */
    position: Vector3f;
    
    /**
     * the vehicles rotation
     */
    rotation: Vector3f;
    
    /**
     * the network id of this entity. It is not unique across different entities and will be re-assigned once this entity was destroyed
     */
    readonly networkId: number;
    
    /**
     * is the vehicle is destroyed or not (read-only)
     */
    readonly destroyed: boolean;
    
    /**
     * whether the vehicle is equipped with bavarium nitro
     */
    nitroEnabled: boolean;
    
    /**
     * whether the vehicle is equipped with the bavarium jump modification
     */
    turboJumpEnabled: boolean;
    
    /**
     * the vehicles color ID
     */
    primaryColor: number;
    
    /**
     * the vehicles positional speed
     */
    linearVelocity: Vector3f;
    
    /**
     * the vehicles rotational speed
     */
    angularVelocity: Vector3f;
    
    aimPostion: Vector3f;
    
    /**
     * the vehicles health
     */
    health: number;
    
    /**
     * model hash of the Vehicle _(TODO: reference to all hashes)_
     */
    readonly modelHash: number;
    
    readonly handling: VehicleHandling;
    
    /**
     * world dimension of the Vehicle.
     */
    dimension: number;
    
    constructor(modelHash: number, position: Vector3f, rotation?: Vector3f): Vehicle;
    
    /**
     * Fully repairs the given vehicle
     * @example jcmp.events.Add('VehicleDestroyed', vehicle => {
     *   vehicle.Repair();
     * });
     * 
     */
    Repair(): any
    
    /**
     * Respawns the vehicle at its initial spawning position
     * @example jcmp.events.Add('VehicleDestroyed', vehicle => {
     *   vehicle.Respawn();
     * });
     * 
     */
    Respawn(): any
    
    /**
     * Get the occupant of a vehicle seat
     * @param {number} seat
     *
     * @example jcmp.events.Add('PlayerExitVehicle', (player, vehicle) => {
     *   if (vehicle.GetOccupant(0)) {
     *     console.log('There is still a driver in the vehicle.');
     *   }
     * });
     * 
     */
    GetOccupant(seat: number): Vehicle | undefined
    
    /**
     * Set the occupant of the given vehicle.
     * 
     * _Note: if the player is not in the vicinity of the vehicle, he will first be teleported there automatically (slightly above the vehicle in the air)._
     * 
     * @param {number} seat
     * @param {Player} player
     *
     * @example jcmp.events.Add('PlayerReady', player => {
     *   var vehicle = new Vehicle(28454791, player.position, player.rotation); //Spawn the vehicle at the players position
     *  vehicle.SetOccupant(0, player); //Assign the player to the driver seat
     * });
     * 
     */
    SetOccupant(seat: number, player: Player): any
    
    /**
     * Destroys the Vehicle
     */
    Destroy(): any
    
}

/**
 * The global instance of the {JCMPNamespace}.
 */
declare const jcmp: JCMPNamespace


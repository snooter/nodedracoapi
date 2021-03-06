import * as objects from './draco/objects';
import * as enums from './draco/enums';
export declare class User {
    id: string;
    deviceId: string;
    nickname: string;
    avatar: number;
    login: string;
    username: string;
    password: string;
}
export { enums };
export { objects };
export declare class Client {
    clientInfo: objects.FClientInfo;
    user: User;
    private request;
    private proxy;
    private dcportal;
    private protocolVersion;
    private clientVersion;
    private checkProtocol;
    private auth;
    constructor(options?: any);
    ping(throwIfError?: boolean): Promise<boolean>;
    call(service: string, method: string, body: any): Promise<any>;
    event(name: any, one?: any, two?: any, three?: any): Promise<void>;
    boot(clientinfo: any): Promise<void>;
    login(): Promise<any>;
    googleLogin(): Promise<void>;
    load(): Promise<void>;
    validateNickname(nickname: any): Promise<any>;
    acceptTos(): Promise<void>;
    register(nickname: any): Promise<any>;
    generateAvatar(options?: any): number;
    setAvatar(avatar: any): Promise<any>;
    getUserItems(): Promise<any>;
    getCreadex(): Promise<any>;
    getUserCreatures(): Promise<objects.FUserCreaturesList>;
    getMapUpdate(latitude: number, longitude: number, horizontalAccuracy?: number): Promise<any>;
    useBuilding(clientLat: number, clientLng: number, buildingId: string, buildingLat: number, buildingLng: number): Promise<any>;
    encounter(id: string, options?: any): Promise<any>;
    catch(id: string, ball: number, quality: number, spin?: boolean, options?: any): Promise<any>;
    discardItem(id: number, count: number): Promise<any>;
    releaseCreatures(ids: string[]): Promise<objects.FUpdate>;
    openChest(chest: objects.FChest): Promise<any>;
    delay<T>(ms: number, value?: T): Promise<T>;
}

import { ValueObject } from "./value-object";

export abstract class Entity {
    abstract get entity_id(): ValueObject;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract toJSON(): any;
}
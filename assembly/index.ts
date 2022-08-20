import {State} from "./state";

// @ts-ignore
@constructor
function init(): void {
  // If we want to attach some storage to the instance,
  // a state needs to be saved at this step.
  // So we create a store, and call save method

  // @ts-ignore
  //State.defaultState().save()
}

// User function. Smart-contract-related function.
// @ts-ignore
@export_method(2)
function example_method(): string {
    /*
    // If we want to restore the storage related to this instance,
    // we should call static load function. It will return a preloaded
    // state

    // @ts-ignore
    const state = State.load() as State;

    // Do some stuff with the state, like
    //state.count += 1;

    // Save the state with updated values
    state.save();

    // Return some value, as you want
    return "Hello world " + state.count.toString()
    */

    return ""
}

/*

// User function. Smart-contract-related function.
// @ts-ignore
@export_method(3)
function example_method(counter:u64, message: string, values: Array<u64>): string {}


// User function. Smart-contract-related function.
// @ts-ignore
@export_method(4)
function example_method(data: Map<string, u32>): string {}

*/

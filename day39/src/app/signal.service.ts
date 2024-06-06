import { Injectable, Signal, WritableSignal, signal } from "@angular/core";

@Injectable()
export class SignalService {

    private counterSignal: WritableSignal<number> = signal(0);
    public readonly counter: Signal<number> = this.counterSignal.asReadonly();

    constructor() {}

    public updateCounter() {
        this.counterSignal.update(cntSig => cntSig + 1);
    }

}
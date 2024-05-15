import { AbstractControl, ValidationErrors } from "@angular/forms";

export function lessThanToday(ctrl: AbstractControl) {
    let today: Date = new Date()
    if (new Date(ctrl.value) >= today) 
        return null
    return { lessThanToday: true } as ValidationErrors
}
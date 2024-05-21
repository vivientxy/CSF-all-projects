import { AbstractControl, ValidationErrors } from "@angular/forms";

export function greaterThanToday(ctrl: AbstractControl) {
    let today: Date = new Date()
    today.setHours(0,0,0,0)
    if (new Date(ctrl.value) >= today) 
        return null
    return { greaterThanToday: true } as ValidationErrors
}
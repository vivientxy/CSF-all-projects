import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Subject } from "rxjs";

@Injectable()
export class CityRepository extends Dexie {

    cities!: Dexie.Table<{ city: string }, string>;
    onCities = new Subject<string[]>();

    constructor() {
        super('db');
        this.version(1).stores({
            citiesTable: 'city'
        });
        this.cities = this.table('citiesTable');
    }

    emitCities(): void {
        this.cities.toArray()
            .then(tableValues => {
                const cityNames = tableValues.map(object => object.city);
                this.onCities.next(cityNames);
            });
    }

    private doesCityExist(city: string): Promise<boolean> {
        return this.cities.get(city)
            .then(foundCity => {
                return foundCity !== undefined;
            });
    }

    addCity(newCity: string) {
        this.doesCityExist(newCity.toLowerCase())
            .then(exists => {
                if (!exists) {
                    this.cities.add({ city: newCity.toLowerCase() })
                        .then(() => this.emitCities());
                }
            });
    }

    deleteCity(city: string) {
        this.cities.delete(city)
            .then(() => this.emitCities());
    }
}

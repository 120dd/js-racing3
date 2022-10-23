export class Car {
    constructor(_name) {
        this.name = _name;
        this.position = "";
    }
    
    go() {
        const counter = MissionUtils.Random.pickNumberInRange(0, 9);
        if (counter > 4) {
            this.position += "-";
        }
    }
}
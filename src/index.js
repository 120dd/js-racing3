import { SELECTORS } from "./constants.js";
import { Car } from "./car.js";

const getElement = selector => document.querySelector(`#${selector}`);

const TEMPLATES = {
    RESULTS: (carList) => carList.map((car) => `
    <div>
      ${car.name}: <span id="car-position">${car.position}</span>
    </div>
    `).join(""),
}

class App {
    constructor() {
        this.cars = [];
        this.initializeApp();
    }
    
    initializeApp() {
        this.registerAddCarEvent();
        this.registerCountSubmitEvent();
    }
    
    addCar(carName) {
        if (carName.length > 5) {
            alert("이름은 5글자 이하만 가능하다");
            return;
        }
        this.cars.push(new Car(carName));
    }
    
    clearInput(target) {
        target.value = '';
    }
    
    addCars(carsString) {
        const addCarArr = [...carsString.split(",")];
        if (addCarArr.length < 2) {
            alert("자동차 이름을 2개 이상 입력해주세요");
            return;
        }
        if (this.cars.length !== 0) {
            alert("이미 등록된 자동차가 있습니다");
            return;
        }
        addCarArr.forEach(car => {
            this.addCar(car)
        });
    }
    
    registerAddCarEvent() {
        getElement(SELECTORS.CAR_NAMES_SUBMIT_BUTTON).addEventListener("click", (e) => {
            e.preventDefault();
            const carsNameInput = getElement(SELECTORS.CAR_NAMES_INPUT)
            this.addCars(carsNameInput.value);
            this.clearInput(carsNameInput);
        })
    }
    
    registerCountSubmitEvent() {
        getElement(SELECTORS.RACING_COUNT_SUBMIT_BUTTON).addEventListener("click", (e) => {
            e.preventDefault();
            const count = getElement(SELECTORS.RACING_COUNT_INPUT).value;
            for (let i = 0 ; i < count ; i ++) {
                this.play();
            }
            this.renderWinner(this.getWinnerName(this.getWinnerPosition()))
        })
    }
    
    play() {
        this.cars.forEach(car => {
            car.go();
        });
        this.renderCars();
    }
    
    renderCars() {
        getElement("racing-results").insertAdjacentHTML("beforeend", TEMPLATES.RESULTS(this.cars))
    }
    
    getWinnerPosition() {
        const winnerPosition = this.cars.reduce((acc, cur) => {
            if (acc.position.length < cur.position.length) {
                return cur;
            }
            return acc
        })
        return winnerPosition.position
    }
    
    getWinnerName(position) {
        const winners = this.cars.filter(car => car.position === position);
        return winners.map(winner => winner.name).join();
    }
    
    renderWinner(name) {
        getElement(SELECTORS.WINNERS).innerText = name;
    }
}

new App();
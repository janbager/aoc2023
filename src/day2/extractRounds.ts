import extractDice from "./extractDice";
import {Round} from "./Game";

export default (roundsData: string) => {
    return roundsData.split('; ').map((roundData) => {
        const dices = roundData.split(', ').map((diceData) => {
            return extractDice(diceData);
        });
        return new Round(dices);
    });
}

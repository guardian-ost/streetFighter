import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
    });
}

export function getHitPower(fighter) {
    const { attack } = fighter;
    return attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    return defense * (Math.random() + 1);
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}

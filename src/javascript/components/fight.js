import controls from '../../constants/controls';

export function getHitPower(fighter) {
    const { attack } = fighter;
    return attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    return defense * (Math.random() + 1);
}

export function getDamage(attacker, defender = { defense: 0 }) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const leftPlayer = {
            ...firstFighter,
            isBlock: false,
            initialHealth: firstFighter.health,
            health: firstFighter.health,
            healthIndicator: document.getElementById('left-fighter-indicator')
        };

        const rightPlayer = {
            ...secondFighter,
            isBlock: false,
            initialHealth: secondFighter.health,
            health: secondFighter.health,
            healthIndicator: document.getElementById('right-fighter-indicator')
        };

        const attack = (attacker, defender) => {
            const newDefender = { ...defender };
            if (newDefender.isBlock) {
                newDefender.health -= getDamage(attacker, newDefender);
            } else {
                newDefender.health -= getDamage(attacker);
            }

            if (newDefender._id === leftPlayer._id) {
                leftPlayer.health = newDefender.health;
                leftPlayer.healthIndicator.style.width = `${(newDefender.health / leftPlayer.initialHealth) * 100}%`;
            } else {
                rightPlayer.health = newDefender.health;
                rightPlayer.healthIndicator.style.width = `${(newDefender.health / rightPlayer.initialHealth) * 100}%`;
            }
        };

        leftPlayer.healthIndicator.style.width = '100%';
        rightPlayer.healthIndicator.style.width = '100%';

        document.addEventListener('keydown', event => {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    leftPlayer.isBlock = true;
                    break;
                case controls.PlayerOneAttack:
                    if (leftPlayer.isBlock) {
                        break;
                    } else {
                        attack(leftPlayer, rightPlayer);
                        break;
                    }

                case controls.PlayerTwoBlock:
                    rightPlayer.isBlock = true;
                    break;
                case controls.PlayerTwoAttack:
                    if (!rightPlayer.isBlock) {
                        attack(rightPlayer, leftPlayer);
                    }
                    break;
                default:
                    break;
            }
        });
        document.addEventListener('keyup', event => {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    leftPlayer.isBlock = false;
                    break;
                case controls.PlayerTwoBlock:
                    rightPlayer.isBlock = false;
                    break;
                default:
                    break;
            }
        });
    });
}

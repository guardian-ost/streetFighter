import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (!fighter) throw new Error('Select second fighter');

    const fighterImage = createFighterImage(fighter);
    const { name, health, attack, defense } = fighter;

    const fighterDetails = createElement({
        tagName: 'div',
        className: `fighter-preview__details`
    });

    fighterDetails.innerHTML = `
    <div class="fighter-preview__detail">Name: ${name} </div>
    <div class="fighter-preview__detail">Health: ${health} </div>
    <div class="fighter-preview__detail">Attack: ${attack} </div>
    <div class="fighter-preview__detail">Defense: ${defense} </div>`;

    fighterElement.append(fighterDetails, fighterImage);

    return fighterElement;
}

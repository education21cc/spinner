import React, { useMemo, useRef, useEffect } from 'react';

interface Props {
  data: string[];
  className: string;
  image?: boolean;
}

const ITEM_HEIGHT = 224;
const MARGIN = 10;
const BASE_ANIMATION_TIME = 0.2; // amount of time to scroll one item

enum Phase {
  first = 'ease-in',
  last = 'ease-out',
  mid = 'linear',
  firstAndLast = 'ease-in-out'
}


const Ring = (props: Props) => {
  const caret = useRef(0);
  const spinning = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const items = useMemo(() => {
    console.log('shufflning', props.className)
    return shuffle(props.data);
  }, [props.data]);

  useEffect(() => {
    if (!ref.current) return;
    update(ref.current, items, caret.current);
  }, [items]);


  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = event.target as HTMLDivElement;
    const parentNode = (element.parentNode as HTMLElement)!
    const y = (event.clientY - parentNode.getBoundingClientRect().top);

    if (y > 1) {
        goUp();
    }  else {
        goDown();
    }
  }

  const goUp = () => {
    let i = 1;
    let index: number = (caret.current + i) % items.length;
    if (index < 0) index += items.length;
    while (cardAtIndexIsDisabled(index)) {
      i++;
      if (i === items.length + 1) {
        // There is no enabled card left!
        return;
      }
    }
    move(i);
  }

  const goDown = () => {
    let i = -1;
    let index: number = (caret.current + i) % items.length;
    if (index < 1) index =+ items.length;
    while (cardAtIndexIsDisabled(index % items.length)) {
      i--;
      if (i === items.length - 1) {
        // There is no enabled card left!
        return;
      }
    }
    move(i);
}

  const move = (amount: number = 1) =>  {
    if (spinning.current) {
      return;
    }
    if (amount === 1 || amount === -1) {
      caret.current += amount;
      spinning.current = true;
      update(ref.current!, items, caret.current, BASE_ANIMATION_TIME, Phase.firstAndLast);
      setTimeout(() => spinning.current = false, BASE_ANIMATION_TIME * 1000);
    } else {
      const goal = caret.current + amount;
      spinning.current = true;
      const interval = setInterval(() => {
        if (caret.current === goal) {
          spinning.current = false;
          clearInterval(interval);
          return;
        }
        caret.current += amount / Math.abs(amount);

        // The ring spins up and down
        let phase = Phase.mid;
        let time = BASE_ANIMATION_TIME;
        if (goal - caret.current === Math.abs(amount) - 1) {
          phase = Phase.first;
          time /= .75;
        } else if (caret.current === goal) {
          phase = Phase.last;
          time /= .75;
        }
        update(ref.current!, items, caret.current, time, phase);
      }, BASE_ANIMATION_TIME * 1000);
    }
}


  const cardAtIndexIsDisabled = (index: number) => {
    const parentNode = (ref.current as HTMLElement)!
    const element = parentNode.children[index] as HTMLElement;
    return element.classList.contains('disabled');
  }

  const renderItem = (item: string) => {
    if (props.image) {
      return (
        <div 
          key={item}
          className="item"
          style={{
            backgroundImage: `url(${item})`
          }}
        />
      );
    }
    return (
      <div key={item} className="item">
        {item.replace(/&shy;/gi, '\u00AD')}
      </div>
    );
  }

  return (
    <div className={`ring ${props.className}`} ref={ref} onClick={handleClick}>
      {items.map((i) => renderItem(i))}
    </div>
  )
}

export default Ring;

const shuffle = (originalArray: string[]) => {
  const array = Object.assign([], originalArray);
  let currentIndex = array.length;
  let temporaryValue;

  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const update = (parent: HTMLDivElement, items: string[], caret: number, transitionTime: number = BASE_ANIMATION_TIME, phase: Phase = Phase.firstAndLast) => {

  const halfItems = Math.floor(items.length / 2);
  let counter = 0;
  for (let i = caret; i < parent.children.length + caret; i++) {
    let index = i % items.length;
    if (i < 0) index += items.length;

    const element = parent.children[index % items.length] as HTMLElement;
    element.style.transition = `top ${transitionTime}s ${phase}`;

    // Add animation only to the current card and those above and below
    if (Math.abs((i - caret) % (items.length - 1)) < 2) {
        element.style.transition = `top ${transitionTime}s ${phase}`;
        element.style.visibility = 'visible';
    }
    else {
        element.style.transition = '';
        element.style.visibility = 'hidden';
    }

    if (counter > halfItems) {
        // Draw above (please dont ask me why this works. it works, allright?)
        element.style.top = `${halfItems * -(ITEM_HEIGHT + MARGIN) - ((halfItems + (halfItems % 2) - counter) * (ITEM_HEIGHT + MARGIN))}px`;
    } else {
        // Draw below
        element.style.top = `${counter * (ITEM_HEIGHT + MARGIN)}px`;
    }
    counter++;
  }
}
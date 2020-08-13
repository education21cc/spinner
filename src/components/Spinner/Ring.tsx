import React, { useMemo, useRef, useEffect, useCallback } from 'react';

interface Props {
  data: string[];
  className: string;
  image?: boolean;
  onCardIndexChanged: (index: number) => void;
  initialMove: number;
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
  const { onCardIndexChanged }= props;
  const caretRef = useRef(0);
  const spinning = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    return shuffle(props.data);
  }, [props.data]);
  
  const update = useCallback((transitionTime: number = BASE_ANIMATION_TIME, phase: Phase = Phase.firstAndLast) => {
    const parent = ref.current as HTMLDivElement;
    const caret = caretRef.current;
    
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
  }, [items.length]);
  
  
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
    while (cardAtIndexIsDisabled( caretRef.current + i)) {
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

    while (cardAtIndexIsDisabled( caretRef.current + i)) {
      i--;
      if (i === items.length - 1) {
        // There is no enabled card left!
        return;
      }
    }
    move(i);
  }
  
  
 
  const handleCaretChanged = useCallback(() => {
    const cardIndex = () => {
      const index = caretRef.current % items.length;
      const node = ref.current!.children[index]!;
      return parseInt(node.getAttribute('original-index')!, 10);
    };

    onCardIndexChanged(cardIndex());
  }, [items.length, onCardIndexChanged]);

  const move = useCallback((amount: number = 1) =>  {
    if (spinning.current) {
      return;
    }
    if (amount === 1 || amount === -1) {
      caretRef.current += amount;
      if (caretRef.current < 0)
      caretRef.current = items.length + caretRef.current;

      spinning.current = true;
      update(BASE_ANIMATION_TIME, Phase.firstAndLast);
      setTimeout(() => spinning.current = false, BASE_ANIMATION_TIME * 1000);
      handleCaretChanged();
    } else {
      const goal = caretRef.current + amount;
      spinning.current = true;
      const interval = setInterval(() => {
        if (caretRef.current === goal) {
          spinning.current = false;
          clearInterval(interval);
          return;
        }
        caretRef.current += amount / Math.abs(amount);
        
        // The ring spins up and down
        let phase = Phase.mid;
        let time = BASE_ANIMATION_TIME;
        if (goal - caretRef.current === Math.abs(amount) - 1) {
          phase = Phase.first;
          time /= .75;
        } else if (caretRef.current === goal) {
          phase = Phase.last;
          time /= .75;
        }
        update(time, phase);
        handleCaretChanged();

      }, BASE_ANIMATION_TIME * 1000);
    }
  }, [handleCaretChanged, items.length, update]);
  
  
  const cardAtIndexIsDisabled = (index: number) => {
    if (index < 1) index =+ items.length;
    index = index % items.length;

    const parentNode = (ref.current as HTMLElement)!
    const element = parentNode.children[index] as HTMLElement;
    return element.classList.contains('disabled');
  }
  
  useEffect(() => {
    update();
    move(2);
  }, [move, update]);
  
  const renderItem = (item: string) => {
    if (props.image) {
      return (
        <div 
        key={item}
          className="item"
          style={{
            backgroundImage: `url(${item})`
          }}
          original-index={props.data.indexOf(item)}
        />
      );
    }
    return (
      <div 
        key={item}
        className="item"
        original-index={props.data.indexOf(item)}
      >
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

// const update = (parent: HTMLDivElement, items: string[], caret: number, transitionTime: number = BASE_ANIMATION_TIME, phase: Phase = Phase.firstAndLast) => {

//   const halfItems = Math.floor(items.length / 2);
//   let counter = 0;
//   for (let i = caret; i < parent.children.length + caret; i++) {
//     let index = i % items.length;
//     if (i < 0) index += items.length;

//     const element = parent.children[index % items.length] as HTMLElement;
//     element.style.transition = `top ${transitionTime}s ${phase}`;

//     // Add animation only to the current card and those above and below
//     if (Math.abs((i - caret) % (items.length - 1)) < 2) {
//         element.style.transition = `top ${transitionTime}s ${phase}`;
//         element.style.visibility = 'visible';
//     }
//     else {
//         element.style.transition = '';
//         element.style.visibility = 'hidden';
//     }

//     if (counter > halfItems) {
//         // Draw above (please dont ask me why this works. it works, allright?)
//         element.style.top = `${halfItems * -(ITEM_HEIGHT + MARGIN) - ((halfItems + (halfItems % 2) - counter) * (ITEM_HEIGHT + MARGIN))}px`;
//     } else {
//         // Draw below
//         element.style.top = `${counter * (ITEM_HEIGHT + MARGIN)}px`;
//     }
//     counter++;
//   }
// }
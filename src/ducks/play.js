'use strict';

const SHUFFLE = 'poker/play/SHUFFLE';
const LOAD = 'poker/play/LOAD';

export function loadPlay() {
  return { type: LOAD };
}

export function shufflePlay(orderPoker) {
  return { type: SHUFFLE, orderPoker};
}

export default function reducerPlay(state=[], action) {
  switch (action.type) {
    case LOAD:
      return 'hola desde load reducer';
    default: return state;
  }
}

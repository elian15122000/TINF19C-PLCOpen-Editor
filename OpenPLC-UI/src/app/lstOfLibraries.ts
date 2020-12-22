import {Library} from './library';

export const LIBRARIES: Library[] = [
  {name: 'Type conversion', blocks: [] },
  {name: 'Numerical', blocks: [] },
  {name: 'Arithmetic', blocks: [] },
  {name: 'Time', blocks: [] },
  {name: 'Bit-shift', blocks: [] },
  {name: 'Bitwise', blocks: [
      {name: 'AND', baseinputnumber: 1, inputs: 'ANY_BIT, ANY_BIT',
        outputs: 'ANY_BIT', comment: 'Bitwise AND', filter: '', extensible: true},
    ] },
  {name: 'Selection', blocks: [] },
  {name: 'Comparison', blocks: [] },
  {name: 'Character string', blocks: [] },
];

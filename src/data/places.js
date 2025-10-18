// 汇总所有地点数据
import { almerePlaces } from './places/almere.js';
import { brusselsPlaces } from './places/brussels.js';
import { lyonPlaces } from './places/lyon.js';
import { marseillePlaces } from './places/marseille.js';
import { nicePlaces } from './places/nice.js';
import { monacoPlaces } from './places/monaco.js';
import { milanPlaces } from './places/milan.js';
import { veronaPlaces } from './places/verona.js';
import { venicePlaces } from './places/venice.js';
import { florencePlaces } from './places/florence.js';
import { pisaPlaces } from './places/pisa.js';
import { romePlaces } from './places/rome.js';
import { vaticanPlaces } from './places/vatican.js';
import { naplesPlaces } from './places/naples.js';

export const places = [
  ...almerePlaces,
  ...brusselsPlaces,
  ...lyonPlaces,
  ...marseillePlaces,
  ...nicePlaces,
  ...monacoPlaces,
  ...milanPlaces,
  ...veronaPlaces,
  ...venicePlaces,
  ...florencePlaces,
  ...pisaPlaces,
  ...romePlaces,
  ...vaticanPlaces,
  ...naplesPlaces,
];

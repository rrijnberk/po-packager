import {Type_001Po} from './type_001.po';
import {Type_002Po} from './type_002.po';

export class Type_003Po extends Type_001Po {
    constructor() {
        super();
        new Type_002Po();
    }
}
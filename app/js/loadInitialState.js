import {Map} from 'immutable';

export default function () {
    return {
        routing: undefined,
        companies: new Map({
            fetching: false,
            status: 0,
            list: Map()
        })
    };
}

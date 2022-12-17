import { 
    START_FETCHING_DATA,
    ERROR_FETCHING_DATA, 
    SUCCESS_FETCHING_DATA, 
    SET_PAGE, 
    SET_KEYWORD,
    SET_LIMIT,
    NEXT_PAGE, 
    PREV_PAGE,
    PREVIEW_IMAGE,
    SUCCESS_STORE_DATA, 
    ERROR_STORE_DATA, 
    SET_STATUS,
    SET_INPUT
} from './constants';
  
const statuslist = { idle: 'idle', process: 'process', success: 'success', error: 'error' }

const initialState = {
    id: '', 
    data: [],
    currentPage: 1, 
    totalItems: -1,
    perPage: 10,
    keyword: '',
    status: statuslist.idle, 
    message: '', 
    input : '', 
    imagePreview : ''
};

export default function reducer(state = initialState, action){

    switch(action.type){

    case START_FETCHING_DATA:
        return {...state, status: statuslist.process, data: [], message: statuslist.process }

    case SUCCESS_FETCHING_DATA:
        return {...state, data: action.data, totalItems: action.count, status: statuslist.success, message: action.message}

    case ERROR_FETCHING_DATA:
        return {...state, status: statuslist.error, message: action.err}

    case SET_PAGE:
        return {...state, currentPage: action.currentPage}

    case SET_KEYWORD:
        return {...state, keyword: action.keyword, category: '', tags: []}

    case SET_LIMIT:
        return {...state, perPage: action.limit}

    case SET_INPUT:
        return {...state, input: action.dataForm}

    case NEXT_PAGE:
        return {...state, currentPage: state.currentPage + 1}

    case SET_STATUS:
        return {...state, status: action.status, message: action.message}

    case PREV_PAGE:
        let page = state.currentPage <= 1 ? 1 : state.currentPage - 1;
        return {...state, currentPage: page}

    case PREVIEW_IMAGE:
        return {
        ...state, data: [], totalItems: '', status: statuslist.idle, message: '', imagePreview: action.image
        }

    case SUCCESS_STORE_DATA:
        return {
        ...state, status: statuslist.success, data: action.result
        }

    case ERROR_STORE_DATA:
        return {
        ...state, status: statuslist.error, message: action.error.message
        }

    default:
        return state;

    }
}
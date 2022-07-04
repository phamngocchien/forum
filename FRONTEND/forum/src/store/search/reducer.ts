import { ActionTypes, PENDING, REJECTED, SEARCH_ALL } from "./contant";

interface IInitialState {
  loading: boolean;
  data: any;
}
const initialState: IInitialState = {
  loading: false,
  data: {
    post: [],
    user: [],
    tag: []
  }
};

const SearchReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case SEARCH_ALL:
      return { ...state, data: action.payload, loading: false };
    case REJECTED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default SearchReducer;

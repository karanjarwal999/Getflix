export const   initialState = {
  data:[],
  fetchList:[],
  fetchNumber:4
}

export const Recducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case 'update_moviesData':
    return { ...state,data:[...state.data,...payload] }

  case 'update_List':
    return { ...state,fetchList:[...state.fetchList,...payload] }

  case 'update_FetchNumber':
    return { ...state,fetchNumber:payload }

  default:
    return state
  }
}

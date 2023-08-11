export const   initialState = {
  data:[],
  fetchList:[],
  NewPopular:[],
  MyList:JSON.parse(localStorage.getItem('MyList'))||[],
  MyLiked:JSON.parse(localStorage.getItem('MyLiked'))||[],
  MyReminder:JSON.parse(localStorage.getItem('MyReminder'))||[]
}

export const Recducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case 'update_moviesData':
    return { ...state,data:[...state.data,...payload] }

  case 'update_List':
    return { ...state,fetchList:[...state.fetchList,...payload] }

  case 'update_New_popular':
    return { ...state,NewPopular: [...state.NewPopular,...payload] }

  case 'update_MyList':{
      if(state.MyList.includes(payload)){
        let newList= state.MyList.filter((ID)=>ID!==payload)
        localStorage.setItem("MyList", JSON.stringify(newList))
        return { ...state,"MyList":newList }
      }else{
        localStorage.setItem("MyList", JSON.stringify([...state.MyList,payload]));
        return { ...state,"MyList":[...state.MyList,payload] }
      }
  }
  case 'update_MyLiked':{
      if(state.MyLiked.includes(payload)){
        let newLiked= state.MyLiked.filter((ID)=>ID!==payload)
        localStorage.setItem("MyLiked", JSON.stringify(newLiked))
        return { ...state,"MyLiked":newLiked }
      }else{
        localStorage.setItem("MyLiked", JSON.stringify([...state.MyLiked,payload]));
        return { ...state,"MyLiked":[...state.MyLiked,payload] }
      }
  }
  case 'update_Reminder':{
      if(state.MyReminder.includes(payload)){
        let newReminder= state.MyReminder.filter((ID)=>ID!==payload)
        localStorage.setItem("MyReminder", JSON.stringify(newReminder))
        return { ...state,"MyReminder":newReminder }
      }else{
        localStorage.setItem("MyReminder", JSON.stringify([...state.MyReminder,payload]));
        return { ...state,"MyReminder":[...state.MyReminder,payload] }
      }
  }
   
  default:
    return state
  }
}

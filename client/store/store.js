
/*redux*/
// const ADD_ACTION = "ADD"
// const add = (num)=>{
//   return {
//     type:ADD_ACTION,
//     num,
//   }
// }
// const initiaSatate = {
//   count : 0
// }
// const reducers = (state = initiaSatate,action)=>{
//   switch(action.type){
//     case ADD_ACTION:
//       return Object.assign({},state,{
//         count:state.count+action.num
//       })
//     default:
//       return state
//   }
// }
// ReduxStore.dispatch(add(1))
// /*mobx*/
// const mobxStore = observable({
//   count:0,
//   add:action(num=>{
//       this.count+=num
//   })
// })
// mobxStore.add(1)

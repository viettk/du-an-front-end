export const addUser = (user) => ({type:'LOGIN USER',payload: user})
export const removeUser = (user) => ({type:'LOGOUT USER',payload: user})
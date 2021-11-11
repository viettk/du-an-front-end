const initialSate = {
        email:'',
        password:''
}
const userReducer = (state = initialSate, action) =>{
    console.log(action.type)
    switch (action.type) {
        case 'LOGIN USER':
            return action.payload;
        default:
            return state;
    }
}
export default userReducer;
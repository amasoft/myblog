const Reducer=(state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,//mainly for the loader when a button is clicked
                error:false
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFetching:false,//mainly for the loader when a button is clicked
                error:false
            };
            case "LOGIN_FAILURE":
                return{
                    user:null,
                    isFetching:false,//maily for the loader when a button is clicked
                    error:true
                }
        case "LOGOUT":
            return{
                user:null,
                isFetching:false,//maily for the loader when a button is clicked
                error:false
            }
            //forupdates
            case "UPDATE_START":
            return{
                ...state
            };
        case "UPDATE_SUCCESS":
            return{
                user:action.payload,
                isFetching:false,//mainly for the loader when a button is clicked
                error:false
            };
            case "UPDATE_FAILURE":
                return{
                    user:state.user,
                    isFetching:false,//maily for the loader when a button is clicked
                    error:true
                }
        default:
            return state
    }
}

export default Reducer
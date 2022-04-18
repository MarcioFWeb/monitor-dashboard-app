import { LOGIN_VERIFY, LOGOUT_USER, LOGIN_WITH_SESSION_DATA } from '../../ValueObjects/Enum/authStoreActionTypesEnum'

const initialState = {    
    role: "",
    _id: "",
    email: "",
    token: "",
    isAuth: false,
  }

export default function(state = initialState, action) {

    switch (action.type) {
      case LOGIN_VERIFY:          
        return { ...action.payload }
      case LOGIN_WITH_SESSION_DATA:
        return { ...action.payload }
      case LOGOUT_USER:
        return {
            ...initialState
        }
      default:
        return state
    }

}
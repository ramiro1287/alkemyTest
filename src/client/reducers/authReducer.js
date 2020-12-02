const initialState = {
	isLogged: false,
	isLoading: false,
	user: null
}
export default function (state = initialState, action) {
	switch(action.type) {
		case 'Loading':
			return {
				...state,
				isLoading: true
			};
		case 'Loaded':
			return {
				...state,
				isLoading: false,
				user: action.user,
				isLogged: true
			};
		case 'Error':
		case 'SignOut':
			return {
				...state,
				isLoading: false,
				user: null,
				isLogged: false
			};
		default: return state
	}
}
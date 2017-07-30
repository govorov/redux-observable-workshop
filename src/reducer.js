const initialState = {
	loading: true,
	value: 1,
};


export const TEST = 'test';


export const reducer = (state = initialState,action) => {
	console.log('reducer',action);
	// debugger
	switch (action.type) {
		case TEST:
			return 	{
				...state,
				value: state.value + 1,
			};
		default:
			return state;
	}

};

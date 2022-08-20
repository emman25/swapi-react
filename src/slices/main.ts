import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

let initialState = {
    error: undefined,
    isLoading: false,
    data: [],
    page: 1,
    total: 1
}


export const setPageAction = createAction<number>("main/setPage")

export const graphqlRequest = createAsyncThunk(
    "main/graphqlRequest",
    async ({ data }: { data: any }) => {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const user = await response.json();
        console.log(user)
        return user;
    }
);


export const searchGraphqlRequest = createAsyncThunk(
    "main/searchGraphqlRequest",
    async ({ data }: { data: any }) => {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const user = await response.json();
        console.log(user)
        return user;
    }
);


const slice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: {
        [graphqlRequest.pending.toString()]: (state, action) => {
            state.isLoading = true
            state.error = false
            // state.data = []
        },
        [graphqlRequest.fulfilled.toString()]: (state, action) => {
            state.data = action.payload.data.people.results
            state.isLoading = false
            state.total = action.payload.data.people.count
        },
        
        [searchGraphqlRequest.pending.toString()]: (state, action) => {
            state.isLoading = true
            state.error = false
            // state.data = []
        },
        [searchGraphqlRequest.fulfilled.toString()]: (state, action) => {
            state.data = action.payload.data.search.results
            state.isLoading = false
            state.total = action.payload.data.search.count
        },
    }
})


// export const { main } = slice.actions;

export default slice.reducer;
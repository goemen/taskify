import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models'

export const usersSlice = createSlice<IUser[], {}, 'users'>({
    name: 'users',
    initialState: [
        {id: 'user1', name: 'Developer One', avatar: '/images/avatar1.jpg'},
        {id: 'user2', name: 'Developer Two', avatar: '/images/avatar2.jpg'},
    ],
    reducers: {}
})
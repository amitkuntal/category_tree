import {cloneDeep} from 'lodash'

const iState = {
    category:[],
} 


const reducer = (state = iState, action) =>{
    if(action.type === 'ADD_ROOT_CATEGORY'){
        let updateState = cloneDeep(state)
        updateState.category.push(action.payload)
        return updateState
    }

    if(action.type === 'ADD_SUB_CATEGORY'){
        let updateState = cloneDeep(state)
        addSubCategory(action.payload, action.address, 0,updateState.category)
        return updateState
    }

    if(action.type === 'DELETE_CATEGORY'){
        let updateState = cloneDeep(state)
        deleteCategory(action.address, 0, updateState.category)
        return updateState
    }
    return state

}

const addSubCategory = (payload, address, length, state)=>{  
    if(length+1 === address.length){
        state[parseInt(address[length])]["subCat"].push(payload)
        return state
    }
    else{ 
        return addSubCategory(payload, address, length+1, state[parseInt(address[length])]["subCat"])
    }
}


const deleteCategory = (address, length, state)=>{  
    if(length+1 === address.length){
        state.splice(parseInt(address[length]),1)
        return state
    }
    else{ 
        return deleteCategory(address, length+1, state[parseInt(address[length])]["subCat"])
    }
}

export default reducer;
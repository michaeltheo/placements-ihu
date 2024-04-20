import { defineStore } from 'pinia'


type DikaiologitikaTypes={
    type:string
    description:string
}

type State={
    dikaiologitikaTypes:DikaiologitikaTypes[] 
}

export const useDikaiologitkaStore = defineStore('dikaiologitika', {
  state: ():State =>({
    dikaiologitikaTypes:[],
  }),
  actions:{
    setDikaiologitka(dikaiologitika:DikaiologitikaTypes[]){
        const store=useDikaiologitkaStore()
        store.dikaiologitikaTypes=dikaiologitika

    }
  }
})
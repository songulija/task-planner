//vuex global state
const actions = {
    //implementing this action that is defined in nuxt.config
    async onAuthStateChangedAction(state, { authUser, claims }) {
      if (!authUser) {
        // remove state
        state.commit('SET_USER', null)
  
        //redirect from here
        this.$router.push({
          path: '/auth/signin',
        })
      } else {
        //commit action that mutation will catch and mutate state 
        const { uid, email } = authUser
        state.commit('SET_USER', {
          uid,
          email,
        })
      }
    },
    async getBoards({ commit, state }) {
      console.log('gettt')
      let boardData = []
      const response=$nuxt.$fire.firestore.collection('users')
      const data=await response.get();
      data.docs.forEach(async(item)=> {
        const uid = item.data().uid;
        const userBoardsRef = $nuxt.$fire.firestore.
          collection('users').doc(uid).
          collection('boards');
        await userBoardsRef
          .get()
          .then(function (querySnapshot) {
            if (querySnapshot.docs.length > 0) {
              try {
                // lets loop through that collection of documents and add 
                // documents to boardData array
                for (const doc of querySnapshot.docs) {
                  let data = doc.data()
                  if(uid == $nuxt.$fire.auth.currentUser.uid) {
                    boardData.push(data);
                  } else {
                    if(data.users){
                      const index = data.users.findIndex(x => x.email === $nuxt.$fire.auth.currentUser.email);
                      if(index !== -1) {
                        boardData.push(data);
                      }
                    }                   
                  }
                }
              } catch (err) {}
            }
          })
          .catch(function (error) {})        
          commit('SET_BOARDS', boardData)
      })

      // return promise from this action. so we know when date is returned
      // and i can render template
      return EventService.getEvents(state.perPage, page)
        .then((response) => {
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
          console.log(response.headers['x-total-countx'])
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events:' + error.message,
          }
          // dispatching notification action add & passing obj
          //{root: true} allows dispatcher to go to root state, find notification module
          // and run add action
          dispatch('notification/add', notification, { root: true })
        })
    },
  
  }
  
  const mutations = {
    SET_USER(state, user) {
      state.user = user
    },
    SET_BOARDS(state, boards) {
      state.boards = boards;
    },
    ADD_BOARDS(state, board) {
      state.boards.push(board)
    },
    REMOVE_BOARD(state, id) {
      state.boards = state.boards.filter(x => x.id !== id)
    }
  }
  
  const state = () => ({
    user: null,
    boards: []
  })
  
  const getters = {
    getUser(state) {
      return state.user
    },
    // getBoards(state) {
    //   return state.boards
    // }
  }
  
  export default {
    state,
    actions,
    mutations,
    getters,
  }
  

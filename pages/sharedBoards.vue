<template>
  <v-container>
  <!-- dialog box that opens when clicking on Add Board. by default dialog = false -->
    <div class="d-flex flex-row align-center justify-space-between">
      <h1>Shared Boards</h1>
    </div>
    <div class="d-flex flex-wrap align-center justify-start">
    <!-- check if boards length is 0, show message, else -->
      <p v-if="boards.length === 0">You have no boards yet.</p>
      <!-- else v-for will loop through "boards" array and add cards -->
      <v-card
        :style="board.image.downloadURL != '' ? `background:url(${board.image.downloadURL});`: board.color ? `background-color:${board.color}` : ''"
        @click="$router.push('/shares/' + board.id)"
        class="jello-board-tile"
        v-for="board in boards"
        v-bind:key="board.id"
      >
        <v-card-title :style="board.image.downloadURL != '' ? 'color:#fff':''">
          {{ board.title }}
        </v-card-title>
        <v-card-subtitle :style="board.image.downloadURL != '' ? 'color:#fff':''">
          created {{ board.dateCreated | formatDate }}
        </v-card-subtitle>
      </v-card>
    </div>
    <v-snackbar
      :timeout="3000"
      v-model="snackbar"
      absolute
      bottom
      color="primary"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  // async method executes before page loads.
  async asyncData() {
      //lets get our board data before page load, and then after that await changes
    // query firebase users collection by userId, checking if there is boards collection
    let boardsRef = $nuxt.$fire.firestore
      .collection('boards')
      .where('users', 'array-contains', $nuxt.$fire.auth.currentUser.email)
    let boardData = []
    await boardsRef
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          try {
            // lets loop through that collection of documents and add 
            // documents to boardData array
            for (const doc of querySnapshot.docs) {
              let data = doc.data()
              data.id = doc.id
              boardData.push(data)
            }
          } catch (err) {}
        }
      })
      .catch(function (error) {})

    return { boards: boardData }
  },
  
  data() {
    return {
      enableColor: false,
      dialog: false,
      valid: false,
      board: {
        id: '',
        title: '',
        color: '',
        userId: '',
        image: {
          name: '',
          originalName: '',
          downloadURL: '',
          uuid: '',
        },
      },
      snackbar: false,
      snackbarText: 'No error message',
      currentImageId: '',
      fileToUpload: {},
    }
  },
  created() {
    //lets watch our boards just to give it that realtime feel when we add or remove boards.
    let that = this
    $nuxt.$fire.firestore
      .collection('boards')
      .where('users', 'array-contains', $nuxt.$fire.auth.currentUser.email)
      .onSnapshot(function (querySnapshot) {
        if (querySnapshot.docs.length > 0) {
          that.boards = []
          try {
            for (const doc of querySnapshot.docs) {
              let data = doc.data()
              data.id = doc.id
              that.boards.push(data)
            }
          } catch (err) {}
        }
      })
  }
}
</script>
<style lang="scss">
.v-dialog {
  border-radius: 15px;
  background-color: $white;
  padding: 15px;
}
.upload-block {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
}
</style>

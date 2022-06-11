<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card class="elevation-4 text-left" >
        <v-card-title class="fancy-title align-center justify-center">Registration</v-card-title><v-card-text>
          <v-form>
          <!-- assigned text field value to state values of component -->
            <v-text-field
              label="Register"
              name="register"
              prepend-icon="mdi-account"
              type="text"
              v-model="auth.email"
            ></v-text-field>

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="auth.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn
            class="register-button"
            @click="register"
            depressed
            large
            >Register</v-btn
          >
        </v-card-actions>
        <div class="d-flex" style="marginLeft: 10px;">
          
            <p>Already have an account?<nuxt-link to="/auth/signin"><b>Sign In</b></nuxt-link></p>
          
        </div>
      </v-card>
      <!-- display messages if register failed or success in snackbar -->
      <v-snackbar
        :timeout="4000"
        v-model="snackbar"
        absolute
        bottom
        center
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'signup',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register() {
      //register using firebase. 
      let that = this
      this.$fire.auth.createUserWithEmailAndPassword(this.auth.email, this.auth.password)
      .catch(function (error){
        // if error display message in snackBar
        that.snackbarText = error.message
        that.snackbar = true
      }).then((user) => {
          const userObj = {
            email: user.user.email,
            uid: user.user.uid
          }
          this.$fire.firestore
            .collection('users')
            .doc(user.user.uid)
            .set(userObj)
            .catch(function (error) {})
        //we are registered in
        $nuxt.$router.push('/')
      })
    }
  }
}
</script>
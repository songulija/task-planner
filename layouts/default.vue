<template>
  <v-app>
    <v-content >
        <!-- desktop -->
        <!-- <div class="d-none d-md-block"></div> -->
        <!-- mobile -->
        <div class="d-block">
        <!-- container with row and columns for top bar with vuetify -->
          <v-container fluid class="jello-topbar">
            <v-row no-gutters align="center" justify="start">
              <v-col cols="1" class="flex-grow-0 flex-shrink-0">
                <v-icon @click="drawer = true">mdi-menu</v-icon>
              </v-col>
              <v-col
                cols="1"
                style="min-width: 100px; max-width:100%;"
                class="flex-grow-1 flex-shrink-0"
              >
                <v-row no-gutters align="center" justify="center">
                  <nuxt-link to="/">
                    <v-row no-gutters align="center" justify="center">
                      <h3 class="logo">Tasker</h3>
                    </v-row>
                  </nuxt-link>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <!-- naigation drawer is that left bar. it consist of two parts. one
          displays user info, second displays buttons like Sign out and my boards -->
          <v-navigation-drawer v-model="drawer" fixed left class="d-block">
              <v-container fluid class="jello-topbar">
                <v-row no-gutters align="center" justify="space-between">
                  <v-icon @click="drawer = false">mdi-close</v-icon>

                    <v-row no-gutters align="center" justify="end"> 
                        <p class="jello-user">Signed in as<br>
                        <!-- getting user email with help of firebase -->
                        {{ $nuxt.$fire.auth.currentUser.email }}</p>
                        &nbsp;
                         <v-icon>mdi-account-circle-outline</v-icon>
                    </v-row>

                </v-row>
              </v-container>
              <!-- button container  -->
              <v-container class="d-block menu-items">
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    <br />
                    
                  </div>
                  <div class="d-flex">
                  <!-- icons wrappen in nuxt links -->
                    <nuxt-link to="/">
                      <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>My Boards</b>
                    </nuxt-link>
                  </div>
                  <div class="d-flex">
                  <!-- icons wrappen in nuxt links -->
                    <nuxt-link to="/sharedBoards">
                      <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>Shared Boards</b>
                    </nuxt-link>
                  </div>
                  <div class="d-flex">
                    <nuxt-link to="/auth/signout">
                      <v-icon>mdi-exit-to-app</v-icon>&nbsp;&nbsp;<b>Sign out</b>
                    </nuxt-link>
                  </div>
                </div>
              </v-container>
          </v-navigation-drawer>
        </div>
        <!-- content -->
          <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.menu-items a {
  color: $text-color;
  padding: 10px 0px 10px 3px;
  font-size: 24px;
}
</style>

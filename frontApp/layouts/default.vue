<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact v-show="item.isShow">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app :light="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar v-model="warningBar" color="warning">{{warningMessage}}</v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { isUserSignIn } from '~/utils';
@Component({
  name: 'LayoutDefaultPage',
})
export default class LayoutDefaultPage extends Vue {
  // middleware: 'authenticated'
  clipped:boolean = false;
  drawer:boolean = false;
  fixed:boolean = false;
  items:Array<any> = [
    {
      icon: 'mdi-chart-bubble',
      title: 'サインイン',
      to: '/login',
      isShow: false
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'サインアウト',
      to: '/logout',
      isShow: false
    }
  ];
  miniVariant:boolean = false;
  right:boolean = true;
  rightDrawer:boolean = false;
  title:string = 'Syncle';
  warningBar:boolean = false;
  warningMessage:string = '';
  signedInMenuIndex: number = 0;
  signOutMenuIndex: number = 1;
  private async mounted() {
    await this.$nextTick(async function () {
      const signedIn = await isUserSignIn();
      if (!signedIn) {
        this.items[this.signedInMenuIndex].isShow = true;
        this.items[this.signOutMenuIndex].isShow = false;
      }
      this.onSignedIn();
    });
    this.$nuxt.$on('warningSnackbar', this.onWarningSnackbar);
    this.$nuxt.$on('signedIn', this.onSignedIn);
    this.$nuxt.$on('signedOut', this.onSignedOut);
  }
  private beforeDestroy() {
    this.$nuxt.$off('warningSnackbar')
    this.$nuxt.$off('signedIn')
  }
  private onWarningSnackbar(message: string) {
      this.warningBar = true;
      this.warningMessage = message;
  }
  private onSignedIn() {
    this.items[this.signedInMenuIndex].isShow = false;
    this.items[this.signOutMenuIndex].isShow = true;
  }
  private onSignedOut() {
    this.items[this.signedInMenuIndex].isShow = true;
    this.items[this.signOutMenuIndex].isShow = false;
  }
}
</script>

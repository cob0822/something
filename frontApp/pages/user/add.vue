<template>
  <div class="d-flex justify-center">
    <v-form class="col-8">
      <v-text-field label="名前" v-model="name"></v-text-field>
      <v-text-field label="メールアドレス" v-model="email"></v-text-field>
      <v-text-field label="パスワード" type="password" v-model="password"></v-text-field>
      <v-text-field label="パスワード確認" type="password" v-model="password_confirm"></v-text-field>
      <div class="d-flex justify-center">
        <v-btn color="primary" large @click="register">登録する</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import apiClient from 'axios';
import { UserCreate } from '../../apis/user.api';
import { UserCreateRequest } from '../../types/user';

export default Vue.extend ({
  data: () => ({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  }),
  methods: {
    async register() {
      const params: UserCreateRequest = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm
      }
      this.$nuxt.$loading.start();
      const created: boolean = await UserCreate(params);
      this.$nuxt.$loading.finish();
      if (created) {
        // ここでHOME画面に飛ばしたいが効かず、Login画面に遷移してしまう
        this.$router.push('/');
      }
    }
  }
})
</script>

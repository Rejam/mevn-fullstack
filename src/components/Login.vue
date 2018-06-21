<template>
  <v-form v-model='valid' ref='form' lazy-validation>

    <v-text-field
        label='Email'
        v-model='email'
        :rules='emailRules'
        required
      ></v-text-field>

    <v-text-field
      label='Password'
      v-model='password'
      required
    ></v-text-field>

    <v-btn
      @click='submit'
      :disabled='!valid'
    >Submit
    </v-btn>

    <v-btn @click='clear'>Clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    async submit() {
      return axios({
        method: 'post',
        data: {
          email: this.email,
          password: this.password,
        },
        url: 'http://localhost:8081/users/login',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        window.localStorage.setItem('auth', res.data.token);
        this.$swal('Great!', 'You are logged in!', 'success');
        this.$router.push({ name: 'Home' });
      }).catch((err) => {
        const message = err.response.data.message;
        this.$swal('Oh oh!', `${message}`, 'error');
        this.$router.push({ name: 'Login' });
      });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<template>
  <v-form v-model='valid' ref='form' lazy-validation>

    <v-text-field
      label='Name'
      v-model='user.name'
      required
    ></v-text-field>

    <v-text-field
      label='Email'
      v-model='user.email'
      :rules='emailRules'
      required
    ></v-text-field>

    <v-text-field
      label='Password'
      v-model='user.password'
      required
    ></v-text-field>

    <v-text-field
      name='input-7-1'
      label='Confirm Password'
      v-model='confirm_password'
      :rules='[confirmPasswordRules]'
    ></v-text-field>

    <v-btn
      @click='submit'
      :disabled='!valid'
    >Submit</v-btn>

    <v-btn @click='clear'>clear</v-btn>

  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: true,
      user: {
        name: '',
        email: '',
        password: '',
      },
      confirm_password: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /\S+@\S+\.\S+/.test(v) || 'Email must be valid',
      ],
      confirmPasswordRules: v =>
        v === this.user.password || 'Please confirm password',
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            user: this.user,
          },
          url: 'http://localhost:8081/users/register',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          this.$swal(
            'Great!',
            'You have been successfully registered',
            'success',
          );
          this.$router.push({ name: 'Login' });
        }).catch((err) => {
          const message = err.response.data.message;
          this.$swal('Oh oo!', `${message}`, 'error');
        });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

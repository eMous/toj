<template>
  <v-sheet class="mx-auto pa-8" max-width="480" border>
    <h2>AdminHTL</h2>
    <v-form ref="form">
      <v-text-field
        v-model="formData.fullName"
        :rules="formRules.fullName"
        label="Email"
        required
        append-inner-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        v-model="formData.email"
        :rules="formRules.email"
        label="Email"
        required
        append-inner-icon="mdi-email"
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        :rules="formRules.password"
        label="Password"
        type="password"
        required
        append-inner-icon="mdi-lock"
      ></v-text-field>
      <v-text-field
        v-model="formData.rePassword"
        :rules="formRules.rePassword"
        label="Retype Password"
        type="password"
        required
        append-inner-icon="mdi-lock"
      ></v-text-field>
      <div class="d-flex items-center justify-space-between">
        <v-checkbox
          v-model="formData.checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="I agree to the terms"
          required
        ></v-checkbox>
        <v-btn rounded="sm" color="least" text="Register" max-width="120"> </v-btn>
      </div>
      <h3 class="text-lg text-gray-500">- OR -</h3>
      <div class="d-flex flex-column ga-2">
        <v-btn
          rounded="sm"
          color="least"
          text="Signing up using Facebook"
          prepend-icon="mdi-facebook"
          min-height="40"
        >
        </v-btn>
        <v-btn
          rounded="sm"
          color="error"
          text="Signing up using Google"
          prepend-icon="mdi-google"
          min-height="40"
        >
        </v-btn>
      </div>
      <div className="text-least text-left mt-4 font-bold cursor-pointer">
        <span> I already have a membership </span>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
const form = ref()
const formData = ref({
  fullName: '',
  email: '',
  password: '',
  rePassword: '',
  checkbox: false
})
const formRules = {
  fullName: [(v) => !!v || 'Full Name is required'],
  email: [(v) => !!v || 'Email is required', (v) => /.+@.+\..+/.test(v) || 'Email must be valid'],
  password: [
    (v) => !!v || 'Password is required',
    (v) => v.length >= 6 || 'Password must be at least 6 characters'
  ],
  rePassword: [
    (v) => !!v || 'Retype Password is required',
    (v) => v === password.value || 'Passwords must match'
  ]
}
</script>

<style scoped></style>

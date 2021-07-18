<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account ?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create Your FireBlogs Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" v-model="firstName" placeholder="First Name" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" v-model="lastName" placeholder="Last Name" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="email" v-model="email" placeholder="Email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="text" v-model="username" placeholder="User Name" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="password" v-model="password" placeholder="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../../src/assets/Icons/envelope-regular.svg";
import password from "../../src/assets/Icons/lock-alt-solid.svg";
import user from "../../src/assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });
        this.$router.push({ name: "Home" });
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>

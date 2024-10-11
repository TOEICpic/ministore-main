<template>
    <div class="container">
      <div class="signin-signup">
        <!-- Sign In Form -->
        <div class="signin">
          <h2>Sign In</h2>
          <div class="social-icons">
            <button class="social-btn"><i class="fab fa-google"></i></button>
            <button class="social-btn"><i class="fab fa-facebook-f"></i></button>
            <button class="social-btn"><i class="fab fa-twitter"></i></button>
            <button class="social-btn"><i class="fab fa-telegram"></i></button>
          </div>
          <p>or use your email password</p>
          <input type="text" placeholder="Username" v-model="signin.username" />
          <input type="password" placeholder="Password" v-model="signin.password" />
          <a href="#">Forgot Your Password?</a>
          <button @click="signIn" class="btn">Sign In</button>
        </div>
  
        <!-- Sign Up Section -->
        <div class="signup">
          <h2>HELLO, Friend</h2>
          <p>Register with your personal details to use all of site features</p>
          <button class="btn">Sign Up</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        signin: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      signIn() {
        // Add sign-in functionality here
        alert(`Signing in as ${this.signin.username}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  .signin-signup {
    display: flex;
    width: 60%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .signin {
    flex: 1;
    padding: 40px;
    background-color: #fff;
  }
  .signup {
    flex: 1;
    padding: 40px;
    background-color: #007bff;
    color: white;
    text-align: center;
  }
  h2 {
    margin-bottom: 20px;
  }
  .social-icons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  .social-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  a {
    display: block;
    margin-bottom: 20px;
    color: #007bff;
    text-align: right;
  }
  </style>
  
<template>
  <div class="container" ref="containerRef">
    <div class="forms-container">
      <!--这是重置密码的表单-->
      <div class="signin-signup">
          <v-form
          ref="resetRef"
          class="reset-form"
          v-if="showResetForm"
         @submit.prevent>
         <h2 class="title">重置密码</h2>
        <v-text-field
          color="secondary"
          :rules="resetRules.email"
          v-model.trim="resetForm.email"
          label="邮箱"
          clearable
        ></v-text-field>
      <v-row justify="between" align="center">
      <v-col cols="7">
        <v-text-field
        :ref="emailCodeRef.reset"
          label="验证码"
          color="secondary"
          variant="solo-filled"
          v-model.trim="resetForm.emailCode"
          :rules="resetRules.emailCode"
          required
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <CustomButton
          :isLoading="loadingList.emailCodeLoading"
          buttonText="发送验证码"
          loadingText="发送中"
          @click="sendEmailCode('resetPwd')"
        ></CustomButton>
      </v-col>
        </v-row>
        <v-text-field
      label="密码"
      color="secondary"
      v-model="resetForm.password"
      :rules="resetForm.password"
      variant="solo-filled"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="show.registerPassword ? 'visibility' : 'visibility_off'"
      @click:append-inner="show.registerPassword = !show.registerPassword "
      required
      clearable
    ></v-text-field>
    <v-text-field
      label="确认密码"
      color="secondary"
      v-model="resetForm.confirmPassword"
      :rules="resetForm.confirmPassword"
      variant="solo-filled"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="show.registerConfirmPassword ? 'visibility' : 'visibility_off'"
      @click:append-inner="show.registerConfirmPassword = !show.registerConfirmPassword "
      required
      clearable
    ></v-text-field>
    <v-row justify="center" align="center">
          <v-col cols="8">
            <CustomButton
              :isLoading="loadingList.loginLoading"
              buttonText="点击重置"
              loadingText="重置中"
              @click="resetPassword"></CustomButton>
          </v-col>
          <v-col cols="4">
            <button  class="btn transparent link" @click="showResetLogin">
              去登陆!
            </button>
          </v-col>
          </v-row>
      </v-form>
        
        <!--这是登录的表单-->
        
          <v-form
           ref="loginRef"
           v-if="!showResetForm"
           class="sign-in-form"
            @submit.prevent>
            <h2 class="title">登录</h2>
        <v-text-field
          label="邮箱"
          color="secondary"
          variant="solo-filled"
          prepend-inner-icon="mdi-email"
          v-model.trim="loginForm.email"
          :rules="loginRules.email"
          required
          clearable
        ></v-text-field>
        
        <v-text-field
          label="密码"
          color="secondary"
          v-model="loginForm.password"
          :rules="loginRules.password"
          variant="solo-filled"
          :type="show.loginPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-map-marker"
          :append-inner-icon="show.loginPassword ? 'visibility' : 'visibility_off'"
          @click:append-inner="show.loginPassword = !show.loginPassword"
        ></v-text-field>
        <v-row justify="center" align="center">
          <GoogleRecaptcha ref="recaptchaRef" @message="handlePopupMessage"></GoogleRecaptcha>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="8">
            <CustomButton
              :isLoading="loadingList.loginLoading"
              buttonText="点击登录"
              loadingText="登录中"
              @click="Login"></CustomButton>
          </v-col>
          <v-col cols="4">
            <button type="reset" class="btn transparent link" @click="showReset">
              忘记密码？
            </button>
          </v-col>
          </v-row>
    </v-form>
        
        <!--这是注册的表单-->
        
          <v-form
    ref="signUpRef"
    class="sign-up-form"
    @submit.prevent>
    <h2 class="title">注册</h2>
    <v-text-field
      label="邮箱"
      color="secondary"
      variant="solo-filled"
      v-model.trim="signUpForm.email"
      prepend-inner-icon="mdi-map-marker"
      :rules="signUpRules.email"
      required
      clearable
    ></v-text-field>
    <v-row justify="between" align="center">
      <v-col cols="7">
        <v-text-field
        :ref="emailCodeRef.register"
          label="验证码"
          color="secondary"
          variant="solo-filled"
          v-model.trim="signUpForm.emailCode"
          :rules="signUpRules.emailCode"
          required
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <CustomButton
          :isLoading="loadingList.emailCodeLoading"
          buttonText="发送验证码"
          loadingText="发送中"
          @click="sendEmailCode('register')"
        ></CustomButton>
      </v-col>
    </v-row>
    <v-text-field
      label="学工号"
      color="secondary"
      variant="solo-filled"
      v-model.trim="signUpForm.userId"
      :rules="signUpRules.userId"
      required
    ></v-text-field>
    <v-text-field
      label="密码"
      color="secondary"
      v-model="signUpForm.password"
      :rules="signUpRules.password"
      variant="solo-filled"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="show.registerPassword ? 'visibility' : 'visibility_off'"
      @click:append-inner="show.registerPassword = !show.registerPassword "
      required
    ></v-text-field>
    <v-text-field
      label="确认密码"
      color="secondary"
      v-model="signUpForm.confirmPassword"
      :rules="signUpRules.confirmPassword"
      variant="solo-filled"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="show.registerConfirmPassword ? 'visibility' : 'visibility_off'"
      @click:append-inner="show.registerConfirmPassword = !show.registerConfirmPassword "
      required
    ></v-text-field>
    <CustomButton
      buttonText="点击注册"
      loadingText="注册中"
      @click="SignUp"
      :isLoading="loadingList.signUploading"
    ></CustomButton>
   </v-form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>新用户 ?</h3>
          <p>请输入您的INFO</p>
          <button class="btn transparent" @click="showSignUp">去注册</button>
        </div>
        <img src="@/assets/register.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有账号 ?</h3>
          <p>请登录以享受CODE</p>
          <button class="btn transparent" @click="showSignIn">去登录</button>
        </div>
        <img src="@/assets/log.svg" class="image" alt="" />
      </div>
    </div>
  </div>
  <SnackBar />
</template>

<script setup>
import { useSnackbarStore } from "@/store/snackbar";
import GoogleRecaptcha from "@/components/Ai/GoogleRecaptcha.vue";
import { UserService } from "@/api/apiServices";
import { ref, getCurrentInstance, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { myLocalStorage } from "@/utils/storage";
const router = useRouter();
const route = useRoute();
const snackbarStore = useSnackbarStore();
const { proxy } = getCurrentInstance();
const loadingList = reactive({
  loginLoading: false,
  signUploading: false,
  resetLoading: false,
  emailCodeLoading: false,
});
const loginRef = ref(null);
const signUpRef = ref(null);
const resetRef = ref(null);
const recaptchaRef = ref(null);
const emailCodeRef = reactive({
  register: "",
  reset: "",
});
const loginForm = ref({});

const signUpForm = ref({});

const resetForm = ref({});
const show=reactive({
  loginPassword:false,
  registerPassword:false,
  oldPassword: false,
  newPassword: false,
  registerConfirmPassword: false,
})
const loginRules = {
  email: [
    (v) => !!v || '邮箱是必填项',
    (v) => Verify.email('邮箱格式不正确', v, (error) => !error || error.message)
  ],
  password: [
    (v) => !!v || '密码是必填项',
    (v) => Verify.password('密码格式不正确', v, (error) => !error || error.message)
  ]
};
const signUpRules = {
  email: [
    (v) => !!v || '邮箱是必填项',
    (v) => Verify.email('邮箱格式不正确', v, (error) => !error || error.message)
  ],
  emailCode: [
    (v) => !!v || '验证码是必填项'
  ],
  userId: [
    (v) => !!v || '学工号是必填项',
    (v) => Verify.userId('学工号格式不正确', v, (error) => !error || error.message)
  ],
  password: [
    (v) => !!v || '密码是必填项',
    (v) => Verify.password('密码格式不正确', v, (error) => !error || error.message)
  ],
  confirmPassword: [
    (v) => !!v || '确认密码是必填项',
    (v) => Verify.confirmPassword('两次输入的密码不一致', v, (error) => !error || error.message, signUpForm.value.password)
  ]
};
const resetRules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在", trigger: "blur" },
  ],
  emailCode: [{ required: true, message: "请输入验证码" }],
  password: [
    { required: true, message: "请输入新密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字、字母、特殊字符的8-18位组合",
      trigger: "blur",
    },
  ],
  newPassword: [
    { required: true, message: "请输入新密码" },
    {
      validator: (rule, value, callback) =>
        proxy.Verify.confirmPassword(rule, value, callback, resetForm.value.password),
      trigger: "blur",
    },
  ],
};
const Login = async () => {
  const {valid}=await loginRef.value.validate();
    if (valid) {
      const validateRecaptcha = await recaptchaRef.value.sendToServer();
      if (validateRecaptcha) {
        loadingList.loginLoading = true;
        let params = {};
        Object.assign(params, loginForm.value);
        await UserService.login(params)
          .then((res) => {
            if (res.code == 200) {
              myLocalStorage.set("user_uid", res.data.uid);
              myLocalStorage.set("user_identity", res.data.identity);
              proxy.VueCookies.set("LOGIN_STATUS", 1, "3d");
              router.push({ name: "index-app" });
            } else {
              snackbarStore.show(res.msg, "info");
            }
          })
          .finally(() => {
            loadingList.loginLoading = false;
          });
      }
    }
};
const SignUp = async() => {
  const {valid}=await signUpRef.value.validate();
    if (valid) {
      loadingList.signUploading = true;
      let params = {};
      Object.assign(params, signUpForm.value);
      const result = await UserService.register(params);
      if (result.code == 200) {
        snackbarStore.show("注册成功，请登录", "success");
        showSignIn();
      } else {
        snackbarStore.show(result.msg, "error");
      }
      loadingList.signUploading = false;
      loginForm.email = signUpForm.email;
    }
};
const sendEmailCode = async(purpose) => {
  let email = null;
  let valid;
  if (purpose === "register") {
    const {valid}=await emailCodeRef.register.validate();
    valid=valid;
  } else {
    const {valid}=await emailCodeRef.reset.validate();
    valid=valid;
  }
    if (valid) {
      loadingList.emailCodeLoading = true;
      let params = {
        email: email,
        purpose: purpose,
      };
      UserService.sendEmailCode(params)
        .then((res) => {
          if (res.code == 200) {
            snackbarStore.show("验证码发送成功，请注意查看", "success");
          } else {
            snackbarStore.show(res.msg, "error");
          }
        })
        .finally(() => {
          loadingList.emailCodeLoading = false;
        });
    }
};
const resetPassword = async() => {
  const {valid}=await resetRef.value.validate()
    if (valid) {
      loadingList.resetLoading = true;
      let params = {};
      Object.assign(params, resetForm.value);
      UserService.resetPwd(params)
        .then((res) => {
          if (res.code == 200) {
            snackbarStore.show("重置密码成功", "success");
            showResetLogin();
          } else {
            snackbarStore.show(res.msg, "error");
          }
        })
        .finally(() => {
          loadingList.resetLoading = false;
        });
    }
};
const containerRef = ref();
const showResetForm = ref(false);
const showReset = () => {
  showResetForm.value = true;
  if (loginRef.value) {
    loginRef.value.reset();
  }
};
const showResetLogin = () => {
  showResetForm.value = false;
  if (resetRef.value) {
    resetRef.value.reset();
  }
};
const showSignUp = () => {
  showResetForm.value = false;
  if (loginRef.value) {
    loginRef.value.reset();
  }
  if (resetRef.value) {
    resetRef.value.reset();
  }
  containerRef.value.classList.add("sign-up-mode");
};
const showSignIn = () => {
  showResetForm.value = false;
  if (signUpRef.value) {
    signUpRef.value.reset();
  }
  if (resetRef.value) {
    resetRef.value.reset();
  }
  containerRef.value.classList.remove("sign-up-mode");
};
</script>

<style lang="scss" scoped>
@use "@/styles/login.scss" as *;
</style>

<template>
  <v-container class="profile-pwd">
    <v-row class="row-top">
      <v-col cols="12">修改密码</v-col>
    </v-row>
    <v-form ref="pwdRef"  @submit.prevent>
      <v-row class="row">
        <v-col cols="12">
          <div class="row-title">旧密码</div>
        </v-col>
        <v-col cols="6">
            <v-text-field
              color="secondary"
              :type="show.oldPassword ? 'text' : 'password'"
              v-model.trim="pwdForm.oldPassword"
              clearable
              :append-inner-icon="show.oldPassword ? 'visibility' : 'visibility_off'"
              @click:append-inner="show.oldPassword = !show.oldPassword"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="row">
        <v-col cols="12">
          <div class="row-title">新密码</div>
        </v-col>
        <v-col cols="6">
            <v-text-field
              color="secondary"
              :type="show.newPassword ? 'text' : 'password'"
              v-model.trim="pwdForm.newPassword"
              clearable
              :append-inner-icon="show.newPassword ? 'visibility' : 'visibility_off'"
              @click:append-inner="show.newPassword = !show.newPassword"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="row">
        <v-col cols="12">
          <div class="row-title">确认新密码</div>
        </v-col>
        <v-col cols="6">
            <v-text-field
              color="secondary"
              :type="show.confirmPassword ? 'text' : 'password'"
              v-model.trim="pwdForm.confirmPassword"
              clearable
              :append-inner-icon="show.confirmPassword ? 'visibility' : 'visibility_off'"
              @click:append-inner="show.confirmPassword = !show.confirmPassword"></v-text-field>
        </v-col>
        <v-col cols="12">
          <span class="row-prompt"> 确保密码是数字、字母、特殊字符的8-18位组合 </span>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="row button">
      <v-col cols="12">
        <CustomButton
          :width="120"
          :height="45"
          :isLoading="loadingList.passwordLoading"
          buttonText="更新密码"
          loadingText="更新中"
          @click="updatePassword"></CustomButton>
        <v-btn variant="text" @click="showReset" base-color="secondary">忘记密码？</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { UserService } from "@/api/apiServices";
import { myLocalStorage } from "@/utils/storage";
import { ref, reactive, getCurrentInstance } from "vue";
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
const { proxy } = getCurrentInstance();
const show = reactive({
  oldPassword: false,
  newPassword: false,
  confirmPassword: false,
});
const pwdForm = ref({});
const pwdRef = ref();
const loadingList = reactive({
  passwordLoading: false,
});

const pwdRules = {
  oldPassword: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字、字母、特殊字符的8-18位组合",
      trigger: "blur",
    },
  ],
  newPassword: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字、字母、特殊字符的8-18位组合",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码" },
    {
      validator: (rule, value, callback) =>
        proxy.Verify.confirmPassword(rule, value, callback, pwdForm.value.newPassword),
      trigger: "blur",
    },
  ],
};
const showReset = () => {};
const updatePassword = () => {
  pwdRef.value.validate((valid) => {
    if (valid) {
      loadingList.passwordLoading = true;
      let params = {};
      params["uid"] = myLocalStorage.get("user_uid");
      Object.assign(params, pwdForm.value);
      UserService.updatePwd(params)
        .then((res) => {
          if (res.code == 200) {
            pwdForm.value = {};
            snackbarStore.show("更新密码成功", "success");
          } else {
            snackbarStore.show(res.msg, "error");
          }
        })
        .finally(() => {
          loadingList.passwordLoading = false;
        });
    }
  });
};
</script>

<style lang="scss" scoped>
.profile-pwd {
  .row-top {
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 18px;
    border-bottom: 1px solid #282936;
  }

  .row {
    .row-title {
      font-size: 1.15rem;
      margin-bottom: 8px;
    }
    .row-prompt {
      color: #999;
      font-size: 0.9rem;
    }
  }
  .btn.transparent {
    border: none;
    outline: none;
    color: #4d84e2;
    background: none;
    width: 100px;
    height: 40px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
  }
}
</style>

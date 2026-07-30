<template>
  <v-container class="profile-main">
    <v-row class="row-top">
      <v-col cols="12" md="8">个人简介</v-col>
    </v-row>
    <v-row class="row-middle" :gutter="20">
      <v-col cols="7" md="5" class="row-middle-left">
        <v-form ref="formRef">
          <v-text-field
            label="昵称"
            color="secondary"
            v-model="profile.nickName"
            :rules="profileRules.nickName"
            required
            class="fixed-width"></v-text-field>
          <v-text-field
            label="真实姓名"
            color="secondary"
            v-model="profile.realName"
            :rules="profileRules.realName"
            readonly
            required
            class="fixed-width"></v-text-field>
          <v-text-field
            label="邮箱"
            color="secondary"
            v-model="profile.email"
            :rules="profileRules.email"
            readonly
            required
            class="fixed-width"></v-text-field>
          <v-text-field
            label="学工号"
            color="secondary"
            v-model="profile.userId"
            :rules="profileRules.userId"
            clearable
            readonly
            required
            class="fixed-width"></v-text-field>
          <v-textarea
            label="签名"
            color="secondary"
            v-model="profile.signature"
            :rules="profileRules.signature"
            auto-grow
            clearable
            required
            class="fixed-width"></v-textarea>
          <CustomButton
            :width="120"
            :height="45"
            :isLoading="loadingList.profileLoading"
            buttonText="更新信息"
            loadingText="更新中"
            @click="updateProfile"></CustomButton>
        </v-form>
      </v-col>
      <v-col cols="5" md="5" class="row-bottom-right">
        <span class="title-style">个人头像</span>
        <v-img :src="avatarUrl" :width="320" :height="240"  cover></v-img>
        <div class="prompt">只能上传jpg/jpeg/png文件，且不超过2MB</div>
        <v-file-input
          ref="uploadRef"
          base-color="primary"
          label="点击上传头像"
          accept="image/jpeg,image/png,image/jpg"
          @change="handleFileChange"
          :loading="loadingList.avatarLoading"
          show-size
          max-width="240">
        </v-file-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, getCurrentInstance, reactive } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { UploadService } from "@/api/apiServices";
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
const { proxy } = getCurrentInstance();
const uploadRef = ref();
const avatarFile = ref();
const loadingList = reactive({
  avatarLoading: false,
  profileLoading: false,
});
const store = useUserStore();
const { profile, avatarUrl } = storeToRefs(store);
const updateProfile = async () => {
  loadingList.profileLoading = true;
  await store
    .updateProfile()
    .then(() => {})
    .finally(() => {
      loadingList.profileLoading = false;
    });
};
const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
const profileRules = {
  nickName: [{ required: true, message: "请输入昵称" }],
  realName: [{ required: true, message: "请输入真实姓名" }],
  userId: [
    { required: true, message: "请输入学工号" },
    { validator: proxy.Verify.userId, message: "学工号不存在", trigger: "blur" },
  ],
  signature: [{ required: true, message: "请输入个人签名" }],
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在", trigger: "blur" },
  ],
};
//点击文件后进行函数校验
const handleFileChange = (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file && beforeUpload(file)) {
    avatarFile.value = file;
    uploadAvatar(file); // 校验通过后上传文件
  }
};
//图片格式的逻辑校验
function beforeUpload(rawFile) {
  const isIMAGE = allowedTypes.includes(rawFile.type);
  const isL2M = rawFile.size / 1024 / 1024 < 2;
  if (!isIMAGE) {
    snackbarStore.show("上传文件只能是图片格式!", "error");
    return false;
  }
  if (!isL2M) {
    snackbarStore.show("上传文件大小不能超过2MB!", "error");
    return false;
  }
  return true;
}
const uploadAvatar = (file) => {
  let formdata = new FormData();
  formdata.append("file", file);
  loadingList.avatarLoading = true;
  UploadService.uploadAvatar(localStorage.getItem("user_uid"), formdata)
    .then((res) => {
      if (res.code == 200) {
        store.getProfile();
        uploadRef.value.clearFiles();
      } else {
        snackbarStore.show(res.msg, "error");
      }
    })
    .finally(() => {
      loadingList.avatarLoading = false;
    });
};
</script>

<style lang="scss" scoped>
.profile-main {
  .row-top {
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 18px;
    border-bottom: 1px solid #282936;
  }
  .row-middle {
    width: 100%;
    .row-middle-left {
      margin-right: 96px;
    }
    .row-bottom-right {
      .title-style {
        margin-left: 120px;
        font-size: 1.2rem;
      }
      .prompt {
        margin: 6px;
        color: #999;
        font-size: 0.9rem;
      }
    }
  }
}
</style>

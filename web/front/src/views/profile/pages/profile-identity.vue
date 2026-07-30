<template>
  <v-container class="profile-identity">
    <v-row class="row-top">
      <v-col cols="12">身份认证</v-col>
    </v-row>
    <v-row class="row-middle" :gutter="20">
      <v-col cols="7" md="5" class="row-middle-left">
        <v-form ref="identityRef">
          <v-text-field
            label="真实姓名"
            color="secondary"
            v-model="identityForm.realName"
            :rules="identityRules.realName"
            clearable
            required></v-text-field>
          <v-text-field
            label="学工号"
            color="secondary"
            v-model="identityForm.userId"
            :rules="identityRules.userId"
            clearable
            required></v-text-field>
          <v-radio-group v-model="identityForm.identity" :rules="identityRules.identity">
            <v-radio label="学生" value="student"></v-radio>
            <v-radio label="老师" value="teacher"></v-radio>
          </v-radio-group>
          <div class="prompt">只能上传jpg/jpeg/png文件，且不超过2MB</div>
          <v-file-input
            ref="uploadRef"
            color="secondary"
            label="证件上传"
            accept="image/jpeg,image/png,image/jpg"
            @change="handleFileChange"
            :loading="loadingList.identityLoading"
            show-size
            truncate-length="15"></v-file-input>

          <CustomButton
            :width="120"
            :height="45"
            :isLoading="loadingList.identityLoading"
            buttonText="点击提交"
            loadingText="提交中"
            @click="submitForm"></CustomButton>
        </v-form>
      </v-col>
      <v-col cols="5" md="5" class="row-middle-right">
        <div class="title-style">证件预览</div>
        <v-img
          :src="identityForm.imageUrl"
          class="image-view"
          :width="320"
          :height="240"
          cover>
          <v-icon v-if="!identityForm.imageUrl" icon="image"></v-icon>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { UploadService } from "@/api/apiServices";
import { myLocalStorage } from "@/utils/storage";
import { ref, reactive, getCurrentInstance } from "vue";
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
const { proxy } = getCurrentInstance();
const loadingList = reactive({
  identityLoading: false,
});
const uploadRef = ref();
const identityRef = ref();
const identityForm = reactive({});
const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
const identityRules = {
  realName: [{ required: true, message: "请输入真实姓名" }],
  userId: [
    { required: true, message: "请输入学工号" },
    { validator: proxy.Verify.userId, message: "学工号不存在", trigger: "blur" },
  ],
  identity: [{ required: true, message: "请选择身份" }],
};
// 将图片资源转换成base64格式
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let fileResult = "";
    reader.readAsDataURL(file);
    reader.onload = () => (fileResult = reader.result);
    reader.onerror = (error) => reject(error);
    reader.onloadend = () => resolve(fileResult);
  });
}
//点击文件后进行函数校验
const handleFileChange = (e) => {
  const file = e.target.files[0];
  console.log(file);

  if (file && beforeUpload(file)) {
    toBase64(file).then((result) => (identityForm.imageUrl = result));
    console.log(identityForm.imageUrl);
  }
};
//图片格式的逻辑校验
function beforeUpload(rawFile) {
  const isIMAGE = allowedTypes.includes(rawFile.type);
  if (!isIMAGE) {
    snackbarStore.show("上传文件只能是图片格式!", "error");
    return false;
  }
  const isL2M = rawFile.size / 1024 / 1024 < 2;
  if (!isL2M) {
    snackbarStore.show("上传文件大小不能超过2MB!", "error");
    return false;
  }
  return true;
}
//表单上传的逻辑
const submitForm = () => {
  identityRef.value.validate((valid) => {
    if (valid) {
      // 处理认证信息上传逻辑
      let params = {};
      Object.assign(params, identityForm);
      UploadService.uploadIdentity(myLocalStorage.get("user_uid"), params).then((res) => {
        if (res.code === 200) {
          snackbarStore.show("上传信息成功", "success");
        } else {
          snackbarStore.show("上传失败", "error");
        }
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.profile-identity {
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
      .prompt {
        margin: 6px;
        color: #999;
        font-size: 0.9rem;
      }
    }
    .row-middle-right {
      .title-style {
        margin-left: 120px;
        font-size: 1.2rem;
      }
      .image-view {
        text-align: center;
        border: 2px solid #c7c7c7;
        font-size: 2.4rem;
        color: #5995fd;
        line-height: 240px;
      }
    }
  }
}
</style>

<template>
	<div>
		<h1>demo17 -- 上传进度</h1>
    <input ref="test" type="file" @change="onPreview" accept="image/*" class="upload-input">
    <button @click="upload">上传文件</button>
    <div class="grid-container">
      <div class="grid-item1 grid-item">
        <img class="img" :src="previewImg.src">
        <div class="filter" v-if="uploading">
          <progress :value=progress max="100" class="meter"></progress>
          <p class="progress-text">{{progressText}}</p>
        </div>
      </div>
      <div class="grid-item2 grid-item">
        <img class="img" :src="previewImg.src">
        <div class="filter" v-if="uploading">
          <meter :value=progress max="100" class="meter"></meter>
          <p class="progress-text">{{progressText}}</p>
        </div>
      </div>
      <div class="grid-item3 grid-item">
        <img class="img" :src="previewImg.src">
        <div>
          <div class="filter" :style="{'transform': `translateY(${250 * progress * 0.01}px)`}" v-if="uploading"></div>
          <p class="progress-text">{{progressText}}</p>
        </div>
      </div>
      <div class="grid-item4 grid-item">
        <img class="img" :src="previewImg.src">
        <div class="filter" v-if="uploading">
          <div class="loader">
            <div class="loader-bg">
              <p class="progress-text progress-text-center">{{progressText}}</p>
            </div>
            <div class="loader-container">
              <div class="loader-circle loader-left-circle" :style="{'transform': `rotate(${leftAngel}deg)`}"></div>
            </div>
            <div class="loader-container">
              <div class="loader-circle loader-right-circle" :style="{'transform': `rotate(${rightAngel}deg)`}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="outer">
      <div class="loader">
        <div class="loader-bg"></div>
        <div class="loader-container">
          <div class="loader-circle loader-left-circle loader-left-circle-animation"></div>
        </div>
        <div class="loader-container">
          <div class="loader-circle loader-right-circle loader-right-circle-animation"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Cookie from 'js-cookie'

  // TODO: 1上传token
  // TODO: 2总结

  export default {
    data() {
      return {
        progressRatio: 0,
        previewImg: {},
        max: 100,
        uploadFinish: false
      }
    },
    computed: {
      uploading() {
        return this.previewImg.src && !this.uploadFinish
      },
      progress() {
        return Math.round(this.max * this.progressRatio)
      },
      progressText() {
        return this.progress ? this.progress + '%' : '0'
      },
      rightAngel() {
        const endAngel = 45;
        return this.progress > 50 ? endAngel : -135 + 360 * this.progress * 0.01
      },
      leftAngel() {
        const startDeg = -135;
        return this.progress < 50 ? startDeg : startDeg + (this.progress * 0.01 - 0.5) * 360
      }
    },
    methods: {
      onPreview(e) {
        const { files } = e.target;
        this.previewImage(files).then(v => {
          this.previewImg = v[0];
          this.resetStatus()
        }).catch(error => {
          console.error('预览缩略图失败', error)
        });
      },

      resetStatus() {
        this.uploadFinish = false;
        this.progressRatio = 0;
      },

      previewImage(files) {
        // 封装promise数组
        const promises = Object.keys(files).map(file => (
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(files[file]);
            reader.addEventListener('load', () => {
              resolve({
                src: reader.result,
                name: files[file].name,
                id: files[file].name + files[file].lastModified,
                file: files[file]
              })
            })
          })
        ));
        return Promise.all(promises)
      },

      async upload() {
        // 通过formData上传图片
        const token = await this.getUploadToken();
        const data =  {
          token,
          file: this.previewImg.file,
        };
        // 上传进度
        let onUploadProgress = (progressEvent) => {
          this.progressRatio = progressEvent.loaded / progressEvent.total
        };
        const config = {
          onUploadProgress,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: false,
        };

        const url = 'http://up-z1.qiniup.com';
        const domain = 'http://design.oldzhou.cn';
        try {
          // 上传到七牛
          const res = await axios.post(url, this.getFromData(data), config);
          this.previewImg.src = `${domain}/${res.data.key}`;
        } catch (e) {
          this.progressRatio = 0;
          console.log('上传失败', e)
        }
      },

      // 获取上传图片凭证
      async getUploadToken() {
        let token = Cookie.get('uploadToken');
        if (token) {
          return token
        }
        const url = 'http://139.199.125.59/demo/upload/certificate';
        const res = await axios.get(url);
        token = res.data.ret.uploadToken;
        // cookie有效期10分钟
        const expireTime = new Date(Date.now() + 60 * 1000);
        Cookie.set('uploadToken', token, {
          expires: expireTime
        });
        return token
      },

      getFromData(data) {
        const formData = new FormData();
        for (const prop in data) {
          if (data.hasOwnProperty(prop)) {
            formData.append(prop, data[prop])
          }
        }
        return formData
      }
    },
  }
</script>

<style scoped lang="less">
  .grid-container {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
    margin: 20px 0 0 20px;
    border: 1px solid #333;
  }
  .grid-item {
    position: relative;
    height: 250px;
    line-height: 250px;
    overflow: hidden;
  }
  .grid-item1 {
    grid-column: 1/2;
  }
  .grid-item2 {
    grid-column: 2/3;
  }
  .grid-item3 {
    grid-column: 1/2;
  }
  .grid-item4 {
    grid-column: 2/3;
  }
  .upload-input {
    margin: 10px 0;
  }
  .img {
    width: 100%;
  }
  .meter {
    width: 150px;
  }
  .filter {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: all 3s linear;
  }
  .progress-text {
    position: absolute;
    left: 50%;
    top: 52%;
    transform: translateX(-50%);
    width: 50px;
    height: 20px;
    color: lavenderblush;
    font-size: 16px;
    line-height: 1;
  }
  .progress-text-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .outer {
    position: fixed;
    right: 200px;
    top: 200px;
    width: 400px;
    height: 250px;
    border: 1px solid darkgray;
  }
  .loader {
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
  }
  .loader-container {
    box-sizing: inherit;
    position: relative;
    width: 50%;
    height: 100%;
    overflow: hidden;
    float: left;
  }
  .loader-bg {
    box-sizing: inherit;
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    border: 10px darkgray solid;
    border-radius: 50%;
  }
  .loader-circle {
    box-sizing: inherit;
    position: absolute;
    top: 0;
    width: 200%;
    height: 100%;
    border: 10px transparent solid;
    border-radius: 50%;
  }
  .loader-left-circle {
    left: 0;
    border-bottom-color: royalblue;
    border-left-color: royalblue;
  }
  .loader-left-circle-animation {
    animation: circle-left-run 4s linear infinite;
  }
  @keyframes circle-left-run {
    0%, 50% {
      transform: rotate(-135deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }
  .loader-right-circle {
    right: 0;
    border-top-color: royalblue;
    border-right-color: royalblue;
  }
  .loader-right-circle-animation {
    animation: circle-right-run 4s linear infinite;
  }
  @keyframes circle-right-run {
    0% {
      transform: rotate(-135deg);
    }
    50%, 100% {
      transform: rotate(45deg);
    }
  }
</style>

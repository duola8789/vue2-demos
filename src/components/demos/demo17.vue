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
          <div class="loader"></div>
          <div class="right"  v-if="progress < 50">
            <div class="loader-cover-right" :style="{'transform': `rotate(${45}deg)`}">
            </div>
          </div>
          <div class="left"  v-else>
            <div class="loader-cover-left"
                 :style="{'transform': `translate(-50%, -50%) rotate(${-135}deg)`}">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

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
      progress () {
        return Math.round(this.max * this.progressRatio)
      },
      progressText() {
        return this.progress ? this.progress + '%': '0'
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
        this.uploadFinish = false
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

      async upload () {
        // 通过formData上传图片
        const data = {
          token: 'H4E4mX6XAQ3eWGeujorbodiSmzHEPivpO3lwv_5E:Rev-paiP4ee7t0V_O7uz9VRMuu4' +
            '=:eyJzY29wZSI6InBlLWlkZWEiLCJkZWFkbGluZSI6MTUzNTcwOTM1N30=',
          file: this.previewImg.file,
        };
        // 上传到七牛
        const onUploadProgress = progressEvent => {
          this.progressRatio = progressEvent.loaded / progressEvent.total
        };
        const config =  {
          onUploadProgress,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: false,
        };

        const url = 'http://up-z1.qiniup.com';
        const domain = 'http://design.oldzhou.cn';

        const res = await axios.post(url, this.getFromData(data), config);

        this.previewImg.src = `${domain}/${res.data.key}`;
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

<style scoped>
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
  .loader {
    display: none;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 10px solid lavenderblush;
  }
  .right {
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-100%, -50%);
    width: 50px;
    height: 100px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .loader-cover-right {
    width: 100px;
    height: 100px;
    border: 10px solid red;
    border-top:10px solid green;
    border-right:10px solid green;
    border-radius: 50%;
    box-sizing: border-box;
  }
  /* TODO: 总结一下*/
  .loader-cover-left {
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%) rotate(-135deg);
    width: 100px;
    height: 100px;
    border: 10px solid transparent;
    border-top:10px solid red;
    border-right:10px solid red;
    border-radius: 50%;
  }
</style>

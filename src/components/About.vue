<template>
  <div class="section big-section" id="about">
    <div class="form-content">
      <div class="form-list">
        <div class="input-item">
          <div class="input-name">
            <i>*</i> 1、一句话介绍酒店亮点<span>（字数限制10-52个）</span>
          </div>
          <textarea
            class="input-info"
            type="text"
            maxlength="52"
            v-model="options.point"
            v-on:blur="onInputBlur('point')"
          />
        </div>
        <div class="input-item">
          <div class="input-name">
            <i>*</i> 2、酒店介绍<span>（字数限制50-180个）</span>
          </div>
          <textarea
            maxlength="180"
            class="input-info"
            type="text"
            v-model="options.des"
            v-on:blur="onInputBlur('des')"
          />
        </div>
        <div class="input-item">
          <div class="input-name">
            <i>*</i> 3、上传图片<span>（照片比例为4:3，大小限制为0.3-2M）</span>
          </div>
          <div class="upload-file custom-btn btn-4">
            <input
              type="file"
              class="input-file"
              @change="handleSuccess"
              multiple="true"
            />
            <span class="tip">点击上传图片</span>
          </div>
        </div>
        <button class="custom-btn btn-11" @click="saveImgToBoard">
          {{ saveStatus ? "已保存" : "保存" }}
        </button>
      </div>
      <div class="img-box">
        <img id="aboutImg" class="item-img" src="" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
//使用
 

export default {
  name: "about",
  data() {
    return {
      saveStatus: false,
      options: {
        point: "",
        des: "",
        img_url: "https://fp.yangcong345.com/middle/1.0.0/asset/blank.png",
      },
    };
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.drawImg();
        this.saveStatus = false;
      },
    },
  },
  mounted() {
    this.drawImg();
  },
  methods: {
    drawImg() {
      const data = {
        width: 750,
        height: 1150,
        quality: 1,
        ratio: 2,
        output: "png",
        elements: [
          {
            type: "img",
            x: 0,
            y: 0,
            width: 750,
            height: 1150,
            radius: 0,
            content: "https://fp.yangcong345.com/middle/1.0.0/asset/about.png",
          },
          {
            type: "text",
            x: 68,
            y: 148,
            width: 608,
            autoHeight: true,
            lineHeight: 1.6,
            letterSpacing: "1px",
            fontSize: 36,
            bold: 800,
            color: "#333",
            fontFamily: '"buer"',
            content: this.options.point,
          },
          {
            type: "img",
            x: 67.5,
            y: 342,
            width: 615,
            height: 461.25,
            content: this.options.img_url,
          },
          {
            type: "text",
            x: 68,
            y: 830,
            width: 608,
            autoHeight: true,
            lineHeight: 1.6,
            letterSpacing: "1px",
            fontSize: 22,
            color: "#333",
            fontFamily: '"buer-b"',
            content: this.options.des,
          },
        ],
      };
      var img = document.getElementById("aboutImg");
      json2image(
        data,
        (url) => {
          img.src = url;
        },
        (err) => console.error(err)
      );
    },

    onInputBlur(type) {
      switch (type) {
        case "point":
          if (this.options.point.length < 10) {
            this.$toast("酒店亮点至少要10个字");
          }
          break;
        case "des":
          if (this.options.des.length < 50) {
            this.$toast("酒店介绍至少要50个字");
          }
          break;
      }
    },
    handleSuccess(e) {
      const file = e.target.files[0];
      // 限制上传图片类型
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$toast("图片类型要求：jpeg、jpg、png");

        return false;
      }
      // 图片大小不超过1M
      if (file.size / (1024 * 1024) > 3) {
        this.$toast("图片大小不超过3M");
        return false;
      }
      // 文件转化base64格式，用于页面预览（或调用接口上传图片，获取图片地址，再赋值
      var reader = new FileReader();
      reader.onload = (data) => {
        this.options.img_url = data.target.result; // 图片赋值
        var tip = document.querySelector(".tip");
        tip.textContent = file.name;
      };
      reader.readAsDataURL(file);
    },

    saveImgToBoard() {
      const options = this.options;
      for (var i in options) {
        if (
          options[i] === "" ||
          options["img_url"] === "https://fp.yangcong345.com/middle/1.0.0/asset/blank.png" ||
          options["des"].length < 50 ||
          options["point"].length < 10
        ) {
          this.$toast("每一项都需要按规则填写哦");
          return;
        }
      }
      if (!this.saveStatus) {
        this.$emit("saveImgToDownLoad", {
          id: "aboutImg",
          options: this.options,
        });
        this.$toast("保存成功");
        this.saveStatus = true;
      } else {
        this.$toast("当前图片已经保存过了，请重新修改后重试");
      }
    },
  },
};
</script>

<style>
.upload-file {
  position: relative;
  width: 120px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: rgb(245, 95, 55);
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: bolder;
  text-align: center;
  overflow: hidden;
  margin: 10px 0;
}

.upload-file span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #fff;
}

.upload-file:hover {
  font-size: 14px;
  border: none;
}

.upload-file input[type="file"] {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
  z-index: 1;
}
</style>

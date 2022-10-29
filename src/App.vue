<template>
  <div>
    <div class="guide-mask" v-if="showGuide">
      <div class="guide-box" v-if="showGuide">
        <div class="close-button" @click="closeGuide">X</div>
        <h3>使用步骤</h3>
        <pre>
          1、当前页面所有模块从上到下每个模块都必须填写。
          2、除了“基本信息“和“关于本店“外，<i>酒店特色服务</i> ，<i>周边吃喝玩乐</i> ，<i>城市必打卡</i>三个模块都可以点击各自头部旁边的按钮来新增一个同类型的模块。
          3、新增的模块可以在当前模块的底部使用删除模块按钮删除当前模块。
          4、每个模块中所有的事项都需要按照标题旁边的规则仔细填写，如果当前模块保存时出现 <i>每一项都需要按规则填写哦</i>的提示时，需要检查是否有选项未按照规则填写。
          5、每个模块在填写完成后都需要<i>点击保存按钮</i>才能保证当前模块在最后的展板列表中出现。
          6、每个模块在保存后还是可以再修改，修改完毕后需要再次点击保存才能更新。
          7、选择展板的时候要注意<i>酒店特色服务</i> 模块最多只可以选择一个。
          8、必须选择三个展板，才可以生成展板预览图。 
        </pre>
      </div>
    </div>
    <div class="left-menu" v-if="isfixTab">
      <img
        src="https://fp.yangcong345.com/middle/1.0.0/WeChatd602d8b4f086c6aa98435c5392a30bed.png"
        alt=""
      />
      <div @click="closeGuide">使用步骤</div>
      <a
        :href="'#' + item.id"
        class="action"
        v-for="item in hotelArr"
        :key="item.id + 123"
      >
        {{ item.name }}
      </a>
      <a
        :href="'#' + item.id"
        class="action"
        v-for="item in aroundArr"
        :key="item.id + 123"
      >
        {{ item.name }}
      </a>
      <a
        :href="'#' + item.id"
        class="action"
        v-for="item in signInArr"
        :key="item.id + 123"
      >
        {{ item.name }}
      </a>
    </div>
    <Banner />
    <ul class="menu-box" v-if="isfixTab"></ul>
    <ul id="menu" :class="{ 'menu-box': true, fixedNavbar: isfixTab }">
      <li>
        <a href="#banner">首页</a>
      </li>
      <li>
        <a href="#baseInfo">基本信息</a>
      </li>
      <li>
        <a href="#about">关于本店</a>
      </li>
      <li>
        <a href="#hotel">设置模块</a>
      </li>
    </ul>
    <h1>基本信息</h1>
    <BaseInfo @saveImgToDownLoad="saveImgToDownLoad" />
    <hr align="center" width="100%" color="#ccc" SIZE="1" />

    <h1>关于本店</h1>
    <About
      @changeCropModel="changeCropModel"
      :cropedImg="cropedImg"
      @saveImgToDownLoad="saveImgToDownLoad"
    />
    <hr align="center" width="100%" color="#ccc" SIZE="1" />

    <h1 class="module-title">
      酒店特色服务
      <div class="add-new" @click="addSection('hotel')">新增模块</div>
    </h1>
    <template v-for="(item, index) in hotelArr">
      <h2 :key="item.id + 'hotel'">{{ item.name }}</h2>
      <div class="section" :id="item.id" :key="item.id + 'hotel1'">
        <Hotel
          :id="item.id"
          :itemIndex="index"
          :name="item.name"
          @removeSection="removeSection"
          @saveImgToBoard="saveImgToBoard"
          @changeCropModel="changeCropModel"
          :cropedImg="cropedImg"
        />
      </div>
      <hr
        align="center"
        width="100%"
        color="#ccc"
        SIZE="1"
        :key="item.id + 'hotel2'"
      />
    </template>
    <h1 class="module-title">
      周边吃喝玩乐
      <div class="add-new" @click="addSection('around')">新增模块</div>
    </h1>
    <template v-for="(item, index) in aroundArr">
      <h2 :key="item.id + 'around'">{{ item.name }}</h2>
      <div class="section" :id="item.id" :key="item.id + 'around1'">
        <Around
          :id="item.id"
          :itemIndex="index"
          :name="item.name"
          @removeSection="removeSection"
          @saveImgToBoard="saveImgToBoard"
          @changeCropModel="changeCropModel"
          :cropedImg="cropedImg"
        />
      </div>
      <hr
        align="center"
        width="100%"
        color="#ccc"
        SIZE="1"
        :key="item.id + 'around2'"
      />
    </template>
    <h1 class="module-title">
      城市必打卡
      <div class="add-new" @click="addSection('signIn')">新增模块</div>
    </h1>
    <template v-for="(item, index) in signInArr">
      <h2 :key="item.id + 'signIn'">{{ item.name }}</h2>
      <div :key="item.id + 'signIn2'" class="section" :id="item.id">
        <SignIn
          :id="item.id"
          :itemIndex="index"
          :name="item.name"
          @removeSection="removeSection"
          @saveImgToBoard="saveImgToBoard"
          @changeCropModel="changeCropModel"
          :cropedImg="cropedImg"
        />
      </div>
      <hr
        align="center"
        :key="item.id + 'signIn3'"
        width="100%"
        color="#ccc"
        SIZE="1"
      />
    </template>
    <div class="submit-cont">
      <button class="custom-btn btn-4 submit" @click="createBoardList">
        提交
      </button>
    </div>
    <div class="section board-list" v-if="showBoardList">
      <div class="mask" @click="close"></div>
      <div class="display-board" v-if="!showDownload">
        <div class="close-button" @click="close">X</div>
        <div class="topic-title">
          点击图片选择3个模块添加到展板，请注意：“酒店特色服务”只能选择一个模块哦
        </div>
        <div class="board-list-box">
          <div
            v-for="item in boardList"
            :key="item.id"
            @click="changeChecked(item)"
            :class="{
              'swiper-slide': true,
              checked: item.checked || false,
            }"
          >
            <MyCheckBox :item="item">{{ item.id }}</MyCheckBox>
          </div>
        </div>
        <div class="make-board" @click="makeBoard">生成展板</div>
      </div>
      <div class="display-board" v-if="showDownload">
        <div class="loading" v-if="loading">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
        <div class="board-box">
          <div class="back-board-list" @click="backToBoardList">返回</div>
          <img src="" alt="" id="boardImg" />
          <button
            class="custom-btn btn-11 download"
            v-if="!loading"
            @click="downImg"
          >
            打包下载
          </button>
        </div>
      </div>
    </div>
    <CropImg
      v-if="cropImgStatus"
      :cropProps="cropProps"
      @changeCropModel="changeCropModel"
      @setCropImg="setCropImg"
    />
  </div>
</template>

<script>
import JSZip from "jszip";
import FileSaver from "file-saver";
import Banner from "./components/Banner.vue";
import BaseInfo from "./components/BaseInfo.vue";
import About from "./components/About.vue";
import Hotel from "./components/Hotel.vue";
import Around from "./components/Around.vue";
import MyCheckBox from "./components/MyCheckBox.vue";
import SignIn from "./components/SignIn.vue";
import CropImg from "./components/CropImg.vue";
import json2image from "./utils/index";

let time = true;
export default {
  name: "app",
  components: {
    CropImg,
    Banner,
    BaseInfo,
    About,
    Hotel,
    Around,
    SignIn,
    MyCheckBox,
  },
  data() {
    return {
      isfixTab: false,
      hotelArr: [{ id: "hotel", name: "酒店特色服务" }],
      aroundArr: [{ id: "around", name: "周边吃喝玩乐" }],
      signInArr: [{ id: "signIn", name: "城市必打卡" }],
      boardList: [],
      about: [],
      baseInfo: [],
      selectedBoards: [],
      showBoardList: false,
      showDownload: false,
      loading: false,
      cropImgStatus: false,
      cropedImg: {
        img: "",
        id: "",
      },
      cropProps: {
        img: "",
        id: "",
      },
      showGuide: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleTabFix, true);
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.handleTabFix, true);
    next();
  },
  methods: {
    closeGuide() {
      this.showGuide = !this.showGuide;
    },
    setCropImg({ status, img, id }) {
      this.cropedImg = { img, id };
      this.cropImgStatus = status;
    },
    changeCropModel({ status, img, id }) {
      this.cropProps = { img, id };
      this.cropImgStatus = status;
    },
    handleTabFix() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var banner = document.querySelector("#banner").clientHeight;
      scrollTop > banner ? (this.isfixTab = true) : (this.isfixTab = false);
    },
    addSection(type) {
      if (time) {
        time = false;
        if (type === "hotel") {
          const hotelId = Math.round(Math.random() * 1000000);
          const len = this.hotelArr.length;
          this.hotelArr.push({
            id: `hotel${hotelId}`,
            name: "酒店特色服务" + len,
          });
        }
        if (type === "around") {
          const aroundId = Math.round(Math.random() * 1000000);
          const len = this.aroundArr.length;
          this.aroundArr.push({
            id: `around${aroundId}`,
            name: "周边吃喝玩乐" + len,
          });
        }
        if (type === "signIn") {
          const signInId = Math.round(Math.random() * 1000000);
          const len = this.signInArr.length;
          this.signInArr.push({
            id: `signIn${signInId}`,
            name: "城市必打卡" + len,
          });
        }
        this.$toast("创建成功");
      }
      setTimeout(function () {
        time = true;
      }, 2000);
    },

    removeSection({ type, id }) {
      const remove = (arr, val) => {
        for (let i in arr) {
          if (arr[i].id === val) {
            arr.splice(i, 1);
            return;
          }
        }
      };
      if (type === "hotel") {
        remove(this.hotelArr, id);
      }
      if (type === "around") {
        remove(this.aroundArr, id);
      }
      if (type === "signIn") {
        remove(this.signInArr, id);
      }
    },
    saveImgToDownLoad({ id, options, name }) {
      var img = document.getElementById(id);
      const item = {
        id,
        options,
        src: img.getAttribute("src"),
        checked: false,
        name,
      };
      if (id === "aboutImg") {
        this.about = [item];
      } else {
        this.baseInfo = [item];
      }
    },
    saveImgToBoard({ id, options, name }) {
      var img = document.getElementById(id);
      const item = {
        id,
        options,
        name,
        src: img.getAttribute("src"),
        checked: false,
      };
      const _key = this.boardList.some((i) => i.id === item.id);
      if (_key) {
        this.boardList.map((i) => {
          if (i.id === item.id) {
            i.src = item.src;
          }
        });
      } else {
        this.boardList = [...this.boardList, item];
      }
    },
    createBoardList() {
      if (this.about.length === 0) {
        this.$toast("注意：关于本店模块未保存");
        return;
      }
      if (this.baseInfo.length === 0) {
        this.$toast("注意：基本信息模块未保存");
        return;
      }
      if (
        this.aroundArr.length + this.signInArr.length + this.hotelArr.length !==
        this.boardList.length
      ) {
        this.$toast("注意：有模块尚未保存完毕");
        return;
      } else {
        this.showBoardList = true;
      }
    },
    makeBoard() {
      this.showDownload = true;
      this.loading = true;
      if (this.selectedBoards.length < 3) {
        this.$toast("必须要选择三个哦～");
        return;
      }
      let optionsArr = [];
      for (var i of this.selectedBoards) {
        const hotelOptions = this.boardList.filter(
          (item) => item.id.indexOf("hotel") != -1 && item.id === i
        )[0];
        const aroundOptions = this.boardList.filter(
          (item) => item.id.indexOf("around") != -1 && item.id === i
        )[0];
        const signInOptions = this.boardList.filter(
          (item) => item.id.indexOf("signIn") != -1 && item.id === i
        )[0];
        if (hotelOptions) {
          const data = {
            width: 1420,
            height: 455,
            quality: 1,
            ratio: 2,
            output: "png",
            elements: [
              {
                type: "img",
                x: 0,
                y: 0,
                width: 1420,
                height: 455,
                radius: 0,
                content:
                  "https://fp.yangcong345.com/middle/1.0.0/hotelBoard.jpg",
              },
              {
                type: "text",
                x: 625,
                y: 128,
                width: 600,
                autoHeight: true,
                lineHeight: 1.4,
                letterSpacing: "1px",
                fontSize: 45,
                bold: 800,
                color: "#333",
                fontFamily: '"buer"',
                content: hotelOptions.options.des,
              },
              {
                type: "img",
                x: 94,
                y: 207,
                width: 143,
                height: 107,
                content: hotelOptions.options.img_url,
              },

              {
                type: "text",
                x: 94,
                y: 150,
                width: 608,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 36,
                bold: 800,
                color: "#333",
                fontFamily: '"buer"',
                content: hotelOptions.options.name,
              },
              {
                type: "text",
                x: 135,
                y: 389,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: hotelOptions.options.other,
              },

              {
                type: "text",
                x: 135,
                y: 364,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: hotelOptions.options.address,
              },
              {
                type: "text",
                x: 135,
                y: 340,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: hotelOptions.options.time,
              },
            ],
          };
          json2image(
            data,
            (url) => {
              optionsArr.push(url);
            },
            (err) => console.error(err)
          );
        }
        if (aroundOptions) {
          const data = {
            width: 1420,
            height: 455,
            quality: 1,
            ratio: 2,
            output: "png",
            elements: [
              {
                type: "img",
                x: 0,
                y: 0,
                width: 1420,
                height: 455,
                radius: 0,
                content:
                  "https://fp.yangcong345.com/middle/1.0.0/aroundBoard.jpg",
              },
              {
                type: "text",
                x: 625,
                y: 128,
                width: 600,
                autoHeight: true,
                lineHeight: 1.4,
                letterSpacing: "1px",
                fontSize: 45,
                bold: 800,
                color: "#333",
                fontFamily: '"buer"',
                content: aroundOptions.options.des,
              },
              {
                type: "text",
                x: 650,
                y: 361,
                width: 492,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 28,
                textAlign: "right",
                color: "#333",
                fontFamily: "buer-b",
                content: "——" + aroundOptions.options.person,
              },
              {
                type: "img",
                x: 94,
                y: 207,
                width: 143,
                height: 107,
                content: aroundOptions.options.img_url,
              },

              {
                type: "text",
                x: 94,
                y: 150,
                width: 608,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 36,
                bold: 800,
                color: "#333",
                fontFamily: '"buer"',
                content: aroundOptions.options.name,
              },
              {
                type: "text",
                x: 170,
                y: 341,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: aroundOptions.options.distance,
              },

              {
                type: "text",
                x: 170,
                y: 365,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: aroundOptions.options.per,
              },

              {
                type: "text",
                x: 170,
                y: 316,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: aroundOptions.options.recommend,
              },
              {
                type: "text",
                x: 170,
                y: 388,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: aroundOptions.options.time,
              },
            ],
          };
          json2image(
            data,
            (url) => {
              optionsArr.push(url);
            },
            (err) => console.error(err)
          );
        }
        if (signInOptions) {
          const data = {
            width: 1420,
            height: 455,
            quality: 1,
            ratio: 2,
            output: "png",
            elements: [
              {
                type: "img",
                x: 0,
                y: 0,
                width: 1420,
                height: 455,
                radius: 0,
                content:
                  "https://fp.yangcong345.com/middle/1.0.0/signInBoard.jpg",
              },
              {
                type: "text",
                x: 625,
                y: 128,
                width: 600,
                autoHeight: true,
                lineHeight: 1.4,
                letterSpacing: "1px",
                fontSize: 45,
                bold: 800,
                color: "#333",
                fontFamily: '"buer"',
                content: signInOptions.options.des,
              },
              {
                type: "text",
                x: 650,
                y: 361,
                width: 492,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 28,
                textAlign: "right",
                color: "#333",
                fontFamily: "buer-b",
                content: "——" + signInOptions.options.person,
              },
              {
                type: "img",
                x: 94,
                y: 207,
                width: 143,
                height: 107,
                content: signInOptions.options.img_url,
              },

              {
                type: "text",
                x: 94,
                y: 150,
                width: 608,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 36,
                bold: 800,
                color: "#333",
                fontFamily: '"buer"',
                content: signInOptions.options.name,
              },
              {
                type: "text",
                x: 170,
                y: 316,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: signInOptions.options.distance,
              },

              {
                type: "text",
                x: 170,
                y: 341,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: signInOptions.options.traffic,
              },
              {
                type: "text",
                x: 170,
                y: 365,
                width: 480,
                autoHeight: true,
                lineHeight: 1.6,
                letterSpacing: "1px",
                fontSize: 14,
                color: "#333",
                fontFamily: '"buer-b"',
                content: signInOptions.options.time,
              },
            ],
          };
          json2image(
            data,
            (url) => {
              optionsArr.push(url);
            },
            (err) => console.error(err)
          );
        }
      }
      setTimeout(() => {
        const data = {
          width: 1701,
          height: 2551,
          quality: 1,
          ratio: 2,
          output: "png",
          elements: [
            {
              type: "img",
              x: 0,
              y: 0,
              width: 1701,
              height: 2551,
              radius: 0,
              content: "https://fp.yangcong345.com/middle/1.0.0/board-bg.jpg",
            },
            {
              type: "text",
              x: 0,
              y: 560,
              width: 1701,
              autoHeight: true,
              letterSpacing: "1px",
              textAlign: "center",
              fontSize: 36,
              color: "#333",
              fontFamily: '"buer-b"',
              content: this.baseInfo[0].options.hotelName,
            },
            {
              type: "img",
              x: 141,
              y: 650,
              width: 1420,
              height: 455,
              radius: 0,
              content: optionsArr[0],
            },
            {
              type: "img",
              x: 141,
              y: 1167,
              width: 1420,
              height: 455,
              radius: 0,
              content: optionsArr[1],
            },
            {
              type: "img",
              x: 141,
              y: 1684,
              width: 1420,
              height: 455,
              radius: 0,
              content: optionsArr[2],
            },
          ],
        };
        var img = document.getElementById("boardImg");
        json2image(
          data,
          (url) => {
            img.src = url;
            this.boardBgImg = [
              {
                name: "酒店展板",
                src: url,
                id: "board-big-img",
              },
            ];
            this.loading = false;
          },
          (err) => console.error(err)
        );
      }, 2000);
    },
    backToBoardList() {
      this.showDownload = false;
    },
    close() {
      this.showDownload = false;
      this.showBoardList = false;
    },
    changeChecked(item) {
      const _key = this.selectedBoards.some((i) => i === item.id);
      const hasHotel = this.selectedBoards.some(
        (i) => i.indexOf("hotel") != -1
      );
      if (this.selectedBoards.length === 3 && !_key) {
        this.$toast("已经选择三个展板，请取消后再次选择");
        return;
      }
      if (!item.checked && hasHotel && item.id.indexOf("hotel") != -1) {
        this.$toast("酒店特色服务最多只能选择一个模块哦");
        return;
      }
      this.boardList.map((i) => {
        if (i.id === item.id) {
          return (i.checked = !i.checked);
        }
      });
      if (_key) {
        this.selectedBoards = this.selectedBoards.filter((i) => i !== item.id);
      } else {
        this.selectedBoards = [...this.selectedBoards, item.id];
      }
    },

    getImgArrayBuffer(url) {
      return new Promise((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function () {
          if (this.status == 200) {
            resolve(this.response);
          } else {
            reject(this.status);
          }
        };
        xmlhttp.send();
      });
    },

    downImg() {
      let _this = this;
      let zip = new JSZip();
      let cache = {};
      let promises = [];
      const downLoadArr = this.boardList
        .concat(this.about)
        .concat(this.baseInfo)
        .concat(this.boardBgImg);
      for (let item of downLoadArr) {
        const promise = _this.getImgArrayBuffer(item.src).then((data) => {
          zip.file(item.name + ".png", data, { binary: true });
          cache[item.id] = data;
        });
        promises.push(promise);
      }

      Promise.all(promises)
        .then(() => {
          zip.generateAsync({ type: "blob" }).then((content) => {
            FileSaver.saveAs(content, this.baseInfo[0].options.hotelName);
          });
        })
        .catch(() => {
          console.error("文件压缩失败");
        });
    },
  },
};
</script>
<style>
.display-board {
  width: 80%;
  height: 80%;
  margin: 0px auto;
  display: flex;
  background: #f2f2f0;
  padding: 0 50px;
  align-items: center;
  position: relative;
  flex-direction: column;
  justify-content: center;
  z-index: 4;
}
.board-list-box {
  flex: 1 1 0%;
  height: 80%;
  overflow: scroll;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0 0;
}
.close-button {
  position: absolute;
  right: -30px;
  top: -5px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}
.topic-title {
  width: 100%;
  text-align: left;
  font-size: 16px;
  color: #333;
  margin: 30px;
  padding: 0 30px;
  font-weight: bolder;
}
.make-board {
  height: 50px;
  width: 200px;
  background: #f55f37;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.board-img-box:hover {
  border: 2px solid #f55f37;
}
.checked .board-img-box {
  border: 2px solid #f55f37;
}
.checked .board-img-box div {
  opacity: 1;
}
.board-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.board-box img {
  height: 75%;
}

.swiper-slide {
  width: 300px;
  margin: 0 20px;
  display: inline-block;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}
.back-board-list {
  position: absolute;
  left: 30px;
  top: 30px;
  cursor: pointer;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*change these sizes to fit into your project*/
  width: 100px;
  height: 100px;
}

.loading hr {
  border: 0;
  margin: 0;
  width: 40%;
  height: 40%;
  position: absolute;
  border-radius: 50%;
  animation: spin 2s ease infinite;
}

.loading :first-child {
  background: #19a68c;
  animation-delay: -1.5s;
}

.loading :nth-child(2) {
  background: #f63d3a;
  animation-delay: -1s;
}

.loading :nth-child(3) {
  background: #fda543;
  animation-delay: -0.5s;
}

.loading :last-child {
  background: #193b48;
}

@keyframes spin {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
</style>

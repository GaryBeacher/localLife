<template>
  <div>
    <div class="left-menu" v-if='isfixTab'>
      <a
        :href="'#' + item.id"
        class="action"
        v-for="item in hotelArr"
        :key="item.name"
      >
        {{ item.name }}
      </a>
      <a
        :href="'#' + item.id"
        class="action"
        v-for="item in aroundArr"
        :key="item.name"
      >
        {{ item.name }}
      </a>
      <a
        :href="'#' + item.id"
        class="action"
        v-for="item in signInArr"
        :key="item.name"
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
    <hr align="center" width="80%" color="#ccc" SIZE="1" />

    <h1>关于本店</h1>
    <About @saveImgToDownLoad="saveImgToDownLoad" />
    <hr align="center" width="80%" color="#ccc" SIZE="1" />

    <h1 class="module-title">
      酒店特色服务
      <div class="add-new" @click="addSection('hotel')">新增模块</div>
    </h1>
    <template v-for="(item, index) in hotelArr" :key="item">
      <h2>{{ item.name }}</h2>
      <div class="section" :id="item.id">
        <Hotel
          :id="item.id"
          :itemIndex="index"
          :name="item.name"
          @removeSection="removeSection"
          @saveImgToBoard="saveImgToBoard"
        />
      </div>
      <hr align="center" width="80%" color="#ccc" SIZE="1" />
    </template>
    <h1 class="module-title">
      周边吃喝玩乐
      <div class="add-new" @click="addSection('around')">新增模块</div>
    </h1>
    <template v-for="(item, index) in aroundArr" :key="item">
      <h2>{{ item.name }}</h2>
      <div class="section" :id="item.id">
        <Around
          :id="item.id"
          :itemIndex="index"
          :name="item.name"
          @removeSection="removeSection"
          @saveImgToBoard="saveImgToBoard"
        />
      </div>
      <hr align="center" width="80%" color="#ccc" SIZE="1" />
    </template>
    <h1 class="module-title">
      城市必打卡
      <div class="add-new" @click="addSection('signIn')">新增模块</div>
    </h1>
    <template v-for="(item, index) in signInArr" :key="item">
      <h2>{{ item.name }}</h2>
      <div class="section" :id="item.id">
        <SignIn
          :id="item.id"
          :itemIndex="index"
          :name="item.name"
          @removeSection="removeSection"
          @saveImgToBoard="saveImgToBoard"
        />
      </div>
      <hr align="center" width="80%" color="#ccc" SIZE="1" />
    </template>
    <div class="section">
      <button class="custom-btn btn-4 submit" @click="createBoardList">
        提交
      </button>
    </div>
    <div class="section board-list" v-if="showBoardList">
      <div class="mask" @click="close"></div>
      <div class="display-board" v-if="!showDownload">
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
        <div class="board-box">
          <div class="back-board-list" @click="backToBoardList">返回</div>
          <img src="" alt="" id="boardImg" />
          <div class="download" @click="downImg">打包下载</div>
        </div>
      </div>
    </div>
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
import * as utils from "./utils/toast";
let time = true;
export default {
  name: "app",
  components: { Banner, BaseInfo, About, Hotel, Around, SignIn, MyCheckBox },
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
        let i;
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
    saveImgToDownLoad({ id, options,name }) {
      var img = document.getElementById(id);
      const item = {
        id,
        options,
        src: img.getAttribute("src"),
        checked: false,
        name
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
        utils.default.showToast({
          title: "注意：关于本店模块未保存",
        });
        return;
      }
      if (this.baseInfo.length === 0) {
        utils.default.showToast({
          title: "注意：基本信息模块未保存",
        });
        return;
      }
      if (
        this.aroundArr.length + this.signInArr.length + this.hotelArr.length !==
        this.boardList.length
      ) {
        utils.default.showToast({
          title: "注意：有模块尚未保存完毕",
        });
        return;
      } else {
        this.showBoardList = true;
      }
    },
    makeBoard() {
      this.showDownload = true;
      if (this.selectedBoards.length < 3) {
        utils.default.showToast({
          title: "必须要选择三个哦～",
        });
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
                content: "../asset/hotelBoard.jpg",
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
                content: "../asset/aroundBoard.jpg",
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
                content: "../asset/signInBoard.jpg",
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
              content: "../asset/board-bg.jpg",
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
        utils.default.showToast({
          title: "已经选择三个展板，请取消后再次选择",
        });
        return;
      }
      if (hasHotel && item.id.indexOf("hotel") != -1) {
        utils.default.showToast({
          title: "酒店特色服务最多只能选择一个模块哦",
        });
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
        .catch((res) => {
          console.error("文件压缩失败");
        });
    },
  },
};
</script>
<style>
.display-board {
  width: 90%;
  height: 80%;
  margin: 0px auto;
  display: flex;
  background: #f2f2f0;
  overflow-x: hidden;
  overflow-y: scroll;
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

.make-board {
  height: 50px;
  width: 200px;
  background: rgb(255, 136, 0);
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
  border: 2px solid #f80;
}
.checked .board-img-box {
  border: 2px solid #f80;
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
  width: 375px;
}

.download {
  width: 200px;
}
.download {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  margin: 50px auto 0;
  text-align: center;
  border: 1px solid #f80;
  color: #f80;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  overflow: hidden;
  cursor: pointer;
}

.download:hover {
  background: #f80;
  color: #fff;
  box-shadow: 0 0 5px #f80, 0 0 25px #f80, 0 0 50px #f80, 0 0 200px #f80;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
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
</style>

<template>
  <div id="main-container">
    <section class="app-main">
      <div class="editor-container">
        <el-row class="panel-group" style="margin-left: -20px; margin-right: -20px;">
          <el-col v-for="(card,index) in cardList" :key="index" class="card" :span="24" :xs="12" :sm="12" :lg="6" style="padding-left: 20px; padding-right: 20px;">
            <div class="card-panel" @mouseover="handleMouseOver(index)" @mouseout="handleMouseOut(index)">
              <div class="card-panel-wrapper" :class="card.iconClass" :style="{ backgroundColor: card.backgroundColor }">
                <span>
                  <svg-icon class="svg-icon card-panel-icon" :icon-file-name="card.iconFileName" :style="{ fill: card.iconColor }" />
                </span>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">{{ card.title }}</div>
                <span class="card-panel-num">{{ card.num }}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="panel-drawing" style="margin-left: -20px; margin-right: -20px;">
          <el-col class="chart" :span="24" :xs="24" :sm="24" :lg="24">
            <div class="chart-drawing">
              <canvas ref="chartContainer" class="can" auto-resize />
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>
<script>
import SvgIcon from '../../../components/SvgIcon/index.vue'
import echarts from 'echarts'
export default {
  name: 'Demo',
  components: {
    SvgIcon
  },
  data() {
    return {
      activeName: '1',
      cardList: [
        {
          iconClass: 'icon-people',
          backgroundColor: '',
          originalBackgroundColor: '#40c9c6',
          iconFileName: 'peoples',
          iconColor: '',
          title: 'IP/今',
          num: '28'
        },
        {
          iconClass: 'icon-message',
          backgroundColor: '',
          originalBackgroundColor: '#36a3f7',
          iconFileName: 'monitor',
          iconColor: '',
          title: 'UV/今',
          num: '29'
        },
        {
          iconClass: 'icon-eye',
          backgroundColor: '',
          originalBackgroundColor: '#f4516c',
          iconFileName: 'eye',
          iconColor: '',
          title: 'PV/今',
          num: '60'
        },
        {
          iconClass: 'icon-dashboard',
          backgroundColor: '',
          originalBackgroundColor: '#34bfa3',
          iconFileName: 'dashboard',
          iconColor: '',
          title: 'IP/合',
          num: '115,734'
        }
      ]
    }
  },
  mounted() {
    this.createChart()
    this.handleMouseOut()
  },
  methods: {
    handleMouseOver(index) {
      this.cardList[index].iconColor = ''
      this.cardList[index].backgroundColor = this.getOriginalBackgroundColor(index)
    },
    handleMouseOut(index) {
      this.cardList[index].iconColor = this.getOriginalBackgroundColor(index)
      this.cardList[index].backgroundColor = ''
    },
    getOriginalBackgroundColor(index) {
      return {
        'icon-people': '#40c9c6',
        'icon-message': '#36a3f7',
        'icon-eye': '#f4516c',
        'icon-dashboard': '#34bfa3'
      }[this.cardList[index].iconClass]
    },
    createChart() {
      const myChart = echarts.init(this.$refs.chartContainer)
      myChart.resize({ width: 'auto', height: 'auto' })
      const data = {
        title: {
          text: 'Last 7 day\'s IP',
          x: 'left'
        },
        toolbox: {
          feature: {
            magicType: {
              show: true,
              title: {
                bar: '柱形图切换',
                stack: '堆积',
                tiled: '平铺',
                line: '折线图切换'
              },
              type: ['bar', 'line', 'stack', 'tiled']
            },
            dataZoom: {
              show: true,
              title: {
                dataZoom: '区域缩放',
                dataZoomReset: '区域缩放后退'
              }
            }
          },
          show: false
        },
        tooltip: {
          trigger: 'axis',
          show: true
        },
        legend: {
          data: ['PC', 'H5', 'MINI', 'APP'],
          x: 'center'
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '2023-07-12',
              '2023-07-13',
              '2023-07-14',
              '2023-07-15',
              '2023-07-16',
              '2023-07-17',
              '2023-07-18'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'PC',
            type: 'line',
            data: [125, 120, 109, 66, 51, 124, 27]
          },
          {
            name: 'H5',
            type: 'line',
            data: [38, 35, 33, 15, 24, 37, 5]
          },
          {
            name: 'MINI',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'APP',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }

      // 使用配置项绘制折线图
      myChart.setOption(data)
      myChart.resize()
      window.addEventListener('resize', function() {
        myChart.resize({ width: 'auto', height: 'auto' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main{
  width: 100%;
  position:relative;
  overflow: hidden;
}
.editor-container{
  padding: 32px;
  background-color: #fff;
  position: relative;
}
.panel-group{
  margin-top: 18px;
  .card{
    margin-bottom: 32px;
  }
}
.el-row{
  position: relative;
  box-sizing: border-box;
}
#container {
  width: 100%;
  height: 100%;
}
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.card-panel{
  height: 108px;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0,0,0,.05);
  border-color: rgba(0,0,0,.05);
  .card-panel-wrapper{
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all .38s ease-out;
    border-radius: 6px;
    .card-panel-icon{
      font-size: 48px;
    }
    .svg-icon{
      display: block;
      margin: 14px auto!important;
      float: none!important;
    }
  }
  .card-panel-description{
    float: right;
    font-weight: 700;
    margin: 26px;
    margin-left: 0;
    .card-panel-text{
      line-height: 18px;
      color: rgba(0,0,0,.45);
      font-size: 16px;
      margin-bottom: 12px;
    }
    .card-panel-num{
      font-size: 20px;
    }
  }

}
.icon-people{
    color: #40c9c6;
  }
  .icon-message{
    color: #36a3f7;
  }
  .icon-eye{
    color: #f4516c;
  }
  .icon-dashboard{
    color: #34bfa3;
  }
  .icon-people svg,
.icon-message svg,
.icon-eye svg,
.icon-dashboard svg {
  transition: fill 0.3s ease-in-out;
}

.icon-people:hover svg,
.icon-message:hover svg,
.icon-eye:hover svg,
.icon-dashboard:hover svg {
  fill: #ffffff;
  background-color: inherit;
}

.panel-drawing{
  width: 100%;
  background: rgb(255,255,255);
  padding: 32px 16px 0px;
  position: relative;
  box-sizing: border-box;
  .chart{
    height: 100%;
    width: 100%;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative;
    .chart-drawing{
      position: relative;
      width: 100%;
      height: 400px;
      padding: 0px;
      margin: 0px;
      border-width: 0px;
      .can{
        position:absolute;
        left: 0px;
        top: 0px;
        width: 1400px;
        height: 400px;
        padding: 0;
        margin: 0;
        border-width: 0px;
        object-fit: contain; /* 控制canvas的缩放方式 */
      border: 1px solid #ccc; /* 添加边框 */
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

</style>

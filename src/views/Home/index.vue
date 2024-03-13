<template>
  <div id="main-container">
    <section class="app-main">
      <div class="editor-container">
        <el-row class="panel-group" style="margin-left: -20px; margin-right: -20px;">
          <el-col v-for="(card, index) in cardList" :key="index" class="card" :span="24" :xs="12" :sm="12" :lg="6"
            style="padding-left: 20px; padding-right: 20px;">
            <div class="card-panel">
              <div class="card-panel-wrapper" class-name="card-panel-icon" :class="card.iconClass"
                :style="{ backgroundColor: card.backgroundColor }">
                <span>
                  <svg-icon class="svg-icon card-panel-icon" :icon-class="card.iconFileName"
                    :style="{ fill: card.iconColor }" />
                </span>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">{{ card.title }}</div>
                <span class="card-panel-num">{{ getCardNum(card) }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div ref="chart" class="chart"></div>

      </div>
    </section>
  </div>
</template>
<script>
import { apiGetFlow } from "../../api/home"
import SvgIcon from "../../components/SvgIcon/index.vue"
import echarts from 'echarts'
import CountTo from "vue-count-to"
export default {
  components: {
    SvgIcon,
    CountTo
  },
  name: "Demo",
  data () {
    return {
      findFlow: [],
      flowLine: {},
      activeName: "1",
      cardList: [
        {
          iconClass: 'icon-people',
          backgroundColor: '',
          originalBackgroundColor: '#40c9c6',
          iconFileName: 'peoples',
          iconColor: '',
          title: 'IP/今'
        },
        {
          iconClass: 'icon-message',
          backgroundColor: '',
          originalBackgroundColor: '#36a3f7',
          iconFileName: 'monitor',
          iconColor: '',
          title: 'UV/今'
        },
        {
          iconClass: 'icon-eye',
          backgroundColor: '',
          originalBackgroundColor: '#f4516c',
          iconFileName: 'eye',
          iconColor: '',
          title: 'PV/今'
        },
        {
          iconClass: 'icon-dashboard',
          backgroundColor: '',
          originalBackgroundColor: '#34bfa3',
          iconFileName: 'dashboard',
          iconColor: '',
          title: 'IP/合'
        }
      ]
    }
  },
  mounted () {
    this.getFlow()
    this.initChart()
    window.addEventListener('resize', this.handleWindowResize)

  },
  methods: {
    getFlow () {
      console.log("000")
      this.$axios({
        method: 'GET',
        url: '/getHome',
      }).then(res => {
        console.log(res.data.data)
        this.findFlow = res.data.data
      })
    },
    getCardNum (card) {
      if (card.title === 'IP/今') {
        return this.findFlow.ipFlowDay
      } else if (card.title === 'UV/今') {
        return this.findFlow.uvFlowDay
      } else if (card.title === 'PV/今') {
        return this.findFlow.pvFlowDay
      } else if (card.title === 'IP/合') {
        return this.findFlow.ipAllFlow
      }
      return ''
    },

    initChart () {
      const chart = this.$echarts.init(this.$refs.chart)
      const dates = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(date.toLocaleDateString())
      }
      // 在这里配置 ECharts 图表选项
      // IP/今（IP/今日）：表示今天的独立访客数量，即当天访问网站的不同 IP 地址的数量。独立访客是指一天内访问网站的唯一用户的数量，不考虑用户的多次访问。
      // UV/今（UV/今日）：表示今天的访问用户数量，即当天访问网站的不同用户的数量。与 IP 不同的是，UV 统计了实际的访问用户数量，一般是根据浏览器的 Cookie 或者登录信息来统计的。
      // PV/今（PV/今日）：表示今天的页面浏览量，即网站在当天内被访问的总页面浏览次数。每一次页面加载都会增加 PV 值，无论是同一个用户还是不同用户的访问。
      // IP/合（IP/总）：表示累计的独立访客数量，即网站自上线以来不重复的访问 IP 地址总数。
      const option = {
        title: {
          text: '网站访问量'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['IP/今', 'UV/今', 'PV/今', 'IP/合']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}' // 设置 Y 轴刻度值的显示格式
          }
        },
        series: [
          {
            name: 'IP/今',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'UV/今',
            type: 'line',
            stack: 'Total',
            data: [80, 84, 66, 90, 60, 154, 140]
          },
          {
            name: 'PV/今',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'IP/合',
            type: 'line',
            stack: 'Total',
            data: [120, 253, 320, 420, 440, 480, 510]
          }
        ]
      }

      chart.setOption(option)
    },
    handleWindowResize () {
      console.log(1111)
      this.$echarts.init(this.$refs.chart).resize()
    }

  },
  beforeDestroy () {
    // 在组件销毁之前移除事件监听器，以防止内存泄漏
    window.removeEventListener('resize', this.handleWindowResize)
  },
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.editor-container {
  padding: 32px;
  background-color: #fff;
  position: relative;
}

.panel-group {
  margin-top: 18px;

  .card {
    margin-bottom: 32px;
  }
}

.el-row {
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

.card-panel {
  height: 108px;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);
  display: flex;
  justify-content: space-around;

  &:hover {
    .icon-people {
      background: #40c9c6;
    }

    .icon-message {
      background: #36a3f7;
    }

    .icon-eye {
      background: #f4516c;
    }

    .icon-dashboard {
      background: #34bfa3;
    }
  }

  .card-panel-wrapper {
    display: flex;
    align-items: center;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all .38s ease-out;
    border-radius: 6px;

    .card-panel-icon {
      font-size: 48px;
    }

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }

  .card-panel-description {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-weight: 700;
    margin: 26px;
    margin-left: 0;

    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, .45);
      font-size: 16px;
      margin-bottom: 12px;

    }

    .card-panel-num {
      font-size: 20px;
    }
  }

}

.icon-people {
  color: #40c9c6;
}

.icon-message {
  color: #36a3f7;
}

.icon-eye {
  color: #f4516c;
}

.icon-dashboard {
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


.chart {
  width: 100%;
  height: calc(100vh - 320px);
}
</style>

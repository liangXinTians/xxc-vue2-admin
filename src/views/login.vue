<template>
  <div class="app">
    <div class="login">
      <div class="login-logo">
        <span>校园旧物回收后台管理系统</span>
      </div>
      <h2 class="main-title">
        <span>校园旧物回收</span>
      </h2>
      <h3 class="sub-title">用心打造完美系统，推动校园智能化</h3>
      <div class="login-box">
        <div v-if="loginMethod !== 'password'" class="weixin">
          <div class="title">账号注册</div>
          <div class="login-switch" @click="switchLoginMethod">
            <div class="static-img">
              返回登录
            </div>
          </div>
          <el-form :model="loginForms" :rules="loginRuless" class="login-form">
            <el-form-item prop="username">
              <el-input v-model="loginForms.username" type="text" name="username" autocomplete="new-password"
                placeholder="账号">
                <svg-icon slot="prefix" icon-class="user" icon-file-name="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item class="password_item" prop="password">
              <el-input v-model="loginForms.password" type="password" autocomplete="new-password" placeholder="密码"
                show-password @keyup.enter.native="handleLogin">
                <svg-icon slot="prefix" icon-class="password" icon-file-name="password"
                  class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item class="password_item" prop="password">
              <el-input v-model="loginForms.passwords" type="password" autocomplete="new-password" placeholder="确认密码"
                show-password @keyup.enter.native="handleLogin">
                <svg-icon slot="prefix" icon-class="password" icon-file-name="password"
                  class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button :loading="loading" size="medium" type="primary" style="width: 100%"
                @click.native.prevent="handleLogins">
                <span v-if="!loading">注 册</span>
                <span v-else>注 册 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="loginMethod === 'password'" class="pc">
          <div class="title">密码登录</div>
          <div class="login-switch" @click="switchLoginMethod">
            <div class="static-img">
              注册账号
            </div>
          </div>
          <el-form v-if="loginMethod === 'password'" ref="loginForm" :model="loginForm" :rules="loginRules"
            class="login-form">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" type="text" name="username" autocomplete="new-password"
                placeholder="账号">
                <svg-icon slot="prefix" icon-class="user" icon-file-name="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item class="password_item" prop="password">
              <el-input v-model="loginForm.password" type="password" autocomplete="new-password" placeholder="密码"
                show-password @keyup.enter.native="handleLogin">
                <svg-icon slot="prefix" icon-class="password" icon-file-name="password"
                  class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="captcha">
              <el-input v-model="loginForm.captcha" style="width: 63%;" type="text" name="captcha" autocomplete="off"
                placeholder="验证码">
                <svg-icon slot="prefix" icon-class="captcha" icon-file-name="validCode"
                  class="el-input__icon input-icon" />
              </el-input>
              <div class="login-code">
                <img :src="'data:image/gif;base64,' + captchaImage" class="login-code-img">
              </div>
            </el-form-item> -->
            <el-form-item style="width: 100%;text-align: left;">
              <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button :loading="loading" size="medium" type="primary" style="width: 100%"
                @click.native.prevent="handleLogin">
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-footer">
        <span>
          <a href="https://baidu.com" target="_blank">Copyright @ 2023-2024 Open Source Byte All Right
            Reserved.</a>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils'
import { getCodeImg } from '../api/login'
const packageTitle = require('../../package.json').description
export default {
  name: 'Login',
  data () {
    return {
      loginMethod: 'password',
      captchaImage: [],
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      loginForms: {
        username: '',
        password: '',
        passwords: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },

      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    this.getCookie()
    // this.getCaptcha()

    // var storage = window.localStorage
    // storage.clear()

    // 从 localStorage 中获取数据
    // const storedData = localStorage.getItem('responseData')
    // if (storedData) {
    //   // 解析存储的 JSON 字符串为对象
    //   const parsedData = JSON.parse(storedData)

    //   // 打印解析后的数据
    //   console.log(parsedData)
    // } else {
    //   console.log('No data found in localStorage')
    // }


    // this.$axios({
    //   method: 'post',
    //   url: '/getDataList',
    //   data: this.qs.stringify({    //这里是发送给后台的数据
    //     id: 2,
    //   })
    // }).then((res) => {
    //   console.log(res.data.data)
    //   const updatedData = res.data.data.filter(item => item.id !== 2)

    //   if (!localStorage.getItem('responseData')) {
    //     localStorage.setItem('responseData', JSON.stringify(updatedData))
    //   }

    //   console.log(JSON.parse(localStorage.getItem('responseData')))
    // })
  },
  methods: {
    switchLoginMethod () {
      this.loginMethod = this.loginMethod === 'password' ? 'QR code' : 'password'
    },
    getCookie () {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      if (rememberMe) {
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password:
            password === undefined
              ? this.loginForm.password
              : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        }
      }
    },

    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 })
            Cookies.set('password', encrypt(this.loginForm.password), {
              expires: 7
            })
            Cookies.set('rememberMe', this.loginForm.rememberMe, {
              expires: 7
            })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store
            .dispatch('Login', this.loginForm)
            .then(res => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        }
      })

      localStorage.setItem('username', this.loginForm.username)

      // this.$axios({
      //   method: 'post',
      //   url: '/getDataList',
      //   data: this.qs.stringify({    //这里是发送给后台的数据
      //     id: 8,
      //   })
      // }).then((res) => {
      //   // console.log(res.data.data)
      //   const storedDataString = localStorage.getItem('responseData') // 从 localStorage 中获取数据
      //   let storedData = [] // 初始化一个空数组
      //   if (storedDataString) {
      //     // 如果获取的数据不为空，则解析为数组
      //     storedData = JSON.parse(storedDataString)
      //   }
      //   // 添加新的数据
      //   storedData.push({
      //     id: 8,
      //     name: "zhang8",
      //     sex: "男"
      //   })
      //   // 将更新后的数据存储到 localStorage
      //   localStorage.setItem('responseData', JSON.stringify(storedData))

      //   console.log(JSON.stringify(localStorage.getItem('responseData'))) // 打印更新后的数据
      // })

    },


    handleLogins () {
      this.loginMethod = this.loginMethod === 'password' ? 'QR code' : 'password'
      console.log(this.loginMethod)
    }

  }
}
</script>
<style scoped lang="scss">
.app {
  height: 100%;
  margin: 0px;
  padding: 0px;

  .login {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    background: url("../assets/image/guitar1.jpg");
    background-size: cover;
    background-color: #f4f4f4;
    padding: 50px 0;

    .login-logo {
      width: 300px;
      margin-right: 10px;
      padding-right: 10px;
      background-image: url(../assets/image/logo.png);
      background-repeat: no-repeat;
      background-size: auto 24px;
      display: inline-block;
      zoom: 1;
      position: absolute;
      left: 150px;
      top: 50px;

      span {
        line-height: 24px;
        font-size: 20px;
        padding-left: 30px;
        color: #fff;
        font-weight: 600;
      }
    }

    .main-title {
      margin: 100px 0 0 0;
      text-align: center;
      background-image: url(../assets/image/logo.png);
      background-repeat: no-repeat;
      background-size: auto 34px;
      display: inline-block;
      zoom: 1;
      height: 34px;
      color: #fff;
      vertical-align: middle;

      span {
        line-height: 34px;
        font-size: 28px;
        padding-left: 40px;
        font-weight: 500;
        color: #fff;
        vertical-align: middle;
      }
    }

    .sub-title {
      margin: 20px 0 60px 0;
      text-align: center;
      color: #fff;
      font-size: 18px;
    }

    .login-box {
      border-radius: 6px;
      width: 400px;
      background: #fff;
      position: relative;
      margin: 0 auto;
      padding: 30px 0 0 0;
      box-shadow: 0 1px 12px 0 rgb(0, 0, 0, .2);

      // .weixin {
      //   .title {
      //     padding-left: 30px;
      //   }

      //   .login-switch {
      //     position: absolute;
      //     right: 40px;
      //     top: 30px;
      //     cursor: pointer;

      //     .static-img {
      //       display: block;
      //     }
      //   }

      //   .open-weixin {
      //     margin: 0 auto;
      //     padding: 30px;
      //     text-align: center;

      //     img {
      //       width: 200px;
      //       border: 1px solid transparent;
      //     }

      //     .info {
      //       margin: 0 auto;
      //       font-size: 13px;
      //       color: #999;
      //       text-align: center;
      //     }
      //   }
      // }
      .weixin {
        box-sizing: inherit;

        .title {
          padding-left: 30px;
        }

        .login-switch {
          position: absolute;
          right: 40px;
          top: 30px;
          cursor: pointer;

          .static-img {
            display: block;
          }
        }

        .login-form {
          border-radius: 6px;
          background: #fff;
          width: 400px;
          padding: 40px 40px 20px 40px;
        }
      }

      .pc {
        box-sizing: inherit;

        .title {
          padding-left: 30px;
        }

        .login-switch {
          position: absolute;
          right: 42px;
          top: 216px;
          cursor: pointer;
          z-index: 10;

          .static-img {
            display: block;
          }
        }

        .login-form {
          border-radius: 6px;
          background: #fff;
          width: 400px;
          padding: 40px 40px 20px 40px;
        }
      }
    }

    .login-footer {
      height: 40px;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      color: #fff;
      font-family: Arial;
      font-size: 12px;
      letter-spacing: 1px;

      a {
        cursor: pointer;
        color: inherit;
        text-decoration: none;
      }
    }
  }
}

.el-input {
  height: 38px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;

  .el-input_inner {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
    padding: 0 15px;
    width: 100%;

    .el-input_prefix {
      position: absolute;
      left: 5px;
      top: 0;
      color: #c0c4cc;

      .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
        fill: currentColor;
      }
    }
  }
}

.login-code {
  width: 30%;
  height: 36px;
  float: right;

  .img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.login-code-img {
  height: 36px;
}
</style>

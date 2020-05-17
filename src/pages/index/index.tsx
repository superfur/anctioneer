import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtTag } from 'taro-ui';

import MainView from './components/mainView';

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  serverName: string;
}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ server }) => ({
  serverName: server.serverName,
}), (dispatch) => ({

}))
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  state ={
    faction: '1',
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  private async toServerList() {
    Taro.navigateTo({
      url: '/pages/serverlist/index'
    })
  }

  private changeTag(info: { name: string, active: boolean }) {
    const { name } = info;
    this.setState({
      faction: name,
    })
  }

  private async toSearch() {
    // const data = await testApi();
    // console.log(data);
  }

  render () {
    const { faction } = this.state;
    const { serverName } = this.props;
    return (
      <View className='index'>
        <View className='at-row'>
          <View className='at-col at-col-3'>
            <AtButton type='secondary' size='small' onClick={this.toServerList}>{serverName ? serverName : '请选择服务器'}</AtButton>
          </View>
          <View className='at-col at-col__offset-1'>
            <AtTag
              name='1'
              type='primary'
              active={faction === '1'}
              onClick={this.changeTag.bind(this)}
            >部落</AtTag>
            <AtTag
              name='2'
              type='primary'
              active={faction === '2'}
              onClick={this.changeTag.bind(this)}
            >联盟</AtTag>
          </View>
          <View className='at-col at-col-3'>
            <AtButton type='primary' size='small' onClick={this.toSearch}>查询</AtButton>
          </View>
        </View>

        <MainView />
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>

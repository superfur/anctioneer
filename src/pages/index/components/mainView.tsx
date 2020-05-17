import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import { F2Canvas } from 'taro-f2'
import { fixF2 } from 'taro-f2/dist/weapp/common/f2-tool'
import F2 from '@antv/f2'

import { prodHistory, prodList } from '../../../mock';

import './mainView.scss'

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
//   server: {
//     serverName: string;
//   }
}

type PageDispatchProps = {
//   checkServer: (payload: string) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface MainView {
  props: IProps;
}

// @connect(() => ({
//   server
// }), (dispatch) => ({
// //   checkServer(payload) {
// //     dispatch(check(payload))
// //   },
// }))
class MainView extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '主窗口',
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  drawRadar(canvas, width, height){
    fixF2(F2);

    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    const data = prodHistory.list.map(item => ({
      ...item,
      marketprice: item.marketprice / 10000,
      middleprice: item.middleprice / 10000,
    }))
    chart.source(data);
    chart.scale('update', {
      type: 'timeCat',
      tickCount: 3
    });
    chart.interval().position('update*totalcount');
    chart.line().position('update*marketprice').color('blue');
    chart.line().position('update*middleprice').color('red');
    chart.render();
  }

  render () {
    return (
      <View className='main'>
        <View style='width:100%; height:300px'>
            <F2Canvas onCanvasInit={this.drawRadar.bind(this)}></F2Canvas>
        </View>
        <View>
          <View className='at-row'>
            <View className='at-col at-col-3'><Text>服务器</Text></View>
            <View className='at-col at-col-3'><Text>一口价</Text></View>
            <View className='at-col at-col-3'><Text>竞拍价</Text></View>
            <View className='at-col at-col-3'><Text>数量</Text></View>
          </View>
          {prodList.map(item => (
            <View className='at-row' key={item.id}>
              <View className='at-col at-col-3'><Text>{item.realmname}</Text></View>
              <View className='at-col at-col-3'><Text>{(item.buyout/10000).toFixed(2)}G</Text></View>
              <View className='at-col at-col-3'><Text>{(item.bid/10000).toFixed(2)}G</Text></View>
              <View className='at-col at-col-3'><Text>{item.count}</Text></View>
            </View>
          ))}
        </View>
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

export default MainView as ComponentClass<PageOwnProps, PageState>

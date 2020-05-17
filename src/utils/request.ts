import Taro from '@tarojs/taro';

// const BASE_URL = 'http://118.25.50.10:6789';
const BASE_URL = 'http:/101.132.190.241';

export const request = <U>(params: { url: string, data: U }) => {
    return Taro.request({
        url: BASE_URL + params.url,
        data: params.data,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
    }).then(res => res.data);
}
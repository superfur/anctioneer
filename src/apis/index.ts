import { request } from './../utils/request';

export const testApi = () => {
    return request({
        url: '/api/auction/classic/query',
        data: {
            itemName: '奥术师护腕',
            realmName: '卓越',
            faction: 1,
            queryRealmTotal: true,
            alliance: false,
        }
    });
}
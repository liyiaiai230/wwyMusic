import {baseUrl} from "./config";

export function topList() {

    let listIds = ['19723756', '3779629', '2884035', '3778678'];


    return new Promise(function (resolve, reject) {
        uni.request({
            url: `${baseUrl}/toplist/detail`,
            method: 'GET',
            data: {},
            success: res => {
                let result = res.data.list;
                result.length = 4
                for (let i = 0; i < listIds.length; i++) {
                    result[i].listId = listIds[i];
                }
                resolve(result)
            },
            fail: () => {
            },
            complete: () => {
            }
        });
    });

}

export function list(listIds) {
    return uni.request({
        url: `${baseUrl}/playlist/detail?id=${listIds}`,
        method: 'GET',
    });
}

export function songDetail(songId) {
    return uni.request({
        url: `${baseUrl}/song/detail?ids=${songId}`,
        method: 'GET',
    });
}

export function songSimi(songId) {
    return uni.request({
        url: `${baseUrl}/simi/song/?id=${songId}`,
        method: 'GET',
    });
}
export function songComment(songId) {
    return uni.request({
        url: `${baseUrl}/comment/music?id=${songId}`,
        method: 'GET',
    });
}
export function songlyric(songId) {
    return uni.request({
        url: `${baseUrl}/lyric?id=${songId}`,
        method: 'GET',
    });
}
export function songUrl(songId) {
    return uni.request({
        url: `${baseUrl}/song/url?id=${songId}`,
        method: 'GET',
    });
}
//http://localhost:3000/song/detail?ids=483937795
//http://localhost:3000/simi/song/?id=483937795
//http://localhost:3000/comment/music?id=483937795
//http://localhost:3000/lyric?id=483937795
//http://localhost:3000/song/url?id=483937795
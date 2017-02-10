//获取随机高度
const getRandomHeight = () => {
    return parseInt((Math.random() * 500) + 100);
}
//生成随机图片地址
const getImg = () => {
    // const width = 200,
    //     height = this.getRandomHeight();
    // return 'http://lorempixel.com/' + width + '/' + height + '/';
    const width = 200,
        height = getRandomHeight(),
        url = 'http://lorempixel.com/' + width + '/' + height + '/';
    return {
        width: width,
        height: height,
        url: url
    }
}
const getImgList = (size = 10) => {
    let imgList = [];
    for (let i = 0; i < size; i++) {
        imgList.push(getImg());
    }
    console.log(imgList);
    return imgList;
}

module.exports = getImgList;
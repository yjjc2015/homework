import $ from '../../jq';


const getInitial = (imgList) => {
    let isLoading = false,
        screenWidth = $(window).width(); //屏幕宽度
    const initial = () => {
        if (isLoading) return;
        isLoading = true;
        const $root = $('.content'),
            LEN = imgList.length, //图片总数
            imgWidth = imgList[0].width, //图片宽度
            COL_NUMS = parseInt(screenWidth / (40 + imgWidth)); //每行图片的数量
        console.log(LEN, imgWidth, screenWidth, COL_NUMS);
        let colArray = [], //存放每列的高度和列的索引
            imgHeight; //图片高度
        $root.html('');
        for (let i = 0; i < LEN; i++) {
            let $img = $('<img data-index="' + i + '" src="' + imgList[i].url + '" class="item" alt=""/>');
            imgHeight = imgList[i].height;
            $img.width(imgWidth).height(imgHeight);
            if (i < COL_NUMS) {
                colArray.push(imgHeight + 40);
                $img.css({
                    left: (imgWidth + 40) * i,
                    top: 0,
                    display: 'block',
                    margin: '20px'
                });
            } else {
                let minHeight = colArray[0],
                    minCol = 0;
                //找到最小高度的列
                for (let j = 1; j < COL_NUMS; j++) {
                    if (colArray[j] < minHeight) {
                        minCol = j;
                        minHeight = colArray[j];
                    }
                }
                $img.css({
                    left: (imgWidth + 40) * minCol,
                    top: colArray[minCol],
                    display: 'block',
                    margin: '20px'
                });
                colArray[minCol] += imgHeight + 40;
            }
            $root.append($img);
        }
        isLoading = false;
    }
    $(window).on('resize', function () {
        if (screenWidth != $(window).width()) {
            screenWidth = $(window).width();
            initial();
        }
    });
    initial();
};

module.exports = getInitial;
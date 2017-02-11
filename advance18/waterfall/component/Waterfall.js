import React, {Component} from 'react';
import './Waterfall.scss'; //引入轮播图样式
import $ from '../../../jq';
import ImgNode from './ImgNode';

let isLoading = false;
class Waterfall extends Component {
    constructor(props) {
        super(props);
        this.refreshView(true);
    }
    refreshView(isInite = false) {
        let itemWidth = this.props.imgWidth+this.props.margin*2;
        let screenWith = $(window).width();
        let colCount = parseInt(screenWith / itemWidth);
        let colArray = [];
        for (let i = 0; i < colCount; i++) {
            colArray.push(0);
        }
        if (isInite) {
            this.state = ({
                screenWith: screenWith,
                imgList: this.props.imgList,
                itemWidth: itemWidth,
                colCount: parseInt(screenWith / itemWidth),
                colArray: colArray,
                margin: this.props.margin
            });
        } else {
            this.setState({
                screenWith: screenWith,
                colCount: parseInt(screenWith / itemWidth),
                colArray: colArray
            });
        }
    }
    isShow($node) {
        let $window = $(window),
            scrollTop=$window.scrollTop(),
            windowHeight=$window.height(),
            offsetTop=$node.offset().top,
            nodeHeight=$node.height();
        if(windowHeight+scrollTop>offsetTop&&offsetTop+nodeHeight>scrollTop){
            return true;
        }    else {
            return false;
        }
    }
    //遍历并加载所有图片
    loadImgs(){
        let _this= this;
        let $unloadImgs = $('img').not('.load');
        $unloadImgs.each(function(index){
            let $node = $(this);
            if(_this.isShow($node)){
                $node.addClass('load').attr('src',$node.attr('data-src'));
            }
        })
        if($unloadImgs.length===0){
            if(isLoading === true) return;
            let colArray = this.state.colArray,colCount=this.state.colCount,screenWith=this.state.screenWith;
            isLoading=true;
            let maxHeight = colArray[0],$btn=$('.btn');
            for (let j = 1; j < colCount; j++) {
                if (colArray[j] > maxHeight) {
                    maxHeight = colArray[j];
                }
            }
            $btn.css({top:maxHeight,visibility:'visible',width:screenWith});
            setTimeout(()=>{
                this.setState({
                    imgList:this.state.imgList.concat(this.props.getMoreImgs())
                });
                $('.btn').css('visibility','hidden');
                isLoading=false;
            },2000);
        }
    }
    componentDidMount() {
        const $window = $(window);
        let _this = this;
        $window.on('resize', function () {
            let screenWith = $window.width();
            if (screenWith !== _this.state.screenWith) {
                _this.refreshView();
            }
        })
        $window.on('scroll',function(){
            _this.loadImgs();
        });
        _this.loadImgs();
    }
    render() {
        let _this = this;
        return (
            <div className="content">
                {this
                    .state
                    .imgList
                    .map(function (e, i) {
                        return (<ImgNode
                            img={e}
                            itemWidth={_this.state.itemWidth}
                            colCount={_this.state.colCount}
                            margin={_this.state.margin}
                            colArray={_this.state.colArray}
                            screenWith={_this.state.screenWith}
                            key={i}
                            data-index={i}/>)
                    })
}
                <div className="btn" href="javascript:;">
                    <img src="./component/loading.gif" className="loading"/>
                </div>
            </div>
        )
    }
}
Waterfall.defaultProps = {
    imgWidth: 200,
    margin: 20
}

module.exports=Waterfall;

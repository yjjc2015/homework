import React, {Component} from 'react';
import {render} from 'react-dom';
import './Waterfall.scss'; //引入轮播图样式
import getInitial from './initial.js';
import getImgList from './mock.js';
import $ from '../../jq';

// 瀑布流 class Waterfall extends Component {     componentDidMount() {
// getInitial(getImgList());     }     render(){         return(
// <div className="content">             </div>         )     } }

class ImgNode extends Component {
    constructor(props){
        super(props);
        let itemWidth=this.props.itemWidth,
            colCount=this.props.colCount,
            colArray=this.props.colArray;
        let minHeight=colArray[0],minCol=0;
        for(let j=1;j<colCount;j++){
            if(colArray[j]<minHeight){
                minHeight=colArray[j];
                minCol=j;
            }
        }
        this.state={
            styles:{
                top:minHeight,
                left:itemWidth*minCol,
                width:this.props.img.width,
                height:this.props.img.height,
                margin:this.props.margin
            }
        }
        colArray[minCol]+=this.props.img.height+this.props.margin*2;
    }
    render() {
        return (<img data-src={this.props.img.url} style={this.state.styles}  />)
    }
}

class Waterfall extends Component {
    constructor(props) {
        super(props);
        let itemWidth = this.props.imgWidth+this.props.margin;
        let screenWith = $(window).width();
        let colCount = parseInt(screenWith /itemWidth);
        let colArray=[];
        for(let i=0;i<colCount;i++){
            colArray.push(0);
        }
        this.state = ({
            imgList: getImgList(),
            itemWidth:itemWidth,
            colCount: parseInt(screenWith /itemWidth),
            colArray: colArray,
            margin:this.props.margin
        });
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        let _this = this;
        return (
            <div className="content">
                {this
                    .state
                    .imgList
                    .map(function (e, i) {
                        return (<ImgNode img={e}
                         itemWidth={_this.state.itemWidth}
                         colCount={_this.state.colCount}
                         margin={_this.state.margin}
                         colArray={_this.state.colArray} key={i}/>)
                    })
}
                <a class="btn" href="javascript:;">加载更多</a>
            </div>
        )
    }
}
Waterfall.defaultProps = {
    imgWidth: 200,
    margin: 20
}

render(<Waterfall />,$('#root')[0]);
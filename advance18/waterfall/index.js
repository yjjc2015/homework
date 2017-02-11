import {render} from 'react-dom';
import React, {Component} from 'react';
import Waterfall from './component/Waterfall';
import getImgList from './mock';

const getMoreImgs = ()=>{
    return getImgList();
}
render(
    <Waterfall imgList={getImgList()} getMoreImgs={getMoreImgs}/>,
     document.getElementById('root'));



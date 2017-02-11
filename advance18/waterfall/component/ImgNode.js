import React, {Component} from 'react';

class ImgNode extends Component {
    constructor(props) {
        super(props);
        this.refreshView(true);
    }
    refreshView(isInite = false) {
        if (!isInite) {
            if (this.state.screenWith === this.props.screenWith) {
                return;
            }
        }
        let itemWidth = this.props.itemWidth,
            colCount = this.props.colCount,
            colArray = this.props.colArray;
        let minHeight = colArray[0],
            minCol = 0;
        for (let j = 1; j < colCount; j++) {
            if (colArray[j] < minHeight) {
                minHeight = colArray[j];
                minCol = j;
            }
        }
        if (isInite) {
            this.state = {
                styles: {
                    top: minHeight,
                    left: itemWidth*minCol,
                    width: this.props.img.width,
                    height: this.props.img.height,
                    margin: this.props.margin
                },
                screenWith: this.props.screenWith
            };
        } else {
            this.setState({
                styles: {
                    top: minHeight,
                    left: itemWidth*minCol,
                    width: this.props.img.width,
                    height: this.props.img.height,
                    margin: this.props.margin
                },
                screenWith: this.props.screenWith
            });
        }
        colArray[minCol] += this.props.img.height + this.props.margin * 2;
    }
    componentWillReceiveProps() {
        this.refreshView();
    }
    render() {
        // console.log(this.props['data-index'],this.props.colArray);
        if (this.props['data-index'] === 0) {
            console.log(this.state.styles.top);
        }
        return (<img data-src={this.props.img.url} style={this.state.styles}/>)
    }
}

module.exports = ImgNode;
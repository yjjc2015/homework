import {render} from 'react-dom';
import React, {Component} from 'react';
import $ from '../../jq';

class Father extends Component {
    constructor() {
        super();
        this.state={
            arr:[1,2,3]
        }
    }
    onChild(i) {
        console.log('child message: ' + i);
    }
    componentDidMount(){
        console.log(this.state.arr);
    }
    render() {
        console.log(this.props.name, this.props.age);
        return (
            <div>
                <h1>我是爸爸</h1>
                <Child onChild={this.onChild} arr={this.state.arr}/>
            </div>
        )
    }
}
Father.defaultProps = {
    name: 'cl',
    age: 15
}

class Child extends Component {
    componentDidMount() {
        setInterval(() => {
            let num = parseInt(Math.random() * 10);
            console.log(num);
            this
                .props
                .onChild(num);
        }, 1000);
    }
    render() {
        this.props.arr[2]=11;
        return <h2>我是孩子</h2>;
    }
}

render(<Father/>,$('#root')[0]);
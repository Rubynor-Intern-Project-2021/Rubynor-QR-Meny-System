import React, { Component } from 'react'
import axios from 'axios'


class TotalPrice extends Component {
    state = {}
    

    componentDidMount() {
        function refresh() {
            axios.get('/api/v1/total_price') 
                .then(res => {
                    const total_price = res.data
                    let new_state = {};
                    new_state.total_price = total_price;
                    this.setState(new_state);
                });
        }
        refresh = refresh.bind(this);

        refresh();

        this.interval = setInterval(refresh, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <p>{this.state.total_price}</p>
    }
}

export default TotalPrice;

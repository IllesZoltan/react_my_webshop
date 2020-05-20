import React from 'react';
import './Offerings.css'



export default class Offerings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            indValue: 0
        }
    }
    
    componentDidMount() {
        //this.interval = setTimeout(() => this.autoSlide(),2000)
        this.interval = setInterval(this.autoSlide.bind(this),5000)
    }

    componentWillUnmount() {
        clearTimeout(this.interval)
    }

    autoSlide() {
        let indChange = this.state.indValue;
        indChange += 1
        if (indChange === this.props.offer_images.length) {
            indChange = 0;
        }
        this.showImage(indChange)
    }

    showImage(ind) {
        this.setState({ indValue: ind })
    }

    render() {
        return (
            <div className="offeringsContent">
                <div className="main-container">
                    <div className="image-display">
                        <div className="marketing-text hover-text"><h4>{this.props.offer_images[this.state.indValue].text}</h4></div>
                        <div className="prod-img"><img src={this.props.offer_images[this.state.indValue].image} alt="imgs" /></div>
                        <div className="prod-url hover-text"><a href={this.props.offer_images[this.state.indValue].url}>{this.props.offer_images[this.state.indValue].url}</a></div>
                    </div>
                    <div className="select-buttons">
                        {this.props.offer_images.map((elem, index) => {
                            return (
                                <div key={index} id={index} className="dot" onClick={() => this.showImage(index)}></div>
                            )
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}
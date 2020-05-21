import React from 'react'
import './Products.css'

class FullSpecs extends React.Component {

    render() {
        return (
            <div>
                <div>Full Specs</div>
                <div className="specs-container">
                    {Object.entries(this.props.product.specs).map(([key, value]) => {
                        return (
                            <div>{key}:  -{value}</div>
                        )
                    })

                    }
                </div>
            </div>
        )
    }
}

export default FullSpecs
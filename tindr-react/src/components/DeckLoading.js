import React, { Component } from 'react'

export default class DeckLoading extends Component {
    render() {
        return (
            <div className="container" style={{height: '100vh'}}>
                <div className="flex-container">
                <div className="unit">
                    <div className="heart">
                    <div className="heart-piece-0"></div>
                    <div className="heart-piece-1"></div>
                    <div className="heart-piece-2"></div>
                    <div className="heart-piece-3"></div>
                    <div className="heart-piece-4"></div>
                    <div className="heart-piece-5"></div>
                    <div className="heart-piece-6"></div>
                    <div className="heart-piece-7"></div>
                    <div className="heart-piece-8"></div>
                    </div>
                    <p>Please wait...</p>
                </div>
                </div>
          </div>
        );
    }
}
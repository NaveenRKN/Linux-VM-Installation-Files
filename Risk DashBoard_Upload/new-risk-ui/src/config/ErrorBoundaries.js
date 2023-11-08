import { Component } from 'react';
 
export default class ErrorBoundaries extends Component  {
    state = {
        isErrorOccured: false
    }
    static getDerivedStateFromError(errorInfo) {
        return { isErrorOccured: true }
    }
    componentDisCatch(error, errorInfo) {
    }
    render() {
        return (
            this.state.isErrorOccured ? "Oops! Something went wrong.  Try again " : this.props.children
        )
    }
}

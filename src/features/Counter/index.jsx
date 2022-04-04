import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrease, increase } from './conuterSlice';

function CounterFeatures(props) {
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch()

    const handleIncreaseClick = () => {
        const action = increase('payload')
        console.log('action: ', action);
        dispatch(action)
    }

    const handleDecreaseClick = () => {
        const action = decrease()
        dispatch(action)
    }

    return (
        <div>
            This is CounterFeatures
            Couter: {counter}
            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
                <button onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeatures;
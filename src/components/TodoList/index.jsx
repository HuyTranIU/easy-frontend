import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import productApi from '../../api/productApi';

TodoList.propTypes = {
    todos: PropTypes.array,
    onClick: PropTypes.func
};

TodoList.defaultProps = {
    todos: [],
    onTodoClick: null,
}

function TodoList(props) {
    const { todos, onTodoClick } = props;

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await productApi.getAll()
            console.log(productList)
        }
        fetchProducts();
    }, [])

    function handleClick(todo) {
        if (onTodoClick) {
            onTodoClick(todo)
        }
    }

    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        onClick={() => handleClick(todo)}
                    >
                        {todo.title}</li
                    >
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
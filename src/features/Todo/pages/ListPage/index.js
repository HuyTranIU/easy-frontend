import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TodoList from '../../components/TodoList';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';

const initTodoList = [
    {
        id: 1,
        title: 'JavaScript',
        status: 'new'
    },
    {
        id: 2,
        title: 'Reactjs',
        status: 'completed'
    },
    {
        id: 3,
        title: 'Java',
        status: 'new'
    }
]

function ListPage(props) {
    const location = useLocation()
    const history = useHistory()
    const match = useRouteMatch()
    const [todoList, setTodoList] = useState(initTodoList)
    const [filterStatus, setfilterStatus] = useState(() => {
        const params = queryString.parse(location.search)
        console.log('params: ', params)
        return params.status || 'all'
    })

    useEffect(() => {
        const params = queryString.parse(location.search)
        setfilterStatus(params.status || 'all')
    }, [location.search])

    const handleTodoClick = (todo, index) => {
        const newTodoList = [...todoList]
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'new' ? 'completed' : 'new',
        }
        setTodoList(newTodoList)
    }

    const handleShowAllClick = () => {
        const queryParams = { status: 'all' }
        history.push(
            {
                pathname: match.path,
                search: queryString.stringify(queryParams)
            }
        )
    }
    const handleShowCompletedClick = () => {
        const queryParams = { status: 'completed' }
        history.push(
            {
                pathname: match.path,
                search: queryString.stringify(queryParams)
            }
        )
    }
    const handleShowNewClick = () => {
        const queryParams = { status: 'new' }
        history.push(
            {
                pathname: match.path,
                search: queryString.stringify(queryParams)
            }
        )
    }

    const renderedTodoList = useMemo(() => {
        return todoList.filter(todo => filterStatus === 'all' || filterStatus === todo.status)
    }, [todoList, filterStatus])

    const handleTodoSubmit = (value) => {
        const newTodo = {
            id: new Date().valueOf(),
            title: value.title,
            status: 'new'
        }

        setTodoList([...todoList, newTodo]);
    }

    return (
        <div>
            <h3>What todo form</h3>
            <h3>Todo List</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
            <TodoForm onSubmit={handleTodoSubmit}/>
            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompletedClick}>Show Completed</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    );
}

export default ListPage;
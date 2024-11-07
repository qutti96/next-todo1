"use client";
import { useState } from "react"


// export const metadata: Metadata = {
//   title: 'Todo新規作成',
// };

export default function createTodoPage() {

    // todoリスト
    const [todos, setTodos] = useState(
      [
        {id: 1, status: "notStarted", title: 'todoリスト未着手'},
        {id: 2, status: "inProgress", title: 'todoリスト進行中タスク'},
        {id: 3, status: "done", title: 'todoリスト完了タスク'},
        {id: 4, status: "done", title: 'todoのタスクを洗い出す'}
      ]
    )

  const [todoTitle, setTodoTitle] = useState('')
  const [todoId, setTodoID] = useState(todos.length + 1)
  const [filter, setFilter] = useState("notStarted")


  const handleAddTodos = () => {
    setTodos([...todos, {id: todoId , status: filter , title: todoTitle}])
    setTodoID(todoId+1)
    setFilter('notStarted')
    setTodoTitle('')
    }

  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value)
  }



  return (
    <>
          <h1 className="font-bold mb-6 text-3xl text-center">Todo新規作成</h1>
          <div className="bg-yellow-50 p-8 mb-12">
              <h2 className="text-2xl font-bold mb-2">todoリスト新規作成</h2>
              <div className="flex items-center justify-start mt-4">
                <input type="text" name="" id="" label="タイトル" value={todoTitle} onChange={handleAddFormChanges} className="block w-2/5 px-5 py-3 mr-4 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                <button onClick={handleAddTodos} className="w-50 px-10 py-4  mr-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-green-700 rounded-xl hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                  todo作成！
                </button>
              </div>
            </div>
    </>
  );

}
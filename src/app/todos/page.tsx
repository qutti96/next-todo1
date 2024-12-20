'use client';
// import Image from 'next/image'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PostType } from './types';

// export const metadata: Metadata = {
//   title: 'Todo一覧とフィルター',
// };

async function fetchAllTodos() {
  const res = await fetch(`http://localhost:3000/api/todos`, {
    cache: "no-store", //SSR  更新があるたびにサーバーからとってきたいから
  });
  const data = await res.json();
  return data.posts;
}

export default function TodoListPage() {

  const [todos, setTodos] = useState<PostType[]>([]);
  const [filter, setFilter] = useState("未着手");
  const [filteredTodos, setFilteredTodos] = useState<PostType[]>([]);

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch('http://localhost:3000/api/todos');
      const data = await res.json();
      setPosts(data.posts);
    }
    loadPosts();
  }, []);

  useEffect(() => {
    async function loadTodos(){
      const posts = await fetchAllTodos();
      setTodos(posts);
      setFilteredTodos(posts);
    }
    loadTodos();
  }, []);

  useEffect(() => {
    let newFilteredTodos = todos;
    console.log(newFilteredTodos);
    if (filter === '未着手') {
      newFilteredTodos = todos.filter(todo => todo.filter === '未着手');
    } else if (filter === '着手中') {
      newFilteredTodos = todos.filter(todo => todo.filter === '着手中');
    } else if (filter === '完了') {
      newFilteredTodos = todos.filter(todo => todo.filter === '完了');
    }
    setFilteredTodos(newFilteredTodos);
  }, [filter, todos]);

  return (
    <>
        <h1 className="font-bold mb-6 text-3xl text-center">Todo一覧とフィルター</h1>
        <div className="bg-pink-50 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-2">todoリストフィルター機能</h2>
          <select
          className="py-2 px-3 mb-2 text-base rounded"
          value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="すべて">すべて</option>
            <option value="未着手">未着手</option>
            <option value="着手中">着手中</option>
            <option value="完了">完了</option>
          </select>

          <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <span className="inline-block mr-1 my-2">【id:{todo.id}】</span>
              <span className="inline-block mr-1 my-2">【{todo.filter}】</span>
              <span className="inline-block mr-1 my-2 font-bold">{todo.content}</span>
            </li>
          ))}
        </ul>

        </div>

        <div className="bg-orange-50 p-8 mb-12">
        <h2 className="text-2xl font-bold mb-2">新規Todoリスト作成</h2>
        <div className="flex my-5">
          <Link
            href={"/todos/create"}
              className="w-50 px-10 py-4 mx-auto my-auto text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-green-700 rounded-xl hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Todo新規作成
          </Link>
        </div>
        </div>

        <div  className="bg-green-50 p-8 mb-12">
          <h2 className="text-2xl font-bold mt-4 mb-4">作成したtodoリスト一覧</h2>
            <ul>
            {posts.map((post: PostType) =>
              <li key={post.id} className="flex items-center flex-wrap w-full mb-4">
                <span className="mr-1">【id:{post.id}】</span>
                <span className="mr-1">【{post.filter}】</span>
                <span className="mr-4 font-bold">{post.content}</span>
                <span className="mr-1">
                  {new Date(post.date).toString()}
                </span>
                <Link
                href={`/todos/edit/${post.id}/`}
                className="w-30 px-10 py-4  mr-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-700 rounded-xl hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  totoを編集
                </Link>
              </li>)}
            </ul>
        </div>
    </>
  );
}
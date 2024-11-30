// import Image from 'next/image'
import Link from 'next/link';
import { PostType } from './types';

export const metadata: Metadata = {
  title: 'Todo一覧とフィルター',
};

async function fetchAllTodos() {
  const res = await fetch(`http://localhost:3000/api/todos`, {
    cache: "no-store", //SSR  更新があるたびにサーバーからとってきたいから
  });
  const data = await res.json();
  return data.posts;
}

export default async function TodoListPage() {
  const posts = await fetchAllTodos();
  console.log(posts);

  return (
    <>
        <h1 className="font-bold mb-6 text-3xl text-center">Todo一覧とフィルター</h1>
        <p>TODO作成ボタン(フィルター/ソート)</p>
        <div className="flex my-5">
        <Link
          href={"/todos/create"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-gray-300 font-semibold"
        >
          Todo新規作成
        </Link>
      </div>
      <div  className="bg-green-50 p-8 mb-12">
              <h2 className="text-2xl font-bold mt-4 mb-4">作成したtodoリスト一覧</h2>
                <ul>
                  {posts.map((post: PostType) =>
                  <li key={post.id} className="flex items-center flex-wrap w-full mb-4">
                    <span className="mr-1">[id:{post.id}]</span>
                    <span className="mr-1">[{post.filter}]</span>
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
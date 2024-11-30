"use client";
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

// export const metadata: Metadata = {
//   title: 'Todo新規作成',
// };

const postTodo = async( content: string | undefined, filter: string | undefined ) => {
  const res = await fetch(`http://localhost:3000/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ content, filter }),
  });
  return res.json();
};

const CreateTodo = () => {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const filterRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    toast.loading("投稿中です！");
    await postTodo(contentRef.current?.value, filterRef.current?.value);
    toast.success("投稿に成功しました！");
    router.push("/todos/");
    router.refresh();
    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
  }

  return (
    <>
      <Toaster />
          <h1 className="font-bold mb-6 text-3xl text-center">Todo新規作成</h1>
          <div className="bg-yellow-50 p-8">
              <h2 className="text-2xl font-bold mb-2">todoリスト新規作成</h2>
              <form
              onSubmit={handleSubmit}
              className="flex items-center justify-start mt-4">
              <textarea
                ref={contentRef}
                placeholder="タスクの内容を入力"
                className="w-2/5 rounded-md px-4 py-2 my-2"
              ></textarea>

                <input 
                ref={filterRef}
                placeholder="ステータス（未着手/着手中/完了）を入力"
                type="text"
                className="w-1/5 block px-5 py-3 ml-4 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                />
                <button 
                className="px-10 py-4  ml-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-green-700 rounded-xl hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                >
                  todo作成！
                </button>
              </form>
            </div>
    </>
  );

}

export default CreateTodo;
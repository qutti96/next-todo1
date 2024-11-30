'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect,useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast';

type UpdateBlogParams = {
  content: string;
  filter: string;
  id: string;
};

const updateTodo = async( data: UpdateBlogParams) => {
  const res = await fetch(`http://localhost:3000/api/todos/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ content: data.content, filter: data.filter }),
  });
  return (await res).json();
};

const getBlogByID = async(id: number) => {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`);
  const data =await res.json();
  console.log(data);
  return data.post;
};

const deleteTodo = async( id: number ) => {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type" : "application/json",
    },
  });
  return (await res).json();
};


const EditTodo = ({params}: {params: {id: string }}) => {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const filterRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    if (contentRef.current && filterRef.current) {
      toast.loading("update中です！🚀");
      await updateTodo({
        content: contentRef.current?.value,
        filter: filterRef.current?.value,
        id: params.id
      }
      );
    }
    toast.success("updateに成功しました！");
    router.push("/todos/");
    router.refresh();
    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
  }

  const handleDeleteTodo = async () => {
    toast.loading("削除中です");
    await deleteTodo(parseInt(params.id));
    toast.success("削除に成功しました！");
    router.push("/todos/");
    router.refresh();
  }

  //getしたIDのデータを入力する
  useEffect(() =>{
    // toast.loading("Fetching Todo Details...");
    getBlogByID(parseInt(params.id))
    .then((data) => {
      if(contentRef.current && filterRef.current){
        contentRef.current.value = data.content;
        filterRef.current.value = data.filter;
        toast.success("Fetching Completed", { id: "1" });
      }
    }).catch( (err) => {
      console.log(err);
      toast.error("エラーが発生しました！");
    });
  },[]);


  return (
    <>
      <Toaster />
      <h1 className="font-bold mb-6 text-3xl text-center">Todoの編集</h1>
      <div className="bg-blue-50 p-8">
        <h2 className="text-2xl font-bold mb-2">todoリスト編集</h2>
        <form
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
          type="submit"
          onClick={handleSubmit}
          className="px-10 py-4  ml-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-700 rounded-xl hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            更新
          </button>
          <button 
          type="button"
            onClick={handleDeleteTodo}
            className="px-10 py-4  ml-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-red-700 rounded-xl hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            todo削除！
          </button>
        </form>
      </div>

    </>
  );
}

export default EditTodo;


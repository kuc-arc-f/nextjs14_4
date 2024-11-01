import TodoList from '@/components/TodoList';
import Layout from "@/components/Layout";
//
export default function Home() {
  return (
  <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">TODO アプリ</h1>
      <TodoList />
    </div>
  </Layout>
  );
}
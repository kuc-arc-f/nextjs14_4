import FormTest1 from '@/components/FormTest1';
import Layout from "@/components/Layout";
//
export default function Home() {
  return (
  <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">FormTest1</h1>
      <FormTest1 />
    </div>
  </Layout>
  );
}
import FormTest3 from '@/components/FormTest3';
import Layout from "@/components/Layout";
//
export default function Home() {
  return (
  <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">FormTest3</h1>
      <FormTest3 />
    </div>
  </Layout>
  );
}
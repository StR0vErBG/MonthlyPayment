import Head from "next/head";
import Register from "../../components/Pages/Home/Register";

export default function Home() {
  return (
    <>
      <main className="container flex-col flex-center">
        <Register />
      </main>
    </>
  );
}
// export async function getServerSideProps(context) {
//   const { query } = context;
//   const session = await getSession({ req: context.req });
//   console.log(session);
//   const isError = session?.user?.email;
//   if (session && !isError?.includes("error")) {
//     return {
//       redirect: {
//         destination: "/account",
//         permanent: false,
//       },
//     };
//   }
//   if (isError) {
//     query.error = isError;
//   }
//   return {
//     props: { session, query },
//   };
// }

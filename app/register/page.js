
import Register from "../../components/Pages/Home/Register";
import getSession from "../getSessionon";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home(props) {
  const session = await getSession(headers().get('cookie') ?? '');

  if(session){
    redirect("/account")
  }
  
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

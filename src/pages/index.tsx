import { trpc } from '../utils/trpc';

export default function IndexPage() {
  // const hello = trpc.getCountry.useQuery();
  // console.log(hello.data)
  // if (!hello.data) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div >
      Hello
      {/* {
        hello.data.map((el)=><p key={el.name}>{el.name}</p>)
      } */}
    </div>
  );
}
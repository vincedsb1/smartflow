import Image from "next/image";
import TabBar from "./components/TabBar";

export default function Home() {
  return (
    <main className="">
      <div className="">Bienvenue sur l&apsindex de SmartFlow</div>
      <TabBar active="index" />
    </main>
  );
}

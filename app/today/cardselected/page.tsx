// "use client";
// import React, { useContext, useState } from "react";
// import { UserContext } from "../../context/UserContext";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import MainButton from "../../components/MainButton";

// const CardSelected = () => {
//   const userContext = useContext(UserContext);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const router = useRouter();

//   if (!userContext?.selectedCard) {
//     return <div>Aucune carte sélectionnée</div>;
//   }

//   const handleShowAnswer = () => {
//     setShowAnswer(true);
//   };

//   const handleNextCard = () => {
//     router.push("/today");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <Card className="py-4" style={{ height: "405px", width: "270px" }}>
//         <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
//           <h4 className="font-bold text-large text-center">
//             {userContext.selectedCard.title}
//           </h4>
//         </CardHeader>
//         <CardBody className="overflow-visible py-2">
//           {showAnswer && (
//             <p className="text-lg">{userContext.selectedCard.answer}</p>
//           )}
//         </CardBody>
//       </Card>
//       <div className="mt-24">
//         {!showAnswer && (
//           <MainButton label="Voir la réponse" onClick={handleShowAnswer} />
//         )}
//         {showAnswer && (
//           <div className="flex justify-between space-x-4">
//             <div>
//               <button
//                 className="rounded-full bg-green-500 text-white w-10 h-10 flex items-center justify-center"
//                 onClick={handleNextCard}
//               >
//                 👍
//               </button>
//             </div>
//             <div className="ml-auto">
//               <button className="rounded-full bg-red-500 text-white w-10 h-10 flex items-center justify-center">
//                 👎
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardSelected;

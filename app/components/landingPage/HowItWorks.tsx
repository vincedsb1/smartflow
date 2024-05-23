import React from "react";

const HowItWorks = () => {

    return (
        <div>
            <div className="flex justify-center mb-8">
                <h1 className="text-4xl text-hint-dark font-bold text-cyan-950">Comment ça marche ?</h1>
            </div>
            <div className="mb-8 ml-8">
                <h2 className="text-xl text-cyan-950 font-bold"> 1. Fiches recto-verso ✍️</h2>
                <p className="text-md text-cyan-700">Créez des fiches avec des questions d&apos;un côté et des réponses de l&apos;autre pour chaque sujet à mémoriser.</p>
            </div>
            <div className="mb-8 ml-8">
                <h2 className="text-xl text-cyan-950 font-bold"> 2. Niveaux de révision 📚</h2>
                <p className="text-md text-cyan-700">Apprenez en six étapes avec des révisions de plus en plus espacées.</p>
            </div>
            <div className="mb-8 ml-8">
                <h2 className="text-xl text-cyan-950 font-bold"> 3. Rappels intelligents ⏰</h2>
                <p className="text-md text-cyan-700">Recevez des rappels au bon moment pour renforcer vos connaissances.</p>
            </div>
        </div>
    )
}

export default HowItWorks;
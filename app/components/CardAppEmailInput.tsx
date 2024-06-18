// Dans votre composant CardAppEmailInput
function CardAppEmailInput({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div id="-main-conatiner">
      <div id="title">
        <p className="text-neutral-600 font-semibold ">Email</p>
      </div>
      <div id="input">
        <input
          className="bg-neutral-50 rounded-2xl p-2 w-80 h-12 mb-10 flex justify-center items-center"
          type="text"
          id="email"
          name="email"
          placeholder="votremail@gmail.com"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default CardAppEmailInput;

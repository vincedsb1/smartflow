interface BelowListLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BelowListLink: React.FC<BelowListLinkProps> = ({ onClick, children }) => {
  if (!children) return null;

  return (
    <div
      id="BelowListLinkContainer"
      className=" w-full pr-6 text-cyan-500 dark:text-cyan-600 flex flex-row justify-end items-center font-text mt-1 cursor-pointer hover:text-cyan-700 dark:hover:text-cyan-400 transition-all"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BelowListLink;

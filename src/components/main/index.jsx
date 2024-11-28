const MainSection = () => {
  return (
    <div className="flex lg:h-[calc(100vh-96px)] items-center">
      <div className="lg:basis-3/5">
        <h1 className="text-6xl lg:text-8xl font-bold my-4">
          Nice to meet you. I&apos;m{" "}
          <span className="underline decoration-green-700">Rubin.</span>
        </h1>
        <p className="my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sit ut
          eos at, expedita nemo quae consequuntur illo doloremque, ea dolore
          quibusdam, itaque aliquid hic aspernatur nihil recusandae eius
          similique.
        </p>

        <button className="border-b-2 border-green-700 pb-1 text-2xl">
          Contact Me
        </button>
      </div>
      <div className="basis-2/5"></div>
    </div>
  );
};

export default MainSection;

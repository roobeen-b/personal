import splashPageImage from "../../assets/splashPage.jpg";
const MainSection = () => {
  return (
    <div className="flex lg:h-[calc(100vh-96px)] items-center">
      <div className="lg:basis-3/5">
        <h1 className="text-6xl lg:text-8xl font-bold my-4">
          Nice to meet you. I&apos;m{" "}
          <span className="underline decoration-green-700">Rubin.</span>
        </h1>
        <p className="my-4 text-muted-foreground">
          Software Engineer | Web Developer
        </p>

        <button
          className="border-b-2 border-green-700 pb-1 mt-2 text-2xl"
          onClick={() => window.open(`mailto:${import.meta.env.MAIL_ID}`)}
        >
          Contact Me
        </button>
      </div>
      <div className="basis-2/5">
        <img
          src={splashPageImage}
          alt="splash page image"
          className="shadow-[0_30px_40px_rgba(0,_0,_0,_0.1)]"
        />
      </div>
    </div>
  );
};

export default MainSection;

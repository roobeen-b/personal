import splashPageImage from "../../assets/splashPage.jpg";
import Button from "../common/Button";
const MainSection = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:h-[calc(100vh-96px)] items-center">
      <div className="lg:basis-3/5">
        <h1 className="text-6xl lg:text-8xl font-bold my-4">
          Nice to meet you. I&apos;m{" "}
          <span className="underline decoration-green-700">Rubin.</span>
        </h1>
        <p className="my-4 text-muted-foreground">
          Software Engineer | Web Developer
        </p>

        <Button
          onButtonClick={() => window.open(`mailto:${import.meta.env.MAIL_ID}`)}
          className="text-2xl"
        >
          Contact Me
        </Button>
      </div>
      <div className="lg:basis-2/5">
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

import { RiHtml5Line } from "react-icons/ri";
import { RiCss3Line } from "react-icons/ri";
import { RiJavascriptLine } from "react-icons/ri";
import { RiReactjsLine } from "react-icons/ri";
import { RiNextjsLine } from "react-icons/ri";
import { RiFlutterLine } from "react-icons/ri";
import { RiNodejsLine } from "react-icons/ri";
import { SiExpress } from "react-icons/si";

const techStacks = [
  {
    name: "HTML",
    icon: RiHtml5Line,
  },
  {
    name: "CSS",
    icon: RiCss3Line,
  },
  {
    name: "Javascript",
    icon: RiJavascriptLine,
  },
  {
    name: "React",
    icon: RiReactjsLine,
  },
  {
    name: "Next",
    icon: RiNextjsLine,
  },
  {
    name: "Flutter",
    icon: RiFlutterLine,
  },
  {
    name: "Node",
    icon: RiNodejsLine,
  },
  {
    name: "Express",
    icon: SiExpress,
  },
];

const TechStack = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center">
        {techStacks.map((stack) => (
          <div className="m-4 flex items-center gap-2" key={stack.name}>
            <stack.icon size={50} />
            <p className="text-3xl lg:text-5xl font-bold">{stack.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;

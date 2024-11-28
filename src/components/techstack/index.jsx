const techStacks = ["HTML", "CSS", "JavaScript", "ReactJS", "NextJS"];

const TechStack = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center">
        {techStacks.map((stack) => (
          <div className="m-4" key={stack}>
            <p className="text-3xl lg:text-5xl font-bold">{stack}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;

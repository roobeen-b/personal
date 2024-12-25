import { fetchAllSkillsService } from "@/services";
import { useEffect, useState } from "react";

import * as RiIcons from "react-icons/ri";

const TechStack = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllSkillsService();
      if (result?.success) {
        setSkills(result?.data);
      } else {
        setSkills([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center">
        {skills.map((skill) => {
          const IconComponent = RiIcons[skill.iconName];
          return (
            <div className="m-4 flex items-center gap-2" key={skill.name}>
              {IconComponent && <IconComponent size={50} />}
              <p className="text-3xl lg:text-5xl font-bold">{skill.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;

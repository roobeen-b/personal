/* eslint-disable react/prop-types */

import * as RiIcons from "react-icons/ri";
import AdminCard from "./AdminCard";

const AdminSkillCard = ({ skill, handleDelete, handleEdit }) => {
  const IconComponent = RiIcons[skill.iconName];

  return (
    <AdminCard item={skill} handleDelete={handleDelete} handleEdit={handleEdit}>
      <div className="">{IconComponent && <IconComponent size={50} />}</div>
    </AdminCard>
  );
};

export default AdminSkillCard;

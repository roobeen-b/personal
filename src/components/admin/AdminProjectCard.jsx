/* eslint-disable react/prop-types */

import AdminCard from "./AdminCard";

const AdminProjectCard = ({ project, handleEdit, handleDelete }) => {
  return (
    <AdminCard
      item={project}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <div className="h-36">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-contain"
        />
      </div>
    </AdminCard>
  );
};

export default AdminProjectCard;

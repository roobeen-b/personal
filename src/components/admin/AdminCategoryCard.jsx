/* eslint-disable react/prop-types */
import AdminCard from "./AdminCard";

const AdminCategoryCard = ({ category, handleDelete, handleEdit }) => {
  return (
    <AdminCard
      item={category}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <div className=""></div>
    </AdminCard>
  );
};

export default AdminCategoryCard;

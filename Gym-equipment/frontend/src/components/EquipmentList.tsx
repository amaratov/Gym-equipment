import React from 'react';
import { Equipment } from '../types';

interface EquipmentListProps {
  equipment: Equipment[];
  onUpdate: (updatedEquipment: Equipment) => void;
  onDelete: (userId: string, equipmentId: string) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipment, onUpdate, onDelete }) => {
  const API_BASE_URL = 'https://4o5epfvf5b.execute-api.ca-central-1.amazonaws.com/Prod';

  const handleUpdate = async (item: Equipment) => {
    const newStatus = item.status === 'Available' ? 'In Use' : item.status === 'In Use' ? 'Maintenance' : 'Available';
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${item.userId}/${item.equipmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: item.name, type: item.type, status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedEquipment = await response.json();
      onUpdate(updatedEquipment);
    } catch (error) {
      console.error('Error updating equipment:', error);
      alert('Failed to update equipment. Please try again.');
    }
  };

  const handleDelete = async (userId: string, equipmentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${userId}/${equipmentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onDelete(userId, equipmentId);
    } catch (error) {
      console.error('Error deleting equipment:', error);
      alert('Failed to delete equipment. Please try again.');
    }
  };

  return (
    <div>
      {equipment.map((item) => (
        <div key={item.equipmentId} className="flex justify-between items-center border-b py-2">
          <div>
            <p>
              <strong>{item.name}</strong> ({item.type})
            </p>
            <p>Status: {item.status}</p>
          </div>
          <div>
            <button
              onClick={() => handleUpdate(item)}
              className="bg-yellow-500 text-white p-1 mr-2"
            >
              Toggle Status
            </button>
            <button
              onClick={() => handleDelete(item.userId, item.equipmentId)}
              className="bg-red-500 text-white p-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentList;
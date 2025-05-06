import React, { useState, useEffect } from 'react';
   import EquipmentForm from './components/EquipmentForm';
   import EquipmentList from './components/EquipmentList';
   import { Equipment } from './types';

   const App: React.FC = () => {
     const userId = 'user123'; // Hardcoded for demo
     const [equipment, setEquipment] = useState<Equipment[]>([]);
     const API_BASE_URL = 'https://4o5epfvf5b.execute-api.ca-central-1.amazonaws.com/Prod';

     const fetchEquipment = async () => {
       const response = await fetch(`${API_BASE_URL}/equipment/${userId}`);
       const data = await response.json();
       setEquipment(data);
     };

     useEffect(() => {
       fetchEquipment();
     }, []);

     const handleAdd = (newEquipment: Equipment) => {
       setEquipment([...equipment, newEquipment]);
     };

     const handleUpdate = (updatedEquipment: Equipment) => {
       setEquipment(
         equipment.map((item) =>
           item.equipmentId === updatedEquipment.equipmentId ? updatedEquipment : item
         )
       );
     };

     const handleDelete = (userId: string, equipmentId: string) => {
       setEquipment(equipment.filter((item) => item.equipmentId !== equipmentId));
     };

     return (
       <div className="p-4 max-w-2xl mx-auto">
         <h1 className="text-2xl mb-4">Gym Equipment Manager</h1>
         <EquipmentForm userId={userId} onAdd={handleAdd} />
         <EquipmentList equipment={equipment} onUpdate={handleUpdate} onDelete={handleDelete} />
       </div>
     );
   };

   export default App;
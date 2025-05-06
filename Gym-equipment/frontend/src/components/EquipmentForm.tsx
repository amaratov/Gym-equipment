import React, { useState } from 'react';
   import { Equipment } from '../types';

   interface EquipmentFormProps {
     userId: string;
     onAdd: (equipment: Equipment) => void;
   }

   const EquipmentForm: React.FC<EquipmentFormProps> = ({ userId, onAdd }) => {
     const [name, setName] = useState('');
     const [type, setType] = useState('Cardio');
     const [status, setStatus] = useState('Available');
     const API_BASE_URL = 'https://4o5epfvf5b.execute-api.ca-central-1.amazonaws.com/Prod';

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       const response = await fetch(`${API_BASE_URL}/equipment`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ userId, name, type, status }),
       });
       const newEquipment = await response.json();
       onAdd(newEquipment);
       setName('');
     };

     return (
       <form onSubmit={handleSubmit} className="mb-4">
         <div className="flex gap-4">
           <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             placeholder="Equipment Name"
             className="border p-2"
             required
           />
           <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2">
             <option value="Cardio">Cardio</option>
             <option value="Strength">Strength</option>
             <option value="Flexibility">Flexibility</option>
           </select>
           <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2">
             <option value="Available">Available</option>
             <option value="In Use">In Use</option>
             <option value="Maintenance">Maintenance</option>
           </select>
           <button type="submit" className="bg-blue-500 text-white p-2">
             Add Equipment
           </button>
         </div>
       </form>
     );
   };

   export default EquipmentForm;
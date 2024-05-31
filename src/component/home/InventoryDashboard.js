import React, { useState, useEffect } from 'react';
import PrimeTable from '../primeTable/PrimeTable';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { jobCategories, jobStatuses } from '../../store/generateJob';

const InventoryDashboard = ({ match, inventoryItems, setInventoryItems }) => {
  const jobId = match.params.id; 
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    // Fetch inventory items for this job site
    // setInventoryItems(fetchedData);
  }, [jobId]);

  const handleCellDoubleClick = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    const updatedItems = inventoryItems.map(item =>
      item.id === selectedItem.id ? formData : item
    );
    setInventoryItems(updatedItems);
    setIsModalVisible(false);
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const renderEditor = (options) => {
    if (options.field === 'status') {
      return (
        <Dropdown
          value={options.value}
          options={jobStatuses}
          onChange={(e) => handleChange(options.field, e.value)}
          placeholder="Select a Status"
        />
      );
    }
    return (
      <InputText
        value={options.value}
        onChange={(e) => handleChange(options.field, e.target.value)}
      />
    );
  };

  return (
    <div>
      <h1>Inventory Dashboard for Job Site {jobId}</h1>
      <PrimeTable
        value={inventoryItems}
        onCellDoubleClick={(e) => handleCellDoubleClick(e.value)}
        editMode="cell"
        cellEditValidator={renderEditor}
      />
      <Dialog
        header="Edit Inventory Item"
        visible={isModalVisible}
        onHide={() => setIsModalVisible(false)}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <Dropdown
            id="category"
            value={formData.category}
            options={jobCategories}
            onChange={(e) => handleChange('category', e.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <Dropdown
            id="status"
            value={formData.status}
            options={jobStatuses}
            onChange={(e) => handleChange('status', e.value)}
          />
        </div>
        <Button label="Save" onClick={handleSave} />
      </Dialog>
    </div>
  );
};

export default InventoryDashboard;

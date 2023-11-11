import React, { useState,useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CSSTransition } from 'react-transition-group';
import { FaUsers, FaChartLine, FaCode, FaCheck } from 'react-icons/fa';

const chartData = {
  labels: ['Анна', 'Борис', 'Владимир', 'Дарья', 'Евгений'],
  datasets: [
    {
      label: 'Количество карт',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#BC9175',
      borderWidth: 2,
      borderColor: '#8C5F45',
      hoverBackgroundColor: '#E6C4A9',
      hoverBorderColor: '#8C5F45',
    },
    {
      label: 'Количество клиентов',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderWidth: 2,
      borderColor: 'rgba(54, 162, 235, 1)',
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
    },
  ],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      gridLines: {
        color: '#BC9175',
      },
      ticks: {
        fontColor: '#BC9175',
      },
      title: {
        display: true,
        text: 'Количество',
        fontColor: '#BC9175',
        fontSize: 18,
      },
    },
    x: {
      gridLines: {
        color: '#BC9175',
      },
      ticks: {
        fontColor: '#BC9175',
      },
      title: {
        display: true,
        text: 'Имя',
        fontColor: '#BC9175',
        fontSize: 18,
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        fontColor: '#BC9175',
      },
    },
  },
};


const ModalStyle = {
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
    color: 'black', 
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    marginBottom: '20px',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  modalInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: 'white',
  },
  modalButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '5px',
  },
  saveButton: {
    backgroundColor: '#BC9175',
    color: 'white',
  },
  closeButton: {
    backgroundColor: 'grey',
    color: 'white',
  },
};

// Компонент модального окна
const Modal = ({ isOpen, onClose, employee, onSave }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee || {});

  useEffect(() => {
    setEditedEmployee(employee || {});
  }, [employee]);

  const handleChange = (e) => {
    setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div style={ModalStyle.modalBackdrop}>
        <div style={ModalStyle.modalContent}>
          <h2 style={ModalStyle.modalHeader}>Редактировать Сотрудника</h2>
          <form style={ModalStyle.modalForm}>
            <input type="text" name="name" value={editedEmployee.name || ''} onChange={handleChange} style={ModalStyle.modalInput} />
            <input type="text" name="role" value={editedEmployee.role || ''} onChange={handleChange} style={ModalStyle.modalInput} />
            <input type="text" name="description" value={editedEmployee.description || ''} onChange={handleChange} style={ModalStyle.modalInput} />
            <div>
              <button type="button" onClick={() => onSave(editedEmployee)} style={{ ...ModalStyle.modalButton, ...ModalStyle.saveButton }}>Сохранить</button>
              <button type="button" onClick={onClose} style={{ ...ModalStyle.modalButton, ...ModalStyle.closeButton }}>Закрыть</button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
};
export default function Dashboard() {
  const [employeesData, setEmployeesData] = useState([
    { name: 'Анна', role: 'Менеджер', department: 'Управление', description: 'Описание Анны', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
    { name: 'Борис', role: 'Аналитик', department: 'Аналитика', description: 'Описание Бориса', photo: 'https://sun9-37.userapi.com/impg/d1HX1olAzlPX8frQjmiRLyqH5DoKgyfeIt05sA/65l7_KhkhZs.jpg?size=853x1280&quality=95&sign=b3256ee4c304b5233ca494358d3e6dfd&type=album' },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState('Все');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const handleModalSave = (updatedEmployee) => {
    // Обновление состояния сотрудников
    setEmployeesData(employeesData.map(emp => 
      emp.name === updatedEmployee.name ? updatedEmployee : emp
    ));
    setModalOpen(false);
  };
  const handleCardClick = (employee) => {
    setCurrentEmployee(employee);
    setModalOpen(true);
  };

 

  // Фильтрация сотрудников по отделу
  const filteredEmployees = employeesData.filter(employee => 
    selectedDepartment === 'Все' || employee.department === selectedDepartment
  );

  return (
    <div style={{ backgroundColor: 'rgb(43 43 43)', padding: '20px', textAlign: 'center' , }}> 
      <h1 style={{ marginBottom: '20px',  fontFamily: 'Montserrat-VariableFont_wght' }}>Панель управления</h1>
      <p style={{ marginBottom: '20px' }}>Здесь вы можете видеть общую статистику по агентам банка</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}> 
        <div style={{ width: '600px', height: '300px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '20px' }}> 
        {['Все', 'Управление', 'Аналитика', 'Разработка'].map((department, index) => (
          <button key={index} onClick={() => setSelectedDepartment(department)} style={{ display: 'flex', alignItems: 'center', margin: '10px', padding: '10px', backgroundColor: '#BC9175', borderRadius: '10px', color: 'white', border: 'none' }}>
            {department === 'Управление' && <FaUsers size={20} style={{ marginRight: '10px' }} />}
            {department === 'Аналитика' && <FaChartLine size={20} style={{ marginRight: '10px' }} />}
            {department === 'Разработка' && <FaCode size={20} style={{ marginRight: '10px' }} />}
            {department}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
        {filteredEmployees.map((employee, index) => (
          <div key={index} style={{ padding: '10px', backgroundColor: '#BC9175', borderRadius: '20px', color: 'white', width: '250px', marginBottom: '20px', textAlign: 'center' }} onClick={() => handleCardClick(employee)}>
 <img 
              src={employee.photo} 
              alt={employee.name} 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                objectFit: 'cover'  
              }} 
            />            <h3>{employee.name}</h3>
            <p>{employee.role}</p>
            <p>{employee.description}</p>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        employee={currentEmployee} 
        onSave={handleModalSave} 
      />
    </div>
  );
}